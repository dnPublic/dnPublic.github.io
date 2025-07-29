



document.addEventListener('DOMContentLoaded', () => {
  
const btn = document.getElementById('about-more-btn');
const content = document.getElementById('about-more-content');
const btnText = btn.querySelector('.btn-text');
const arrow = document.getElementById('about-arrow');

btn.addEventListener('click', () => {
  if (content.classList.contains('max-h-0')) {
    // Открываем блок
    content.classList.remove('max-h-0', 'opacity-0');
    content.classList.add('max-h-[500px]', 'opacity-100'); // max-h можно подкорректить
    btnText.textContent = 'Скрыть';
    arrow.classList.add('rotate-180');
    gsap.to(window, {
      duration: 1.5,
      scrollTo: content,
      ease: "power2.out"
    });
  } else {
    // Закрываем блок
    content.classList.add('max-h-0', 'opacity-0');
    content.classList.remove('max-h-[500px]', 'opacity-100');
    btnText.textContent = 'Подробнее о нас';
    arrow.classList.remove('rotate-180');
  }
});
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Отменяем стандартное поведение
      
      const targetId = this.getAttribute('href'); // Получаем ID цели
      const targetElement = document.querySelector(targetId); // Находим элемент
      
      if (targetElement) {
        // Плавный скролл с GSAP
        gsap.to(window, {
          duration: 1.2, // Длительность анимации (в секундах)
          scrollTo: {
            y: targetElement, // Целевой элемент
            offsetY: 80, // Отступ сверху (если есть фиксированный хедер)
            autoKill: false // Позволяет прервать скролл вручную
          },
          ease: "power2.inOut" // Тип анимации
        });
      }
    });
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




