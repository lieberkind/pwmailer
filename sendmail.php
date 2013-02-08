<?php
require_once('phpmailer/class.phpmailer.php');

if(isset($_POST['action']) && !empty($_POST['action'])) {
  $action = $_POST['action'];

  switch ($action) {
    case 'testmail' : sendTestMail($_POST['message']); break;
    default         : break;
  }
}

function sendTestMail($message) {

  //echo $message;
  //die();

  $mail = new PHPMailer(); // defaults to using php "mail()"
  $mail->IsSendmail(); // telling the class to use SendMail transport
  $mail->Sender = "noreply@patchworkgroup.com"; // Prevents sender-id=none
  $mail->SetFrom('noreply@patchworkgroup.com', 'Carlsberg After-Ski Hotel');
  $mail->Subject = utf8_decode("Tid til en ny omgang. ");

  $mail->MsgHTML($message);

  $mail->AddAddress('t.lieberkind@gmail.com', 'Tomas Lieberkind');

  if($mail->send()) {
    echo 'Mail has been sent';
  } else {
    echo 'Mail has not been sent';
  }
}

?>