"use strict";

var $menuDropdown = $('.aside-menu__head');
var $menuArrowBtn = $('.aside-menu__btn');
var $slideToggleBtn = $('.slide-toggle__btn');
var $slideToggleBody = $('.slide-toggle__body');
var $overlay = $('.overlay');
var $burger = $('.menu__burger');
var $burgerClose = $('.menu__close');
var $aside = $('.aside');
var $jsOvelay = $('.js-overlay');
var $openModalBtn = $('.open-modal');
var $modalInput = $('.category-modal__input');
var $inputBtnEdit = $('.category-modal__icon-btn--edit');
var $inputBtnReset = $('.category-modal__icon-btn--reset');
var $fileInput = $('.category-modal__file-input');

function toggleOverlay() {
  $overlay.fadeToggle(400);
}

$(function () {
  //
  jQuery('.scrollbar-outer').scrollbar();

  customSelect('select.custom'); //

  $('.tooltip').tooltipster({
    theme: 'tooltipster-light'
  }); //

  $('.search__reset').on('click', function () {
    $('.search__label input').val('');
  }); //

  // $menuDropdown.on('click', function (e) {

  $(".aside-menu__btn").on('click', function (e) {
    e.preventDefault();

    if ($(this).parent().find('.aside-menu__submenu').length > 0) {
      if (e.target == this) {
        if (window.innerWidth > 1024) {
          $('.aside').toggleClass('active');
        }

        $(this).toggleClass('active-drop');
        $(this).parent().find('.aside-menu__submenu').slideToggle();
      }
    } else {
      $(this).toggleClass('active');
    }
  });



  $menuArrowBtn.on('click', function () {
    if (window.innerWidth > 1024) {
      $('.aside').toggleClass('active');
    }

    var parent = $(this).closest('.aside-menu__item');
    parent.find('.aside-menu__head').toggleClass('active-drop');
    parent.find('.aside-menu__submenu').slideToggle();
  });

  $slideToggleBtn.on('click', function () {
    if ($(this).hasClass('js-overlay')) {
      toggleOverlay();
    }

    $(this).closest('.slide-toggle').find('.slide-toggle__body').slideToggle();
  });

  $(document).on('click', function (e) {
    // закрывает всплывашки
    if ($(e.target).closest('.slide-toggle').length) {
      return;
    } else {
      $slideToggleBody.slideUp();
    } // закрывает меню


    if ($(e.target).closest('.modal').length) return;
    if ($(e.target).closest('.aside, .menu__burger').length) return;else {
      $aside.removeClass('active');
      $jsOvelay.addClass('js-overlay');
    }
    $overlay.fadeOut();
  }); //

  $('.js-dec').on('click', function () {
    $(this).closest('.card').find('.card__count-output').text(function (i, text) {
      if (text > 0) return +text - 1;
    });
  });
  $('.js-inc').on('click', function () {
    $(this).closest('.card').find('.card__count-output').text(function (i, text) {
      return +text + 1;
    });
  }); //

  $burger.on('click', function (e) {
    e.stopPropagation();
    $aside.addClass('active');
    $overlay.fadeIn();
    $jsOvelay.removeClass('js-overlay');
  });
  $burgerClose.on('click', function () {
    $aside.removeClass('active');
    $overlay.fadeOut();
    $jsOvelay.addClass('js-overlay');
  });
  $openModalBtn.on('click', function (e) {
    e.stopPropagation();
    $overlay.fadeIn();
    $('.modal').fadeIn();
    $jsOvelay.removeClass('js-overlay');
  });
  $('.modal').on('click', function (e) {// e.stopPropagation();
  });
  $overlay.on('click', function () {
    $('.modal').fadeOut();
  });
  $('.pagination__select-arrow').on('click', function () {
    console.log($(this).parent().find('select'));
    $(this).parent().find('select').trigger('select');
  });
  $modalInput.on('focus', function (e) {
    $('.category-modal__input-row').addClass('active');

    if (e.target.value.trim().length > 1) {
      $inputBtnReset.addClass('active');
      $inputBtnEdit.removeClass('active');
    }
  });
  $modalInput.on('blur', function (e) {
    if (e.relatedTarget === $inputBtnReset[0]) return;
    $('.category-modal__input-row').removeClass('active');
    $inputBtnReset.removeClass('active');
    $inputBtnEdit.addClass('active');
  });
  $modalInput.on('input', function (e) {
    if (e.target.value.trim().length < 1) {
      return;
    }

    $inputBtnReset.addClass('active');
    $inputBtnEdit.removeClass('active');
  });
  $inputBtnEdit.on('click', function () {
    $modalInput.trigger('focus');
  });
  $inputBtnReset.on('click', function () {
    $modalInput[0].value = '';
    $modalInput.trigger('focus');
    $(this).removeClass('active');
    $inputBtnEdit.addClass('active');
  });
  document.addEventListener('dragenter', function (event) {
    $('.category-modal__file-label').addClass('active');
  }, false);
  $(document).on('drop', function (event) {
    $('.category-modal__file-label').removeClass('active');
  });
  $fileInput.on('change', function (e) {
    var file = $fileInput.get(0).files[0];

    if (file.type === 'image/png' || file.type === 'image/jpg') {
      var url = window.URL.createObjectURL(file);
      $('.category-modal__file-btn').fadeOut(0);
      $('.category-modal__preview').fadeIn(200).css('background', "url(".concat(url, ") center / contain no-repeat"));
    }
  });
});