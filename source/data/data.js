/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/

// enyo.kind({
// 	name: "flickr.Source",
// 	kind: "enyo.JsonpSource",
// 	urlRoot: "https://api.flickr.com/services/rest/",
// 	fetch: function(rec, opts) {
// 		opts.callbackName = "jsoncallback";
// 		opts.params = enyo.clone(rec.params);
// 		opts.params.api_key = "2a21b46e58d207e4888e1ece0cb149a5";
// 		opts.params.format = "json";
// 		this.inherited(arguments);
// 	}
// });

enyo.kind({
	name: "imgrec.AxesSource",
	kind: "enyo.AjaxSource",
	urlRoot: "http://lg1.arnia.ro/api/axes/",
	fetch: function(rec, opts) {
		opts.params = enyo.clone(rec.params);
		opts.params.format = "json";
		this.inherited(arguments);
	}
});

enyo.AjaxSource.create({name: 'imgrec.AxesSource'});

enyo.kind({
    name: "imgrec.AxesModel",
    kind: "enyo.Model",
    source: "imgrec.AxesSource",

	fetch: function(opts) {
		this.params = {
			
		};
		return this.inherited(arguments);
	},
    parse: function(data) {
     	console.log("Data is ", data.result);
        return data.result;
     }
});

 var myModel = new imgrec.AxesModel();
 console.log(myModel.fetch());

// new imgrec.Source({name: "imgrec"});

// enyo.kind({
// 	name: "imgrec.SearchCollection",
// 	kind: "enyo.Collection",
// 	source: "imgrec",
// 	create: function() {
// 		this.fetch();
// 	},
// 	fetch: function(opts) {
// 		this.params = {};
// 		resp = this.inherited(arguments);
// 		console.log("here", resp);
// 		return resp;
// 	}
// });
