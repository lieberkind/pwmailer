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

  $('#ready-to-send').click(function() {
  	var htmlTemplate = $('#template-container').html();
  	$('input[name=html-template]').val(htmlTemplate);
  });

	// Get input field container
	var inputFieldContainer = $('#field-container');

	// Get the template HTML as jQuery element
	var template = $('#template-container');

	// Find all editableElements
	var editableElements = template.find('.editable');

	traverseEditableElements(editableElements, inputFieldContainer);
});

/*

*/
function traverseEditableElements(editableElements, inputFieldContainer) {

	// Unique ID number.
	var idCount = 0;
	
	// Start the traversal
	editableElements.each(function() {
		$elem = $(this);

		// Generate and assign unique ID to editable element
		$elem.setID('id-' + idCount++);

		// Create input element for editable element
		addInputField($elem, inputFieldContainer);
	});

}

function addInputField(elem, inputFieldContainer) {

	var elementID 	= $elem.attr('id');
	var elementText = $elem.text();

	if($elem.is('h1, h2, h3, h4, h5, h6')) {
		addTextField(inputFieldContainer, elementID, elementText);
	} else if($elem.is('a')) {
		addAnchor(inputFieldContainer, elementID, elementText, $elem.attr('href'));
	} else {
		addTextarea(inputFieldContainer, elementID, elementText);
	}
}

function addTextField(container, id, defaultText) {
  var $f = $('<input/>', {
    'class': 'inputField span6',
    type: 'text',
    value: defaultText
  });

  $f.data('target-id', id);

  $f.appendTo(container);   
}

function addTextarea(container, id, defaultText) {
  var $f = $('<textarea/>', {
    'class': 'inputField span6',
    type: 'text',
    text: defaultText
  });

  $f.data('target-id', id);

  $f.appendTo(container);
}

function addAnchor(container, id, defaultText, defaultHref) {
  var $linkAddressField = $('<input/>', {
    'class': 'linkAddress span6',
    type: 'text',
    value: defaultHref,
    placeholder: 'Link address. Remember http://'
  });

  $linkAddressField.data('target-id', id);
  $('<hr/>').appendTo(container);
  $linkAddressField.appendTo(container);

  var $linkTextField = $('<input/>', {
    'class': 'inputField span6',
    type: 'text',
    value: defaultText,
    placeholder: 'Link text'
  });

  $linkTextField.data('target-id', id);
  $linkTextField.appendTo(container);
  $('<hr/>').appendTo(container);
}


/* jQuery add-ons */
(function($){
   $.fn.setID = function(id) {
      $(this).attr('id', id);
   }; 
})(jQuery);