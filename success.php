<?php 
if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['phone']))
{
    $username = $_POST['username'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $service = isset($_POST['service']) ? $_POST['service'] : 'Не указано';

    // Обработка загруженного файла
    $fileInfo = 'Файл не прикреплен';
    if(isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $fileName = $_FILES['file']['name'];
        $fileSize = round($_FILES['file']['size'] / 1024, 2); // KB
        $fileType = $_FILES['file']['type'];
        $fileInfo = "Имя: $fileName | Размер: $fileSize KB | Тип: $fileType";
        
        // Можно сохранить файл на сервер:
        // $uploadDir = 'uploads/';
        // if(!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
        // move_uploaded_file($_FILES['file']['tmp_name'], $uploadDir . $fileName);
    }

    $to = 'zakaz@bukva-led.ru';
    $from = 'noreply.order@' . $_SERVER['SERVER_NAME'];

    $subject = "Заявка с сайта";
    $subject = "=?utf-8?B?".base64_encode($subject)."?=";
    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/html; charset=utf-8\r\n";

    $message = "
    <div style='border-radius: 8px; background: #26303f; margin: 2px; padding: 20px; box-sizing: border-box;'>
        <b style='color: #a0aec0; font-size: 18px;'>✅ Новая заявка с сайта</b>
    </div>
    <br>
    <div style='border-radius: 8px; background: #1e2836; color: #fff; font-weight: bold; margin: 2px; padding: 15px; box-sizing: border-box;'>
        ИНФОРМАЦИЯ О ЗАКАЗЧИКЕ:
    </div>
    <div style='border-radius: 6px; background: #2d3748; margin: 2px; padding: 12px; box-sizing: border-box; color: #e2e8f0;'> 
        <b>Имя:</b> $username
    </div>
    <div style='border-radius: 6px; background: #2d3748; margin: 2px; padding: 12px; box-sizing: border-box; color: #e2e8f0;'> 
        <b>Телефон:</b> $phone
    </div>
    <div style='border-radius: 6px; background: #2d3748; margin: 2px; padding: 12px; box-sizing: border-box; color: #e2e8f0;'> 
        <b>Email:</b> " . ($email ? $email : 'Не указан') . "
    </div>
    <div style='border-radius: 6px; background: #2d3748; margin: 2px; padding: 12px; box-sizing: border-box; color: #e2e8f0;'> 
        <b>Услуга:</b> $service
    </div>
    <div style='border-radius: 6px; background: #2d3748; margin: 2px; padding: 12px; box-sizing: border-box; color: #e2e8f0;'> 
        <b>Файл:</b> $fileInfo
    </div>
    <div style='border-radius: 8px; background: #26303f; margin: 2px; padding: 15px; box-sizing: border-box; margin-top: 20px;'>
        <small style='color: #a0aec0;'>Отправлено: " . date('d.m.Y H:i:s') . "</small>
    </div>
    ";

    mail($to, $subject, $message, $headers);
}
?>

<!DOCTYPE html>
<html lang="ru" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Спасибо за заявку!</title>
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(to bottom right, #1f2937, #111827);
      min-height: 100vh;
    }
  </style>
</head>
<body class="text-white">
  <div class="container mx-auto px-4 min-h-screen flex items-center justify-center">
    <div class="text-center max-w-2xl">
      <!-- Иконка успеха -->
      <div class="mb-8">
        <svg class="w-20 h-20 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-6">
        Спасибо за вашу заявку!
      </h1>
      
      <p class="text-xl text-gray-300 mb-8">
        Мы свяжемся с вами в ближайшее время для уточнения деталей.
      </p>

      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-[#a0aec0] mb-4">Ваши данные:</h2>
        <div class="space-y-2 text-left">
          <p><span class="text-gray-400">Имя:</span> <?php echo htmlspecialchars($username ?? ''); ?></p>
          <p><span class="text-gray-400">Телефон:</span> <?php echo htmlspecialchars($phone ?? ''); ?></p>
          <?php if(!empty($email)): ?>
            <p><span class="text-gray-400">Email:</span> <?php echo htmlspecialchars($email); ?></p>
          <?php endif; ?>
          <?php if(isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK): ?>
            <p><span class="text-gray-400">Файл:</span> <?php echo htmlspecialchars($_FILES['file']['name']); ?></p>
          <?php endif; ?>
        </div>
      </div>

      <a href="index.html" class="bg-[#26303f] hover:bg-[#1e2836] text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 inline-block">
        Вернуться на главную
      </a>
      
      <p class="text-gray-500 text-sm mt-6">
        Если у вас срочный вопрос, звоните: 
        <a href="tel:88126296990" class="text-[#a0aec0] hover:text-white">8 (812) 629-69-90</a>
      </p>
    </div>
  </div>
</body>
</html>