 enyo.AjaxSource.create({ name: 'ajax' });
var collection = new enyo.Collection({
    source: 'ajax',
    url: 'http://localhost:8081/api/axes/',
    options: {parse: true},

    parse: function(data) {
        console.log(data.attributes_reply.complete);
 		return data && data.attributes_reply.complete;
 	}
});

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
            {kind: "moon.Item", 'index': null, ontap: "next"}
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
		selectedClassifier : null,
		currentIndex: -1
	},

	components: [
		{name: "panels", kind: "moon.Panels", 
		selectedClassifier: null,
		arrangerKind: "CarouselArranger", classes: "enyo-fit full", published: {selectedClassifier: -1},
		components: [
			{title: "Classifiers", components: [
				{kind: 'ClassifiersDataList', ontap: "next"}
			]},
			{				
				title: "Classes", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
			]},
			{title: "Third", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]}
		]}
	],
	bindings : [
		{from: "selectedClassifier", to: "$.panels.selectedClassifier"}
	],

	next: function(inSender, inEvent) {
		console.log("Sender ", inSender);
		console.log("Event ", inEvent);
		var index = inEvent.index;
        if (this.$.panels.getIndex() == 0) {
        	// first panel
        	this.selectedClassifier = this.get("collection").at(index);
        	console.log("Selected classifier is ", this.selectedClassifier);
        	this.$.panels.getPanels()[1].set("title", this.selectedClassifier.get("name"));
        }
		this.$.panels.next();
		return true;
	}
});


enyo.ready(function() {
	collection.fetch();
    new enyo.Application({ name: 'app', view: 'PanelsWithCarouselArranger' });
 });