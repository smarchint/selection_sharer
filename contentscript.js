var getSelectedText = function () {
  var selectedText = '';

  if (window.getSelection()) {
    selectedText = window.getSelection();
  } else if (document.getSelection()) {
    selectedText = document.getSelection();
  } else if (document.selection) {
    selectedText = document.selection.createRange().text;
  }

  return selectedText;
};


$(document).ready(function(){
	$(window).mouseup(function(){
		var selectedText = window.getSelection().toString();
		console.log(selectedText);
	})
})