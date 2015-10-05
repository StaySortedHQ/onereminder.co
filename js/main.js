// Generated by CoffeeScript 1.7.1
(function() {
  var emailIsValid, fullPageInstantiated, handleOrientation, playerInstantiated, setupEmailModal, setupFullPageMediumUp, showRotateDevice, showSite;

  setupEmailModal = function() {
    $('#email-modal').on('click', function(e) {
      return $(this).fadeOut();
    });
    $('.join-beta').on('click', function(e) {
      e.preventDefault();
      return $('#email-modal').fadeIn();
    });
    $('input').on('click', function(e) {
      return e.stopImmediatePropagation();
    });
    $('button').on('click', function(e) {
      return e.stopImmediatePropagation();
    });
    return $('.email-form').submit(function(e) {
      var action, checkmark, email, errorField, form, formData, join, spinner, successField;
      e.preventDefault();
      form = $(this);
      action = form.attr('action');
      email = $.trim(form.find('input[name=email]')[0].value);
      successField = $(form.find('.form-message'));
      errorField = $(form.find('.form-error'));
      spinner = $(form.find('.loader'));
      join = $(form.find('.join'));
      checkmark = $(form.find('.done'));
      successField.html('').fadeOut(0);
      errorField.html('').fadeOut(0);
      if (emailIsValid(email)) {
        join.hide();
        checkmark.hide();
        spinner.fadeIn();
        formData = {
          'email': email
        };
        return $.ajax({
          type: 'POST',
          url: action,
          data: formData,
          dataType: 'json',
          encode: true
        }).fail(function(data) {
          successField.html('Thank you. You will receive an email soon.').fadeIn();
          spinner.hide();
          return checkmark.fadeIn();
        });
      } else {
        return errorField.html('Please check your email again. Thanks.').fadeIn();
      }
    });
  };

  emailIsValid = function(email) {
    var emailReg;
    emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return emailReg.test(email);
  };

  setupFullPageMediumUp = function() {
    $('main#main').hide();
    return $('#fullpage').fullpage({
      navigation: true,
      fitToSectionDelay: 9999999,
      paddingTop: '50px',
      fixedElements: '.phone',
      afterRender: function() {
        return $('main#main').fadeIn(1000);
      },
      onLeave: function(index, nextIndex, direction) {
        $('#screen').removeClass();
        $('.down-arrow').removeClass('hide');
        if (nextIndex === 1) {
          return $('#screen').addClass('one');
        } else if (nextIndex === 2) {
          return $('#screen').addClass('two');
        } else if (nextIndex === 3) {
          return $('#screen').addClass('three');
        } else if (nextIndex === 4) {
          return $('#screen').addClass('four');
        } else if (nextIndex === 5) {
          return $('#screen').addClass('five');
        } else if (nextIndex === 6) {
          $('#screen').addClass('six');
          return $('.down-arrow').addClass('hide');
        }
      }
    });
  };

  showRotateDevice = function() {
    $('main#main').hide();
    $('.rotate').fadeIn();
    return $('#primary-phone').hide();
  };

  showSite = function() {
    $('main#main').show();
    $('.rotate').fadeOut();
    return $('#primary-phone').show();
  };

  handleOrientation = function(e) {
    if (window.orientation === 0) {
      return showSite();
    } else {
      return showRotateDevice();
    }
  };

  playerInstantiated = false;

  fullPageInstantiated = false;

  $(function() {
    $(window).on('orientationchange', handleOrientation);
    $('#smallVideoButton').on('click', function() {
      return $('#smallVideo').fadeIn();
    });
    setupEmailModal();
    return mediaCheck({
      media: '(min-width: 40.063em)',
      entry: function() {
        if (window.innerHeight < 769) {
          $('main#main').hide();
          $('.rotate').fadeIn();
          $('#primary-phone').hide();
          if (fullPageInstantiated) {
            $.fn.fullpage.destroy('all');
            return fullPageInstantiated = false;
          }
        } else {
          $('.rotate').hide();
          if (!fullPageInstantiated) {
            setupFullPageMediumUp();
            return fullPageInstantiated = true;
          }
        }
      },
      exit: function() {
        $('main#main').fadeIn(0);
        $('.rotate').hide();
        if (fullPageInstantiated) {
          $.fn.fullpage.destroy('all');
          return fullPageInstantiated = false;
        }
      }
    });
  });

}).call(this);
