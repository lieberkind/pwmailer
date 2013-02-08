var generator = (function(containerElem) {
  var regEx = /\(\*([A-z]|[0-9]|)*\*\)/g;
  var container = $(containerElem);

  var API = {};
  
  /**
  * 
  */
  API.findMatches = function(html) {
    var tempArray;
    var results = new Array();

    // Loop through all matches and accumulate results
    while((tempArray = regEx.exec(html)) !== null) {
      results.push(tempArray);
    } 

    return results;
  };

  /**
  *
  */
  API.createTemplate = function(matches, html) {
    var result = html;

    for(var i = 0; i < matches.length; i++) {
      var match = matches[i][0];
      var id = match.substring(2, match.length-2);

      var span = '<span id="' + id + '"></span>';

      result = result.replace(match, span);
    }

    return $(result);
  };

  API.createInputFields = function(matches) {

    var textFields = new Array();

    for(var i = 0; i < matches.length; i++) {
      var match = matches[i][0];
      var elemid = match.substring(2, match.length-2);

      var elem = $('<input/>');

      textFields.push(elem);
    }

    return textFields;
  }

  API.renderPage = function(html) {
    var matches = API.findMatches(html);
    //var template = API.createTextFields(html);
    //var textFields = createTextFields();
    //var tempalte = createTemplate();
    var template = API.createTemplate(matches, html);

    // Headline
    var headline = $('<h1/>', { text: 'HTML Mail Generator' });
    headline.appendTo(container);

    var optionsHeader = $('<div/>', {'class': 'row'});
    optionsHeader.appendTo(container);

    // Container for the content
    var row = $('<div/>', { 'class': 'row' });
    row.appendTo(container);

    // The generated text fields
    var textFieldsContainer = $('<div/>', {'class': 'span6'});
    //textFieldsContainer.css({'box-sizing': 'border-box', 'border': '1px solid #ccc'});
    textFieldsContainer.appendTo(row);

    // The template container
    var templateContainer = $('<div/>', {'class': 'span6'});
    templateContainer.css({'box-sizing': 'border-box', 'border': '1px solid #ccc'});
    templateContainer.append(template);
    templateContainer.appendTo(row);

    var fields = API.createInputFields(matches, template);
    for(var i = 0; i < fields.length; i++) {
      fields[i].appendTo(textFieldsContainer);
    }
    
    // var input = $('<input/>', { id: 'input1'});
    // input.keyup(function() {
    //   $('#paragraph').text(this.value);
    // });

    //input.appendTo(textFieldsContainer);
    


  }

  return API;
})(".container");

$(document).ready(function() {

  $("#generate-button").click(function() {
    var html = $("#html").val();
    

    //alert(html.match(regEx).length);

    $(".container").empty();
    //generator.createTemplate();
    createTemplate(html);

    generator.renderPage(html);
  });

});