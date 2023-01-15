$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1200,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
              dots: true,
              arrows: false
      }
        }
      ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // $('.button_mini').on('click', function() {
    //   $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');            
        })
    })

    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите не менее {0} символов")
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введён адрес почты"
          }
        }
    });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) { // обращаемся ко всем формам - $('form'), далее submit валидирует форму и хотим выполнить какое-либо действие - fucntion
      e.preventDefault(); // отменяет стандартное поведение браузера, отправляются данные и браузер не перезагружается 
      
      if (!$(this).valid()) { // если форма не прошла валидацию, то мы ничего делать не будем
        return;
      }
      
      $.ajax({ // далее идёт настройка ajax-запроса
          type: "POST", // указание об отдаче данных
          url: "mailer/smart.php", // указание о месте назначения передачи
          data: $(this).serialize() // возвращает строку пригодную для передачи через URL-строку
          }).done(function() { // при выполнении операции выполняем функцию
              $(this).find("input").val(""); // внтури формы находим инпуты и устанавливаем в пустую строку (очистим инпуты)
              $('#consultation, #order').fadeOut();
              $('.overlay, #thanks').fadeIn('slow');
              $('form').trigger('reset'); // все формы должны обновиться
          });
          return false; // 
      });
      

      //smooth scroll and page up
      $(window).scroll(function(){ // Обращаемся к окну бразуера и вызываем функцию "scroll"
          if ($(this).scrollTop() > 1600) { // Условие: если от верха мы пролистали больше 1600 пикселей
                $('.pageup').fadeIn(); // то мы показываем элемент
          } else {
            $('.pageup').fadeOut(); // в противном случае элемент скрыт (display: none в _pageup.scss)
          }
      });
  });