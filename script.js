document.addEventListener('DOMContentLoaded', () => {
  

  
  function closeAllMenus(e) {
    if (!e.target.closest('.mobile-menu-trigger') && !e.target.closest('[id$="-menu"]')) {
      document.querySelectorAll('[id$="-menu"]').forEach(menu => {
        menu.classList.add('hidden');
        const arrow = document.getElementById(menu.id.replace('menu', 'arrow'));
        if (arrow) arrow.classList.remove('rotate-180');
      });
      document.removeEventListener('click', closeAllMenus);
    }
  }

  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 80,
            autoKill: false
          },
          ease: "power2.inOut"
        });
      }
    });
  });

  // Первый свайпер (hero)
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 5000, // Увеличил задержку для видео
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
  }

  // Второй свайпер (multi-slide)
 
  if (document.querySelector('.glide')) {
    var glide = new Glide(".glide", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      gap: 30,
      breakpoints: {
        1024: {
          perView: 2,
          gap: 20
        },
        768: {
          perView: 1,
          gap: 0
        }
      }
    });
    
    // Обработчик для изменения размера центрального слайда
    glide.on(['mount.after', 'run.after'], function() {
      const slides = document.querySelectorAll('.glide__slide');
      
      slides.forEach(slide => {
        const slideContent = slide.querySelector('div');
        slideContent.classList.remove('h-80', 'scale-110', 'z-10');
        slideContent.classList.add('h-72', 'scale-100');
      });
      
      // Находим активный (центральный) слайд
      const activeSlide = document.querySelector('.glide__slide--active');
      if (activeSlide) {
        const activeContent = activeSlide.querySelector('div');
        activeContent.classList.remove('h-72', 'scale-100');
        activeContent.classList.add('h-80', 'scale-110', 'z-10');
      }
    });
    
    glide.mount();
  }
  
  

   
  // Яндекс карта
  ymaps.ready(initMap);

  function initMap() {
    try {
      if (!document.getElementById('map')) return;
      
      const myMap = new ymaps.Map('map', {
        center: [59.976319, 30.366111],
        zoom: 15,
        controls: ['zoomControl']
      });

      const myPlacemark = new ymaps.Placemark([59.976319, 30.366111], {
        balloonContent: 'г. Санкт-Петербург, Менделеевская улица, 9'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
      });

      myMap.geoObjects.add(myPlacemark);
      myPlacemark.balloon.open();
      
    } catch (error) {
      console.error('Error initializing Yandex Map:', error);
    }
  }
  const phoneInput = document.getElementById('phone-input');
  
  // Автоматически ставим +7 при фокусе
  phoneInput.addEventListener('focus', function() {
    if (!this.value.startsWith('+7')) {
      this.value = '+7 (';
      // Устанавливаем курсор после +7 (
      setTimeout(() => {
        this.setSelectionRange(4, 4);
      }, 0);
    }
  });
  
  // Запрещаем удаление +7
  phoneInput.addEventListener('keydown', function(e) {
    // Запрещаем Backspace и Delete в начале
    if ((e.key === 'Backspace' || e.key === 'Delete') && 
        this.selectionStart <= 4) {
      e.preventDefault();
    }
    
    // Запрещаем ввод не цифр
    if (e.key.length === 1 && !/\d/.test(e.key) && 
        this.selectionStart >= 4) {
      e.preventDefault();
    }
  });
  
  // Маска для форматирования
  phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    // Оставляем только 11 цифр (первая 7 уже есть)
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    // Форматируем номер
    if (value.length >= 1) {
      let formattedValue = '+7 (';
      
      if (value.length > 1) {
        formattedValue += value.slice(1, 4);
      }
      if (value.length > 4) {
        formattedValue += ') ' + value.slice(4, 7);
      }
      if (value.length > 7) {
        formattedValue += '-' + value.slice(7, 9);
      }
      if (value.length > 9) {
        formattedValue += '-' + value.slice(9, 11);
      }
      
      this.value = formattedValue;
    }
  });
  phoneInput.addEventListener('blur', function() {
    const digits = this.value.replace(/\D/g, '');
    if (digits.length !== 11) {
      this.setCustomValidity('Введите полный номер телефона (11 цифр)');
    } else {
      this.setCustomValidity('');
    }
  });
});

