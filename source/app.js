enyo.AjaxSource.create({ name: 'ajax' });

// enyo.AjaxSource.create({name: 'ajaxPost', 
// 	requestKind: enyo.kind({
// 		kind:"enyo.Ajax",
// 		method: "POST",
// 		postBody: null
// 	})
// });

var params = {
	id: 0,
  //   width: null,
  //   height: null,
  //   mime: null,
  //   maxItems: 100,
  //   queryType: 3,
  //   data: null,
  //   classes: [{
 	// 	attributeId: 2,
 	// 	classId: 1
 	// }
 	// ],
 	// data: null
};



var work = function () {
    
    var serviceUrl = "http://localhost:8081/api/query/";

    var ajax = new enyo.Ajax({
        url: serviceUrl,
        method: 'POST',
        handleAs: "json",
        contentType: "application/json",
        postBody: "id=0"
    });
    ajax.go();
    ajax.response(this, "processResponse");
    // ajax.error(this, "processError");
};
var processResponse = function (inSender, inResponse) {
    alert("sucess" + inResponse);
};
// var processError = function (inSender, inResponse) {
//     alert("Error!");
// }

work();

// // var postAjax = new enyo.Ajax({
// // 	url: 'http://localhost:8081/api/query/'',
// // 	method: "POST",
// // 	postBody: "id=0"
// // 	});

// postAjax.response("processResponse");

// function processResponse(inSender, inResponse) {
// 	console.log("AjaxPost");
// 	console.log(inSender);
// 	console.log(inResponse);
// }
// postAjax.go({});




// var ajax = new enyo.Ajax({
// 			url: this.$.baseUrl.getValue()
// 		});
// 		// send parameters the remote service using the 'go()' method
// 		ajax.go({
// 			q: this.$.query.getValue()
// 		});
// 		// attach responders to the transaction object
// 		ajax.response(this, "processResponse");
// 		// handle error
// 		ajax.error(this, "processError");
// 	},
// 	processResponse: function(inSender, inResponse) {
// 		// do something with it
// 		this.$.textArea.setValue(JSON.stringify(inResponse, null, 2));
// 	},
// 	processError: function(inSender, inResponse) {
// 		var errorLog = "Error" + ": " + inResponse + "! " + (JSON.parse(inSender.xhrResponse.body)).error.description;
// 		this.$.textArea.setValue(JSON.stringify(inSender.xhrResponse, null, 2));
// 		this.$.basicPopup.setContent(errorLog);
// 		this.$.basicPopup.show();
// 	}
// });


// function postInvoice(invoice) {
//             var request = new enyo.Ajax({url: document.location.origin+"/invoice/",
//                 handleAs: "json",method:"POST",contentType:"application/json",
//                 postBody:  JSON.stringify(invoice)});
//             request.response(this, function(inSender, inData) {
//                 alert(inData.invoice); 
//             });
//             request.go();
//         };

// var collection = new enyo.Collection({
//     source: 'ajax',
//     url: 'http://localhost:8081/api/axes/',
//     options: {parse: true},

//     parse: function(data) {
//         console.log(data.attributes_reply.complete);
//  		return data && data.attributes_reply.complete;
//  	}
// });


// {"id":0,"width":null,"height":null,"mime":null,"maxItems":100,"queryType":"3","classes":[{"attributeId"
// :2,"classId":"1"}],"data":null}

// var classCollection = new enyo.Collection();

enyo.kind({
	name: "QueryCollection",
	kind: "enyo.Collection",
	source: 'ajaxPost',

    url: 'http://localhost:8081/api/query/',
    options: {parse: true, method: "POST"},

    id: 0,
    width: null,
    height: null,
    mime: null,
    maxItems: 100,
    queryType: 3,
    data: null,

    parse: function(data) {
        console.log(data.image_query_reply);
 		return data && data.image_query_reply;
 	},

	fetch: function(opts) {
 		this.params = {
 			id: this.id,
 			width: this.width,
 			height: this.height,
 			mime: this.mime,
 			maxItems: this.maxItems,
 			queryType: this.queryType,
 			classes: [{
 				attributeId: this.attributeId,
 				classId: this.classId
 			}
 			],
 			data: this.data
 		};
 		this.inherited(arguments);
 	}
});

var queryCollection = new QueryCollection({
	attributeId: 2,
	classId: 1
})
queryCollection.fetch()

enyo.kind({
    name: "CategoryCollection",
    kind: "enyo.collection",
    options: {parse: true},
    parse: function(data) {
        return data && data.attributes_reply.complete;
    }
});

enyo.kind({
    name: "ClassifiersDataList",
    kind: "DataList",
    collection: collection,
    components: [
        {kind: "ClassifiersPanel"}
    ]
});

enyo.kind ({
        name: "ClassifiersPanel",
        published: {
            model: null,
        },
        components: [ 
            {kind: "moon.Item", 'index': null}
        ],
        bindings: [
        	{from: "model.name", to: "$.item.content" }
        ]
});

enyo.kind({
    name: "ClassesDataList",
    kind: "DataList",
    collection: classCollection,
    components: [
        {kind: "ClassesPanel"}
    ]
});



enyo.kind ({
        name: "ClassesPanel",
        published: {
            model: null,
        },
        components: [ 
            {kind: "moon.Item", 'index': null}
        ],
        bindings: [
        	{from: "model.name", to: "$.item.content" }
        ]
});

enyo.kind({
	name: "PanelsWithCarouselArranger",
	classes: "moon enyo-fit",
	published: {
		collection: collection,
		classCollection: classCollection,
		selectedClassifier : null,
		selectedClass: null,
		currentIndex: -1
	},

	components: [
		{name: "panels", kind: "moon.Panels",	
		arrangerKind: "CarouselArranger", classes: "enyo-fit full",
		components: [
			{title: "Classifiers", name: "classifiersPanel", components: [
				{kind: 'ClassifiersDataList', ontap: "next"},
			]},
			{				
				title: "Classes", name: "classesPanel", kind: "moon.Panel",
				components: [
				{kind: "ClassesDataList", ontap: "next"}
				]
		},
			{title: "Third", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
			]}
		]
		}
	],

	next: function(inSender, inEvent) {
		console.log("Sender ", inSender);
		console.log("Event ", inEvent);
		var index = inEvent.index;
        if (this.$.panels.getIndex() == 0) {
        	// first panel
        	this.set("selectedClassifier", this.get("collection").at(index));
        	console.log("Selected classifier is ", this.selectedClassifier);
        	this.$.panels.getPanels()[1].set("title", this.selectedClassifier.get("name"));
        	console.log(this.selectedClassifier.get("classes"));
        	classCollection.add(this.selectedClassifier.get("classes"));
        	console.log("Class collection ", classCollection);
        	this.$.panels.getPanels()[1].render();
        } else if (this.$.panel.getIndex() == 1) {
        	this.set("selectedClass", this.get("classCollection").at(index));
        	console.log("Selected class is ", this.selectedClass);

        }
		this.$.panels.next();
		return true;
	}
});


enyo.ready(function() {
	collection.fetch();
    new enyo.Application({ name: 'app', view: 'PanelsWithCarouselArranger' });
 });