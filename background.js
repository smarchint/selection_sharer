class SiteNotes(){
	constructor(config){
		this.text = '';
		this.draft = [];
		this.notes = [];
		this.tags = [];
		this.catagories = [];
		this.url = config.url || window.location.href;
		this.timestamp = Date.now();
		this.debug = config.debug || false;
	}
	prettifyTimestamp(){
		return new Date(this.timestamp).toLocaleString();
	}
	updateTimestamp(){
		this.timestamp = Date.now();
	}
	addTag(atag){
		if(Array.isArray(atag)){
			this.tags.concat(atag);
		}
		else if(atag.isString()){
			this.tags.push(atag);
		}
		if(this.debug == true) console.log(atag.toString() + ' has beed added');
	}
	// removeTag(atag){}
	addCatagory(catagory){
		if(Array.isArray(catagory)){
			this.catagories.concat(catagory);
		}
		else if(catagory.isString()){
			this.catagory.push(catagory);
		}
		if(this.debug == true) console.log(catagory.toString() + ' has beed added');
	}
	// removeCatagory(catagory){}
	updateNotes(){
		this.notes.concat(this.draft);
		this.updateTimestamp();
		if(this.debug == true) console.log('Saved Notes successfully : '+ this.notes.toString());
	}
	updateDraft(note){
		this.draft.push(note);
		this.updateTimestamp();
		if(this.debug == true) console.log(catagory.toString() + ' has beed added');
	}
	toString(){
		var completeNotes = '';
		for (var i = 0; i < this.notes.length; i++) {
			completeNotes += this.notes[i].toString();
		}
		return completeNotes;
	}
}



class Note{
	constructor(config){
		this.text  = config.text || '';
		this.selection = config.selection || undefined;
		this.markup = undefined; //to be defined - heading\text\link etc
	}
	updateNote(text){
		this.text = text;
	}
	toString(){
		return this.text;
	}
}


class Store{
	constructor(){
		//generate from localstorage
		this.siteNotesPool = {};
		this.defaultConfig = {};
	}
	createSiteNotes(config){
		var config = config || this.defaultConfig;
		this.siteNotesPool[this.url] = new SiteNotes(config);
	}
	getSiteNotes(url){
		var siteNotesPool = this.siteNotesPool;
		if(siteNotesPool.hasOwnProperty(url) && siteNotesPool[url] !== undefined ){
			return siteNotesPool;
		}
		return null;
	}
	updateSiteNotes(siiteNotes){
		this.siteNotesPool[siteNotes.url] = siteNotes;
	}
}

//main logic
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.pageAction.show(sender.tab.id);
	sendResponse();
});

