var siteStore = {};
counter = 0;

function printObject(obj){
	console.log(obj);
	if(obj){
		for(var x in obj){
			console.log(x,obj[x]);
		}
	}
}

function saveSelection(){
	var range = lightrange.saveSelection();
	if(!containsObject(range,siteStore)){
		siteStore[counter] = range;
		counter++;
	}
function containsObject(obj, list) {
    var i;
    for (var x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }
    return false;
}
function saveInLocalStorage(obj){
	console.log(obj);
	for(var x in obj){
		if(obj.hasOwnProperty(x)){
			obj[x] = JSON.stringify(obj[x]);
		}
	}
	return obj;
}

$(document).ready(function(){
	$('body').mouseup(saveSelection);
	$('.saveme').click(function(){
		console.log(siteStore);
		localStorage.setItem('selections',siteStore);
	});
	window.onload = function(){
		var siteStore = localStorage.getItem('selections');
		if(siteStore){
			counter = Object.keys(siteStore).length;
		}
		printObject(siteStore);
	}
});