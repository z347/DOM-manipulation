$(document).ready(function() {

  $(".ch_childrens input").on("change", function() {
    parentBlock = $(this).closest(".checkboxes_array");
    chChildrens = parentBlock.find(".ch_childrens input");
    mainCheckbox = parentBlock.find(".main_checkbox input");
    chChildrens.each(function() {
      if (!$(this).is(":checked")) {
        mainCheckbox.prop("checked", false);
        return false;
      } else {
        mainCheckbox.prop("checked", true);
      }
    });
  });

  $(".main_checkbox input").on("change", function() {
    parentBlock = $(this).closest(".checkboxes_array");
    chChildrens = parentBlock.find(".ch_childrens input");
    if (!$(this).is(":checked")) {
      chChildrens.prop("checked", false);
    } else {
      chChildrens.prop("checked", true);
    }
  });

  // -------------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          // "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".close_popup, .popup_bg, .close_popup_sub", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // -------------

    $("[data-slidedown-btn]").on("click", function(e) {
      e.preventDefault();
      sl = $("[data-slidedown ='" +$(this).attr("data-slidedown-btn") + "']");
      if(sl.is(":hidden")) {
        $("[data-slidedown]").slideUp(300);
        $("[data-slidedown-btn]").removeClass("active");
        sl.slideDown(300);
        $(this).addClass("active");
      } else {
        sl.slideUp(300);
        $(this).removeClass("active");
      }
    });

    // --------------

    $(".file_item .del_file").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".file_item");
      parent.remove();
    });

    // --------------

    $(".slideTableBtn").on("click", function(e) {
      e.preventDefault();
      slidedownPages = $(this).closest(".slidedown_pages");
      $(".table_3_sect").removeClass("active");
      parent = $(this).closest(".table_3_sect");
      parent.addClass("active");
      slidedownPages.find(".table_3_sect").each(function (e) {
        if(!$(this).hasClass("active")) {
          $(this).find(".hideTableBox").slideUp(300);
          $(this).find(".table_3_sect_header").addClass("hidden");
        }
      });
    });

    $(".showTable").on("click", function(e) {
      e.preventDefault();
      slidedownPages = $(this).closest(".slidedown_pages");
      slidedownPages.find(".table_3_sect").removeClass("active");
      slidedownPages.find(".slideTableBtn").removeClass("active");
      slidedownPages.find(".slide_down_table").slideUp(300);
      slidedownPages.find(".hideTableBox").slideDown(300);
      slidedownPages.find(".table_3_sect_header").removeClass("hidden");
    });

    $(".slidedown_pages").on("mouseup", function(e) {
      e.preventDefault();
      hide_element = $(".table_3_sect");
      if (!hide_element.is(e.target)
      && hide_element.has(e.target).length === 0) {
        $(".table_3_sect").removeClass("active");
        $(".slide_down_table").slideUp(300);
        $(".hideTableBox").slideDown(300);
        $(".table_3_sect_header").removeClass("hidden");
      }
    });

    // --------------

    $("[data-copyinput-btn]").on("click", function (e) {
      e.preventDefault();
      copyAttr = $(this).attr("data-copyinput-btn");
      copyInput = $("[data-copyinput = '"+copyAttr+"']");
      copyVal = copyInput.val();
      if(copyVal != "") {
        copyInput.select();
        document.execCommand("copy");
        $("[data-copyinput-succes = '"+copyAttr+"']").addClass("active");
      }
    });

    // -------------

    $(document).on("click", ".count_box button", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".count_box");
      countInput = parentBlock.find(".count_num input");
      priceOrder = countInput.attr("data-price-order");
      countVal = countInput.val();
      priceVal = parseInt(countInput.attr("data-price"));
      if(countVal == "") {
          countVal = 1;
      }
      if( $(this).hasClass("minus_btn") && countVal > 1 ) {
          countVal--;
      } else if( $(this).hasClass("plus_btn")) {
          countVal++;
      }
      priceTotal = (priceVal * countVal).toString();
      priceTotalText = priceTotal.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      countInput.val(countVal);
      parentBlock.find(".p_val").text(countVal);
      $("[data-price-val = '"+priceOrder+"']").text(priceTotalText);
    });

    // --------------

    $(".dropdown_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_wrapp");
      dropdown = parent.find(".dropdown_box");
      if(dropdown.is(":hidden")) {
        dropdown.slideDown(300);
        parent.addClass("active");
      } else {
        dropdown.slideUp(300);
        parent.removeClass("active");
      }
    });

    // --------------

    $(".emp_btn").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".employee_item");
      parent.toggleClass("noactive");

    });


});