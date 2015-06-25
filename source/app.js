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
        url: 'http://lg1.arnia.ro/api/axes/',
        options: {parse: true},

        parse: function(data) {
     		return data && data.attributes_reply.complete;
     	}
    });

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

   enyo.kind({
        name: 'AxeView',
        kind: 'DataList',
        collection: null,
		components: [
			{kind: "moon.Item", bindings: [
					{from: "model", to:"content"}
				]
			}
			]
    });

    enyo.kind({
        name: 'RepoView',
        kind: 'DataList',
        collection: collection,
		components: [
			// {kind: "moon.Item", bindings: [
			// 		{from: "model.name", to:"content"}
			// 	]
			// },
			{
				kind :"AxeView",
				bindings: [
				{from: "model.classes", to: "collection"}
			]
			}
			]
    });

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



    new enyo.Application({ name: 'app', view: 'RepoView' });

    collection.fetch();
});