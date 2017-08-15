
var selections = [];
cookieName = 'myRangySelections';
var persistentSelectionWrapper,selectionWrapper;
window.onload = function(){
	// $('body').selectionSharer();
	rangy.init();
	selectionWrapper = rangy.createClassApplier("normal-selections");
	persistentSelectionWrapper = rangy.createClassApplier("persistent-selections");
	var handlers = {
		saveAsSelection : function(){
			selectionWrapper.applyToSelection();
			console.log('saveAsSelection');
		},
		saveAsNotes : function(){
			persistentSelectionWrapper.applyToSelection();
			console.log('saveAsNotes');
		}
	};
	$('p').selectionSharer(handlers);
	pickeled_selections = $.cookie(cookieName);
	console.log(pickeled_selections);
	if(pickeled_selections){
		try{
			selections = JSON.parse(pickeled_selections);
			selections.forEach(function(sel){
				rangy.deserializeSelection(sel);
				persistentSelectionWrapper.applyToSelection();
			});
		}catch(err){
			console.log(err);
		}
	}
	
};

$(document).ready(function(){

	$('body').mouseup(function(){
		var sel = rangy.getSelection();

		serializedSelection = rangy.serializeSelection(sel,true);
		selections.push(serializedSelection);
		// $.cookie(cookieName,serializedSelection);
	});
	$('#btn-cookie').click(function(){
		uniqueSelections = Array.from(new Set(selections));
		var cookieVal = JSON.stringify(uniqueSelections);
		$.cookie(cookieName,cookieVal);
	});
});