console.log("popup.js");


var initData = [
	{
		text: "this is a text",
		id: 1
	},
	{
		text: "this is another text",
		id: 2
	},
	{
		text: "this is also a text",
		id: 3
	}
];



class Note{
	constructor(title,text){
		this.title = title;
		this.text = text;
		this.markup = '<div class="note">\
				<div class="title">'+this.title+'</div>\
				<div class="body">'+this.text+'</div>\
			  </div>';
	}
	static getParentContainer(){
		return 'app';
	}
	add(){
		console.log('adding');
		var className = Note.getParentContainer();
		var markup = this.markup;
		console.log(markup);
		$('#'+className).append(markup);
	}
}
$(document).ready(function(){
	for (var i = initData.length - 1; i >= 0; i--) {
		var note = new Note('temp',initData[i].text);
		// $('#app').append(note.markup);
		note.add()
	}
})
