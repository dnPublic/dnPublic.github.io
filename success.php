<?php 

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['phone']))
{
      $username = $_POST['username'];
      $phone = $_POST['phone'];
      $email = $_POST['email'];
      $service = $_POST['service'];

      $to = 'mail@aem-spb.ru, natalia@mardina.ru';
			$from = 'noreply.order@' . $_SERVER['SERVER_NAME'];

			$subject = "Заявка с сайта";
			$subject = "=?utf-8?B?".base64_encode($subject)."?=";
			$headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/html; charset=utf-8\r\n";

      $message = "
        <div style='border-radius: 3px; background: #4066ac; margin: 2px; padding: 15px; box-sizing: border-box;'>
        <b style='color: #eee'>Заявка с сайта.</b>
        </div>
        <br>
        <div style='border-radius: 3px; background: #07e; color: #fff; font-weight: bold; margin: 2px; padding: 15px; box-sizing: border-box;'>
        ИНФОРМАЦИЯ О ЗАКАЗЧИКЕ:
        </div>
        <div style='border-radius: 3px; background: #eee; margin: 2px; padding: 10px; box-sizing: border-box;'> Имя: $username
        </div>
        <div style='border-radius: 3px; background: #eee; margin: 2px; padding: 10px; box-sizing: border-box;'> Телефон: $phone
        </div>
        <div style='border-radius: 3px; background: #eee; margin: 2px; padding: 10px; box-sizing: border-box;'> Email: $email
        </div>
        <div style='border-radius: 3px; background: #eee; margin: 2px; padding: 10px; box-sizing: border-box;'> Service: $service
        </div>
			";

			mail($to, $subject, $message, $headers);

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="vh-100">

  <div class="container text-center">
    <div class="row h-100 flex-column justify-content-center align-items-center">
      <h1 class="s__title">Спасибо! Мы свяжемся с Вами в ближайшее время!</h1>
      <a href="index.html" class="btn">На главную</a>
    </div>
   
  </div>
  
</body>
</html>
