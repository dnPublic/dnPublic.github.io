



document.addEventListener('DOMContentLoaded', () => {
  function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(menuId.replace('menu', 'arrow'));
    
    if (menu.classList.contains('hidden')) {
      // Закрываем все другие меню
      document.querySelectorAll('[id$="-menu"]').forEach(m => {
        if (m.id !== menuId) {
          m.classList.add('hidden');
          document.getElementById(m.id.replace('menu', 'arrow'))
            .classList.remove('rotate-180');
        }
      });
      
      // Открываем текущее
      menu.classList.remove('hidden');
      arrow.classList.add('rotate-180');
      
      // Закрытие при клике вне меню
      setTimeout(() => {
        document.addEventListener('click', closeAllMenus);
      }, 10);
    } else {
      menu.classList.add('hidden');
      arrow.classList.remove('rotate-180');
      document.removeEventListener('click', closeAllMenus);
    }
  }

  function closeAllMenus(e) {
    if (!e.target.closest('.mobile-menu-trigger') && !e.target.closest('[id$="-menu"]')) {
      document.querySelectorAll('[id$="-menu"]').forEach(menu => {
        menu.classList.add('hidden');
        document.getElementById(menu.id.replace('menu', 'arrow'))
          .classList.remove('rotate-180');
      });
      document.removeEventListener('click', closeAllMenus);
    }
  }



  document.getElementById('about-more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const content = document.getElementById('about-more-content');
    const arrow = document.getElementById('about-arrow');
    const btnText = document.querySelector('.btn-text');
    const headerHeight = 80; // Высота вашего хедера
    
    if (content.classList.contains('max-h-0')) {
      // Раскрываем блок
      content.classList.remove('max-h-0', 'opacity-0');
      content.classList.add('max-h-[2000px]', 'opacity-100');
      arrow.classList.add('rotate-180');
      btnText.textContent = 'Свернуть';

      // Плавный скролл с GSAP (наиболее плавный вариант)
      setTimeout(() => {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: content,
            offsetY: headerHeight, // Компенсация хедера
            autoKill: false
          },
          ease: "power2.inOut"
        });
      }, 50);
      
    } else {
      // Скрываем блок
      content.classList.add('max-h-0', 'opacity-0');
      content.classList.remove('max-h-[2000px]', 'opacity-100');
      arrow.classList.remove('rotate-180');
      btnText.textContent = 'Подробнее о нас';
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




