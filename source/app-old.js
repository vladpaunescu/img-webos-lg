/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

enyo.kind({
	name: "imgrec.Application",
	kind: "enyo.Application",
	view: "flickr.MainView"
});

// enyo.ready(function () {
// 	new imgrec.Application({name: "app"});
// });


enyo.ready(function() {

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

    enyo.kind ({
        name: 'ClassItemView',
        model: null,
        components: [
             {kind: "moon.Item", name: "header"},
        ],
        bindings: [
            { from: '.model.name', to: '$.header.content' }
        ],
    });

    enyo.kind({
        name: 'CategoryDataList',
        kind: 'DataRepeater',
        collection: null,
        components: [{            
           components: [
             {kind: "moon.Item", name: "header"},
            ],
            bindings: [
            { from: '.model.name', to: '.$.header.content' }
            ]
        }]
    });

    

    enyo.kind ({
        name: 'CategoryView',
        kind: "Scroller",
        published: {
            model: null,
        },
create: function(){
         this.inherited(arguments);
         console.log("Goodie", this.$);
    },

        components: [ 
            {   kind: "moon.ExpandableListItem", 
                name: "header",  
                content: null,
                published: {
                    people: []
                },

                create: function(){
             this.inherited(arguments);
             console.log("Goodie 2" , this.$);
              },


             components: [
                    {kind: "Repeater", count: 100, onSetupItem:"setupItem", components: [
                        {name:"item", classes:"repeater-sample-item", components: [
                            {tag:"span", name: "personNumber"},
                            {tag:"span", name: "personName"}
                        ]}
                    ]}
                ],
                // create: function() {
                //     this.inherited(arguments);
                //     this.$.repeater.setCount(this.people.length);
                // },
                setupItem: function(inSender, inEvent) {
                    console.log("people", this.people);
                    var index = inEvent.index;
                    var item = inEvent.item;
                    var person = this.people[index];
                    item.$.personNumber.setContent((index+1) + ". ");
                    item.$.personName.setContent(person.name);
                    // item.$.personName.applyStyle("color", person.sex == "male" ? "dodgerblue" : "deeppink");
                    /* stop propagation */
                    return true;
                },

                peopleChanged: function() {
                   this.$.repeater.setCount(this.people.length);
                }

                // components:  [
                // {   kind: 'enyo.Repeater',
                //     name: "repeater",
                   
                //     onSetupItem: "setUpItem",
                //     components: [
                //         {kind: "moon.Item", name: "element"}
                //     ],
                //     setUpItem: function(inSender, inEvent) {
                //         var index = inEvent.index;
                //         var item = inEvent.item;
                //         item.$.element.setContent(this.data[index].name);
                //         console.log("Sada ", this.data);
                //     },
                //     dataChanged: function(oldValue) {
                //        console.log(this.data.length);
                //        console.log(this.$);
                //        this.setCount("Data there", this.data);
                //        return true;
                //     }
                // }
                // ],
                // dataChanged: function(oldValue) {
                //    // console.log("Data here ", this.data);
                //    $.repeater.set("data", this.data);
                // },
                // bindings: [
                //     { from: 'data', to: '.$.repeater.collection' }
                //     ]
            }
              
        ],
        bindings: [
            { from: 'model.name', to: '$.header.content' },
            { from: 'model.classes', to: '.$.header.people' }
        ]
    });

    enyo.kind({
        name: 'AxesDataList',
        kind: 'DataList',
        collection: collection,
        components: [
            {kind: 'CategoryView'}
        ]
    });

    enyo.kind({
    name: "enyo.sample.RepeaterSample",
    classes: "enyo-fit repeater-sample",
    components: [
        {kind: "Repeater", onSetupItem:"setupItem", components: [
            {name:"item", classes:"repeater-sample-item", components: [
                {tag:"span", name: "personNumber"},
                {tag:"span", name: "personName"}
            ]}
        ]}
    ],
    create: function() {
        this.inherited(arguments);
        this.$.repeater.setCount(this.people.length);
    },
    setupItem: function(inSender, inEvent) {
        var index = inEvent.index;
        var item = inEvent.item;
        var person = this.people[index];
        item.$.personNumber.setContent((index+1) + ". ");
        item.$.personName.setContent(person.name);
        item.$.personName.applyStyle("color", person.sex == "male" ? "dodgerblue" : "deeppink");
        /* stop propagation */
        return true;
    },
    people: [
        {name: "Andrew", sex:"male"},
        {name: "Betty", sex:"female"},
        {name: "Christopher", sex:"male"},
        {name: "Donna", sex:"female"},
        {name: "Ephraim", sex:"male"},
        {name: "Frankie", sex:"male"},
        {name: "Gerald", sex:"male"},
        {name: "Heather", sex:"female"},
        {name: "Ingred", sex:"female"},
        {name: "Jack", sex:"male"},
        {name: "Kevin", sex:"male"},
        {name: "Lucy", sex:"female"},
        {name: "Matthew", sex:"male"},
        {name: "Noreen", sex:"female"},
        {name: "Oscar", sex:"male"},
        {name: "Pedro", sex:"male"},
        {name: "Quentin", sex:"male"},
        {name: "Ralph", sex:"male"},
        {name: "Steven", sex:"male"},
        {name: "Tracy", sex:"female"},
        {name: "Uma", sex:"female"},
        {name: "Victor", sex:"male"},
        {name: "Wendy", sex:"female"},
        {name: "Xin", sex:"male"},
        {name: "Yulia", sex:"female"},
        {name: "Zoltan"}
    ]
});


    new enyo.Application({ name: 'app', view: 'AxesDataList' });

    collection.fetch();



    // enyo.kind({
    //     name: 'RepoView',
    //     kind: 'DataRepeater',
    //     collection: collection,
    //     components: [
    //     	{	kind: "moon.ExpandableListItem", name: "header",
    //     		components: [{content: "Item One"}],
    //     		bindings: [
    //             	{ from: 'model.name', to: '$.header.content' }
    //                  ///  from: 'model.classes', to: '$.axes'
    //             ]
    //     	}]
    // });

    // enyo.kind({
    //     name: 'AxeView',
    //     kind: 'DataRepeater',
    //     components: [{
    //     	components: [{ name: 'axe' },       
    //     				],
    //     	bindings: [
    //             { from: 'model.name', to: '$.axe.content' },
    //        ]
    //     }]
    // });

  //  enyo.kind({
  //       name: 'AxeView',
  //       kind: 'DataList',
  //       collection: null,
		// components: [
		// 	{kind: "moon.Item", bindings: [
		// 			{from: "model", to:"content"}
		// 		]
		// 	}
		// 	]
  //   });

  //   enyo.kind({
  //       name: 'RepoView',
  //       kind: 'DataList',
  //       collection: collection,
		// components: [
		// 	// {kind: "moon.Item", bindings: [
		// 	// 		{from: "model.name", to:"content"}
		// 	// 	]
		// 	// },
		// 	{
		// 		kind :"AxeView",
		// 		bindings: [
		// 		{from: "model.classes", to: "collection"}
		// 	]
		// 	}
		// 	]
  //   });

// enyo.ready(function() {
//     enyo.AjaxSource.create({ name: 'ajax' });
//     var collection = new enyo.Collection({
//         source: 'ajax',
//         url: 'https://api.github.com/users/enyojs/repos'
//     });

//     enyo.kind({
//         name: 'RepoView',
//         kind: 'DataRepeater',
//         collection: collection,
//         components: [{
//             components: [{ name: 'name' }],
//             bindings: [
//                 { from: 'model."full_name"', to: '$.name.content' }
//             ]
//         }]
//     });

//     new enyo.Application({ name: 'app', view: 'RepoView' });

//     collection.fetch();
// });



});