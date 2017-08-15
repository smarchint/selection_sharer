function test(){
	console.log('content script active');
}

$(document).ready(function(){
	test();
	$('p').selectionSharer();
	$.ajax({
		url: chrome.runtime.getURL('content_script/SelectionSharer.css'),
		type: 'GET',
		dataType: "text",
		success: function(css) {
			$('body').append('<style>'+ css + '</style>');
		},
		error: function(errorData){
			console.log('couldn\'t log SelectionSharer.css file');
		}
	});
})