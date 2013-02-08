$(document).ready(function() {

  $('.container').on('keyup', '.linkAddress', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    var $popup = $('.popup', $target).first();

    $popup.text($self.val());
    $target.attr('href', $self.val());
  });

  $('.container').on('focus', '.linkAddress', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    var popup = $('<p/>', {
      text: $target.attr('href'),
      'class': 'popup'
    }).css({
      'background': 'rgba(255, 255, 255, 0.8)',
      'border': '1px solid #999',
      'box-shadow': '0 0 5px #888888',
      'left': '0',
      'margin-top': '3px',
      'padding': '1px 0 0 2px',
      'position': 'absolute',
      'top': '1em',
      'width': '400px',
    });

    $target.css({
      'background-color': 'rgba(0, 0, 0, 0.2)'
    });

    popup.appendTo($target);
  });

  $('.container').on('focusout', '.linkAddress', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    $('.popup', $target).remove();

    $target.css('background-color', 'transparent');
  });

  $('.container').on('keyup', '.inputField', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    $target.text($self.val());
  });

  $('.container').on('focus', '.inputField', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    $target.css({
      'background-color': 'rgba(255, 255, 0, 0.5)'
    });
  });

  $('.container').on('focusout', '.inputField', function() {
    var $self = $(this);
    var target_id = $self.data('target-id');
    var $target = $("#" + target_id);

    $target.css({
      'background-color': 'transparent'
    });
  });

  $("#generate-button").click(function() {

    // Get HTML template
    var html = $("#html").val();

    // Turn HTML into jQuery object
    var $html = $(html);

    // Get the container element
    var $container = $('.container');

    // Empty the container element
    $container.empty();

    var $row = $('<div/>', { 'class': 'row'});
    $row.appendTo($container);

    // Create the headline
    var headline = $('<h1/>', { text: 'Template', 'class': 'span12' });
    headline.appendTo($row);

    var $explanation = $('<p/>', { 
      text: 'Fill in e-mail options and missing text fields ',
      'class': 'span12'
    });
    $explanation.appendTo($row);

    // Create container for the text fields
    var $textFieldsContainer = $('<div/>', { 'class': 'span6' });
    $textFieldsContainer.appendTo($row);

    // Find all template placeholders
    var $occurences = $html.find('[class^="temp_"]');

    // For each occurence, create an input field
    $occurences.each(function() {

      var $self = $(this);

      if($self.is('h1, h2, h3, h4, h5, h6')) {
        createTextField($textFieldsContainer, $self.attr('id'), $self.text());
      } else if($self.is('a')) {
        $self.css('position', 'relative');
        createAnchor($textFieldsContainer, $self.attr('id'), $self.text(), $self.attr('href'));
      } else {
        createTextarea($textFieldsContainer, $self.attr('id'), $self.text());
      }

    });

    // Create a placeholder for the template
    var template = $('<div/>', { 'class': 'span6', id: 'template-container' });
    template.appendTo($row);

    // Insert the template to the placeholder
    template.append($html);

    // Create placeholder for email options
    var emailOptions = $('<div/>', {
      'class': 'row',
      id: 'email-options',
    }).css('margin-top', '20px');
    emailOptions.appendTo($container);

    var senderOptions = $('<div/>', {
      'class': 'span12',
    }).appendTo(emailOptions);

    // Create Sender Email field
    $('<input/>', {
      'class': 'span4',
      id: 'sender-email',
      type: 'text',
      placeholder: 'Sender e-mail'
    }).appendTo(senderOptions);

    $('<input/>', {
      'class': 'span4',
      id: 'sender-nicename',
      type: 'text',
      placeholder: 'Sender nicename'
    }).appendTo(senderOptions);

    $('<input/>', {
      'class': 'span4',
      id: 'subject',
      type: 'text',
      placeholder: 'Subject'
    }).appendTo(senderOptions);

    // Create placeholder for recipient options
    var recipientOptions = $('<div/>', {
      'class': 'span12',
    }).appendTo(emailOptions);

    $('<input>', {
      'class': 'span4',
      id: 'recipient',
      type: 'text'
    }).appendTo(recipientOptions);

    $('<button/>', {
      text: 'Send testmail',
      click: function() {
        $.ajax({
          url: 'sendmail.php',
          type: 'POST',
          data: 'action=testmail&message=' + $('#template-container').html(),
          success: function(response) {
            alert(response);
          }
        })
      }
    }).appendTo(recipientOptions);
    
  });

});


function createTextField($container, id, defaultText) {
  var $f = $('<input/>', {
    'class': 'inputField span6',
    type: 'text',
    value: defaultText
  });

  $f.data('target-id', id);

  $f.appendTo($container);   
}

function createTextarea($container, id, defaultText) {
  var $f = $('<textarea/>', {
    'class': 'inputField span6',
    type: 'text',
    text: defaultText
  });

  $f.data('target-id', id);

  $f.appendTo($container);
}

function createAnchor($container, id, defaultText, defaultHref) {
  var $linkAddressField = $('<input/>', {
    'class': 'linkAddress span6',
    type: 'text',
    value: defaultHref,
    placeholder: 'Link address. Remember http://'
  });

  $linkAddressField.data('target-id', id);
  $('<hr/>').appendTo($container);
  $linkAddressField.appendTo($container);

  var $linkTextField = $('<input/>', {
    'class': 'inputField span6',
    type: 'text',
    value: defaultText,
    placeholder: 'Link text'
  });

  $linkTextField.data('target-id', id);
  $linkTextField.appendTo($container);
  $('<hr/>').appendTo($container);
}