<?php

$json = file_get_contents("php://input");

if ($json) {
  $data = json_decode($json);
  $formId = '';
  $userId = '';

  // $receiver = "mail@rollenspieltag.ch";
  $receiver = "alexander@liebhardt.info";
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
    $msg[] = "Die WP API";
  }

  $header = "From: noreply@example.com" . "\r\n" .
      "Reply-To: noreply@example.com" . "\r\n" .
      "X-Mailer: PHP/" . phpversion();

  // Mail do not work yet because of missing server smtp setup
  if (mail($receiver, $subject, implode("\r\n", $msg), $header)) {
    if ($formId === 'User') {
      echo "'user':{'id': '$userId'}";
    } else {
      header("HTTP/1.0 202 Accepted");
    }
  } else {
    header("HTTP/1.0 500 Internal Server Error");
  }
  exit;
}

header("HTTP/1.0 400 Bad Request");
