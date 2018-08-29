<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
include("PHPMailer.php");
include("SMTP.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// http://www.php.net/manual/en/function.get-browser.php#101125
function getBrowser() {
  $u_agent = $_SERVER['HTTP_USER_AGENT'];
  $bname = 'Unknown';
  $platform = 'Unknown';
  $version= "";
  // First get the platform?
  if (preg_match('/linux/i', $u_agent)) {
    $platform = 'linux';
  } elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
    $platform = 'mac';
  } elseif (preg_match('/windows|win32/i', $u_agent)) {
    $platform = 'windows';
  }
  // Next get the name of the useragent yes seperately and for good reason
  if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) {
    $bname = 'Internet Explorer';
    $ub = "MSIE";
  } elseif(preg_match('/Firefox/i',$u_agent)) {
    $bname = 'Mozilla Firefox';
    $ub = "Firefox";
  } elseif(preg_match('/Chrome/i',$u_agent)) {
    $bname = 'Google Chrome';
    $ub = "Chrome";
  } elseif(preg_match('/Safari/i',$u_agent)) {
    $bname = 'Apple Safari';
    $ub = "Safari";
  } elseif(preg_match('/Opera/i',$u_agent)) {
    $bname = 'Opera';
    $ub = "Opera";
  } elseif(preg_match('/Netscape/i',$u_agent)) {
    $bname = 'Netscape';
    $ub = "Netscape";
  }
  // finally get the correct version number
  $known = array('Version', $ub, 'other');
  $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
  if (!preg_match_all($pattern, $u_agent, $matches)) {
    // we have no matching number just continue
  }
  // see how many we have
  $i = count($matches['browser']);
  if ($i != 1) {
    //we will have two since we are not using 'other' argument yet
    //see if version is before or after the name
    if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
      $version= $matches['version'][0];
    } else {
      $version= $matches['version'][1];
    }
  } else {
    $version= $matches['version'][0];
  }
  // check if we have a number
  if ($version==null || $version=="") {$version="?";}
  return array(
    'userAgent' => $u_agent,
    'name'      => $bname,
    'version'   => $version,
    'platform'  => $platform,
    'pattern'    => $pattern
  );
}

$json = file_get_contents("php://input");

if ($json) {
  $data = json_decode($json);
  $formId = '';
  $userId = '';

  $receiver = "mail@rollenspieltag.ch";
  $sender = "noreply@rollenspieltag.ch";
  $subject = "Neue Nachricht erhalten.";

  $msg = [];
  $msg[] = "Eine neue Nachricht wurde erhalten:";

  foreach ($data as $formName => $obj) {
    $formId = $formName;
    $subject = "$formId: $subject";
    $msg[] = $formId;
    $msg[] = "--";

    foreach($obj as $key => $value) {
      $msg[] = "$key: $value";
      if ($formId === 'User' && $key === 'email') $userId = $value;
      if ($formId === 'Player' && $key === 'email') $userId = $value;
    }

    $ua = getBrowser();

    $msg[] = "--";
    $msg[] = "----BEGIN RAW----";
    $msg[] = $json;
    $msg[] = "----END RAW----";
    $msg[] = "----BEGIN DEBUG----";
    $msg[] = date('d.m.Y H:i', time());
    $msg[] = $ua;
    $msg[] = "----END DEBUG----";
  }

  $mail = new PHPMailer(true);                              // Passing `true` enables exceptions

  try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = '{PHP_MAILER_HOST}';                    // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = '{PHP_MAILER_USER}';                // SMTP username
    $mail->Password = '{PHP_MAILER_PASSWORD}';            // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    $mail->CharSet = 'UTF-8';

    //Recipients
    $mail->setFrom($sender, 'Rollenspieltage Page');
    $mail->addAddress($receiver, 'Rollenspieltage Form');
    // $mail->addAddress('ellen@example.com');
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = implode("\r\n", $msg);

    $mail->send();
    if ($formId === 'User' || $formId === 'Player') {
      echo "{\"id\":\"$userId\"}";
    } else {
      header("HTTP/1.0 202 Accepted");
    }
  } catch (Exception $e) {
    // echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    header("HTTP/1.0 500 Internal Server Error");
  }

  exit;
}

header("HTTP/1.0 400 Bad Request");
