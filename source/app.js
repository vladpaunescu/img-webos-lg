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
        model: null,
        components: [
            {kind: 
                "moon.ExpandableListItem", 
                name: "header",  
                content: null,
                published: {
                    data: null
                },
                components:  [
                { kind: 'enyo.Repeater',
                    name: "repeater",
                    onSetupItem: "setUpItem",
                    components: [
                        {kind: "moon.Item"}
                    ]
                }
                ],
                setUpItem: function(inSender, inEvent) {
                     var index = inEvent.index;
                     var item = inEvent.item;
                     inEvent.item.$.setContent(this.collection[index].name);
                     console.log(this.collection);
                },
                dataChanged: function() {
                   console.log(this.data.length);
                   this.$.repeater.setCount(this.data.length);
                   return true;
                },
                create: function() {
                    this.inherited(arguments);
                    this.$.repeater.setCount(this.data.length);
                },
            }
              
        ],
        bindings: [
            { from: 'model.name', to: '$.header.content' },
            { from: 'model.classes', to: '.$.header.data' }
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