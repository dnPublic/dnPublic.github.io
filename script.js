
document.addEventListener('DOMContentLoaded', () => {
  
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
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class="${className} !w-3 !h-3 !mx-1 !bg-white/50 !hover:bg-white rounded-full transition-all"></span>`;
      },
    },
  });



});




