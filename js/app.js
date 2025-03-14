$('.slider, .slider__reviews').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
  });


$('.nav__link, #order__btn').on('click', function() {
    let target = $(this).attr('href');

    $('html, body').animate({ scrollTop: $(target).offset().top - 60 }, 500);
})

$('.menu__btn').on('click', () => {
    $('header nav').slideToggle();
})


$('#order__form').on('submit', function()
{
    if(!$('#confirm__policy').prop('checked'))
        return false;

});

$('.link__policy').on('click', function(e) {
    e.preventDefault();
    
    window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=500,left=500,height=700,top=700'); 
})



new Inputmask('+7(999)-999-9999').mask($('#phone__input'));

new WOW().init();