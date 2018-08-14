<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
include("PHPMailer.php");
include("SMTP.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    }

    $msg[] = "--";
    $msg[] = "Beste Grüsse";
    $msg[] = "Die WP-API";
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

    //Recipients
    $mail->setFrom($sender, 'WP Notifier');
    $mail->addAddress($receiver, 'WP Form');
    // $mail->addAddress('ellen@example.com');
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = implode("\r\n", $msg);
    $mail->AltBody = implode("\r\n", $msg);

    $mail->send();
    if ($formId === 'User') {
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
