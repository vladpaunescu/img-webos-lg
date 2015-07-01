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
	collection: collection,
	selectedClassifier : -1,

    getSelectedClassifier: function() {
		console.log(collection.get(selectedClassifier));
		return collection.get(selectedClassifier).name;
	},

	components: [
		{name: "panels", kind: "moon.Panels", arrangerKind: "CarouselArranger", classes: "enyo-fit full", components: [
			{title: "Classifiers", components: [
				{kind: 'ClassifiersDataList', ontap: "next"}
			]},
			{	selectedClassifier: "",
				title: "Classes" + selectedClassifier, components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Third", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Fourth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Fifth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Sixth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Seventh", components: [
				{kind: "moon.Item", content: "Item One"},
				{kind: "moon.Item", content: "Item Two"},
				{kind: "moon.Item", content: "Item Three"},
				{kind: "moon.Item", content: "Item Four"},
				{kind: "moon.Item", content: "Item Five"}
			]}
		]}
	],

	next: function(inSender, inEvent) {
		console.log("Sender ", inSender);
		console.log("Event ", inEvent);
		var index = inEvent.index;
		this.selectedClassifier = index;

        console.log(index, item);
		this.$.panels.next();
		return true;
	}
});


enyo.ready(function() {
	collection.fetch();
    new enyo.Application({ name: 'app', view: 'PanelsWithCarouselArranger' });
 });