<?php

$json = file_get_contents("php://input");

if ($json) {
  $data = json_decode($json);

  // $reciever = "mail@rollenspieltag.ch";
  $reciever = "alexander@liebhardt.info";
  $subject = "Neue Nachricht erhalten.";

  $msg = [];
  $msg[] = "Eine neue Nachricht wurde erhalten:";

  foreach ($data as $formName => $obj) {
    $subject = "$iformName: $subject";
    $msg[] = $iformName;
    $msg[] = "--";

    foreach($obj as $key => $value) {
      $msg[] = "$key: $value";
    }

    $msg[] = "--";
    $msg[] = "Beste Grüsse";
    $msg[] = "Die WP API";
  }

  $header = "From: noreply@example.com" . "\r\n" .
      "Reply-To: noreply@example.com" . "\r\n" .
      "X-Mailer: PHP/" . phpversion();

  if (mail($reciever, $subject, implode("\r\n", $msg), $header)) {
    header("HTTP/1.0 202 Accepted");
    exit;
  }
}

header("HTTP/1.0 400 Bad Request");
