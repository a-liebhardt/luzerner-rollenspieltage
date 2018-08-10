<?php
if (!$_POST) {
  header('HTTP/1.0 404 Not Found');
  exit;
}

var_dump($_POST);
exit;

$empfaenger = 'niemand@example.com';
$betreff = 'Der Betreff';
$nachricht = 'Hallo';
$header = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (mail($empfaenger, $betreff, $nachricht, $header)) {

} else {

}