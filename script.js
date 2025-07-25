



document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('about-more-btn').addEventListener('click', function() {
  const content = document.getElementById('about-more-content');
  content.classList.toggle('hidden');
  this.textContent = content.classList.contains('hidden') ? 'Подробнее о нас' : 'Скрыть';
});
  
  
  const elements = gsap.utils.toArray('.line');
  
  elements.forEach((el, i) => {
    // Получаем текст из самого элемента
    const text = el.textContent.trim();
    const chars = text.split('');
    
    el.innerHTML = ''; // Очищаем содержимое
    
    chars.forEach((char, j) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      el.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        delay: i * 0.3 + j * 0.03, // Задержка для строки + символа
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });

  

  new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    simulateTouch: true,
      touchRatio: 1,
      touchAngle: 45,
      grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class="${className} !w-3 !h-3 !mx-1 !bg-white/50 !hover:bg-white rounded-full transition-all"></span>`;
      },
    },
  });

  // YandexMap
  ymaps.ready(initMap); // Используем встроенный обработчик ready

  function initMap() {
    try {
      // Создаем карту
      const myMap = new ymaps.Map('map', {
        center: [59.976319, 30.366111],
        zoom: 15,
        controls: ['zoomControl']
      });

      // Создаем метку
      const myPlacemark = new ymaps.Placemark([59.976319, 30.366111], {
        balloonContent: 'г. Санкт-Петербург, Менделеевская улица, 9'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
      });

      // Добавляем метку на карту
      myMap.geoObjects.add(myPlacemark);
      
      // Открываем балун при загрузке
      myPlacemark.balloon.open();
      
    } catch (error) {
      console.error('Error initializing Yandex Map:', error);
    }
  }

});




