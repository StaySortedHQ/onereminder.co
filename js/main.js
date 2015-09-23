// Generated by CoffeeScript 1.7.1
(function() {
  var emailIsValid, handleOrientation, setupEmailModal, setupFullPageMediumUp;

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
      var action, email, errorField, form, formData, successField;
      e.preventDefault();
      form = $(this);
      action = form.attr('action');
      email = $.trim(form.find('input[name=email]')[0].value);
      successField = $(form.find('.form-message'));
      errorField = $(form.find('.form-error'));
      successField.html('').fadeOut(0);
      errorField.html('').fadeOut(0);
      if (emailIsValid(email)) {
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
          return successField.html('Thank you. You will receive an email soon.').fadeIn();
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
    $('body').hide();
    return $('#fullpage').fullpage({
      navigation: true,
      fitToSectionDelay: 9999999,
      paddingTop: '50px',
      fixedElements: '.phone',
      afterRender: function() {
        return $('body').fadeIn(1000);
      },
      onLeave: function(index, nextIndex, direction) {
        if (typeof player_Plan !== "undefined" && player_Plan !== null) {
          player_Plan.stop();
          player_Adapt.stop();
          player_Inbox.stop();
        }
        $('#screen').removeClass();
        $('.down-arrow').removeClass('hide');
        if (nextIndex === 1) {
          return $('#screen').addClass('one');
        } else if (nextIndex === 2) {
          $('#screen').addClass('two');
          if (typeof player_Plan !== "undefined" && player_Plan !== null) {
            player_Plan.setCurrentFrameNumber(0);
            return player_Plan.play();
          }
        } else if (nextIndex === 3) {
          $('#screen').addClass('three');
          player_Adapt.setCurrentFrameNumber(0);
          return player_Adapt.play();
        } else if (nextIndex === 4) {
          $('#screen').addClass('four');
          player_Inbox.setCurrentFrameNumber(0);
          return player_Inbox.play();
        } else if (nextIndex === 5) {
          return $('#screen').addClass('five');
        } else if (nextIndex === 6) {
          $('#screen').addClass('six');
          return $('.down-arrow').addClass('hide');
        }
      }
    });
  };

  handleOrientation = function(e) {
    var height;
    height = window.innerHeight;
    console.log(height);
    if (height < 480) {
      return $('body').hide();
    }
  };

  $(function() {
    setupEmailModal();
    return mediaCheck({
      media: '(min-width: 40.063em)',
      entry: function() {
        if (window.innerHeight < 480) {
          return $('body').hide();
        } else {
          instantiatePlan();
          instantiateAdapt();
          instantiateInbox();
          return setupFullPageMediumUp();
        }
      },
      exit: function() {
        return $('body').fadeIn(0);
      }
    });
  });

}).call(this);
