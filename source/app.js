enyo.AjaxSource.create({ name: 'ajax' });

// enyo.AjaxSource.create({name: 'ajaxPost', 
//  requestKind: enyo.kind({
//      kind:"enyo.Ajax",
//      method: "POST",
//      postBody: null
//  })
// });




// var aj = new enyo.Ajax({method: "POST"}).go({
//  item1: "value1",
//  item2: "value2"
// });

// var work = function () {

//  var params = {
//  id: 0,
//     width: null,
//     height: null,
//     mime: null,
//     maxItems: 100,
//     queryType: 3,
//     data: null,
//     classes: [{
//          attributeId: 2,
//          classId: 1
//      }
//      ],
//      data: null
// };

 // params = 'test_key=' + 'test_value';
 //                                        var request = new enyo.Ajax({
 //                                            url: '/',
 //                                            method: "POST",
 //                                            postBody: params
 //                                        });
 //                                        request.go();        
//     console.log(JSON.stringify(params));
//     var serviceUrl = "http://localhost:8081/api/query/";

//     var ajax = new enyo.Ajax({
//      //
//         url: serviceUrl,
//         'Access-Control-Allow-Origin': false,
//         method: 'POST',
//         postBody: params,
//         contentType: "application/json",
//     });
//     ajax.go();
//     ajax.response(this, "processResponse");
//     // ajax.error(this, "processError");
// };
// var processResponse = function (inSender, inResponse) {
//     alert("sucess" + inResponse);
// };
// // var processError = function (inSender, inResponse) {
// //     alert("Error!");
// // }

// work();

// // var postAjax = new enyo.Ajax({
// //   url: 'http://localhost:8081/api/query/'',
// //   method: "POST",
// //   postBody: "id=0"
// //   });

// postAjax.response("processResponse");

// function processResponse(inSender, inResponse) {
//  console.log("AjaxPost");
//  console.log(inSender);
//  console.log(inResponse);
// }
// postAjax.go({});




// var ajax = new enyo.Ajax({
//          url: this.$.baseUrl.getValue()
//      });
//      // send parameters the remote service using the 'go()' method
//      ajax.go({
//          q: this.$.query.getValue()
//      });
//      // attach responders to the transaction object
//      ajax.response(this, "processResponse");
//      // handle error
//      ajax.error(this, "processError");
//  },
//  processResponse: function(inSender, inResponse) {
//      // do something with it
//      this.$.textArea.setValue(JSON.stringify(inResponse, null, 2));
//  },
//  processError: function(inSender, inResponse) {
//      var errorLog = "Error" + ": " + inResponse + "! " + (JSON.parse(inSender.xhrResponse.body)).error.description;
//      this.$.textArea.setValue(JSON.stringify(inSender.xhrResponse, null, 2));
//      this.$.basicPopup.setContent(errorLog);
//      this.$.basicPopup.show();
//  }
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


// {"id":0,"width":null,"height":null,"mime":null,"maxItems":100,"queryType":"3","classes":[{"attributeId"
// :2,"classId":"1"}],"data":null}

// enyo.kind({
//  name: "QueryCollection",
//  kind: "enyo.Collection",
//  source: 'ajaxPost',

//     url: 'http://localhost:8081/api/query/',
//     options: {parse: true, method: "POST"},

//     id: 0,
//     width: null,
//     height: null,
//     mime: null,
//     maxItems: 100,
//     queryType: 3,
//     data: null,

//     parse: function(data) {
//         console.log(data.image_query_reply);
//          return data && data.image_query_reply;
//      },

//  fetch: function(opts) {
//          this.params = {
//              id: this.id,
//              width: this.width,
//              height: this.height,
//              mime: this.mime,
//              maxItems: this.maxItems,
//              queryType: this.queryType,
//              classes: [{
//                  attributeId: this.attributeId,
//                  classId: this.classId
//              }
//              ],
//              data: this.data
//          };
//          this.inherited(arguments);
//      }
// });

var classifiresCollection = new enyo.Collection({
    source: 'ajax',
    url: 'http://localhost:8081/api/axes/',
    options: {parse: true},

    parse: function(data) {
        console.log(data.attributes_reply.complete);
        return data && data.attributes_reply.complete;
    }
});


var classCollection = new enyo.Collection();

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
    name: "ClassifiersDataList",
    kind: "DataList",
    collection: classifiresCollection,
    components: [
        {kind: "ClassifiersPanel"}
    ],

    collectionChanged: function(oldVal) {
        console.log("Coll changed ", this.collection);
    }
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

var params = {
    id: 0,
    width: null,
    height: null,
    mime: null,
    maxItems: 100,
    queryType: 3,
    data: null,
    classes: [{
         attributeId: -1,
         classId: -1
     }
     ],
     data: null
};

var ajax = new enyo.Ajax({
     //
        url: 'http://localhost:8081/api/query/',
        method: 'POST',
        postBody: params,
        contentType: "application/json",
});

var imagesCollection = new enyo.Collection();
var targetPrefix = null;

enyo.kind ({
        kind: "moon.Panel",
        name: "ImagesPanel",
        published: {
            targetPrefix: null,
            items: imagesCollection
        },

        targetPrefixChanged: function(oldValue) {
            console.log("Target prefix changed ", this.targetPrefix);
        },
        itemsChanged: function(oldValue) {
            console.log("items changed ", this.items);
        },


    components: [
            {kind: "moon.DataGridList", fit:true, 
            targetPrefix: null, name: "resultList", minWidth: 250, minHeight: 300, ontap: "itemSelected", components: [
                {kind: "moon.GridListImageItem", imageSizing: "cover", useSubCaption:false, centered:false, bindings: [
                    {from: "model.uri", to:"source", 
                    transform: function(value) {
                        console.log("Value ", value);
                        return targetPrefix + value;
                    }
                }
                ]}
            ]}
        ],

    bindings: [
        {from: "items", to: "$.resultList.collection"},
        {from: "targetPrefix", to: "$.resultList.targetPrefix"},
    ]
});


enyo.kind({
    name: "PanelsWithCarouselArranger",
    classes: "moon enyo-fit",
    published: {
        axeCollection: classifiresCollection,
        clsCollection: classCollection,
        selectedClassifierIndex : -1,
        selectedClassIndex: -1
    },
    create: function() {
        this.inherited(arguments);
        ajax.response(this, "processResponse");
        ajax.error(this, "processError");
    },

    components: [
        {
            name: "panels", kind: "moon.Panels",    
            arrangerKind: "CarouselArranger", classes: "enyo-fit full",
            components: [
                 {title: "Classifiers", name: "classifiersPanel", 
                    components: [
                        {kind: 'ClassifiersDataList', ontap: "next"}
                    ]
                },
                {               
                title: "Classes", name: "classesPanel", kind: "moon.Panel",
                headerComponents: [
                {kind: "moon.Button", small:true, name:"backButton",
                content: "Back", ontap: "back"}
                ],
                components: [
                    {kind: "ClassesDataList", ontap: "next", onkeyup: "go"}
                    ]
              },
              {title: "Images", name: 'imagesPanel', kind: 'ImagesPanel',
               onkeyup: "go" }
           ]
       }],

    back: function(inSender, inEvent) {
        console.log("Back ", inEvent);
        this.$.panels.previous();
        console.log("Classifeire collection ", classifiresCollection);
        return true;
    },

    next: function(inSender, inEvent) {
        console.log("Sender ", inSender);
        console.log("Event ", inEvent);
        var index = inEvent.index;
        if (this.$.panels.getIndex() == 0) {
            console.log("Class cllection ", classCollection);
            console.log("Before ", classifiresCollection);
            classifier = this.get("axeCollection").at(index);
            this.set("selectedClassifierIndex", classifier.get("id"));
            console.log("CLassifier classes ", classifier.get("classes"));
            this.$.panels.getPanels()[1].set("title", classifier.get("name"));
            classCollection.add(classifier.get("classes"));
            console.log("After ", classifiresCollection.at(index));
            // console.log("Class collection ", classCollection);
            // this.$.panels.getPanels()[1].render();
        } else if (this.$.panels.getIndex() == 1) {
            console.log("Index ", index);
            selectedClass = this.get("clsCollection").at(index);
            this.set("selectedClassIndex", index);
            console.log("Selected class is ", selectedClass);

            params.classes[0].attributeId = this.selectedClassifierIndex;
            params.classes[0].classId = this.selectedClassIndex;
            console.log("Ajax ", ajax.get("postBody"));
            console.log("Collections ", classifiresCollection);
            ajax.go();


        } else if (this.$.panels.getIndex() == 2) {
         
         
        }
        this.$.panels.next();
        return true;
    },

    processResponse: function (inSender, inResponse) {
        console.log("sucess", inResponse);
        this.$.imagesPanel.set("targetPrefix", 
            inResponse.image_query_reply.target_prefix);
        // targetPrefix = inResponse.image_query_reply.target_prefix;
        targetPrefix = "http://192.168.81.80:8080/images";
        console.log("items ", inResponse.image_query_reply.items)
        items = this.$.imagesPanel.get("items");
        console.log(items);
        items.add(inResponse.image_query_reply.items);
        // this.$.panels.getPanels()[2].render();
    },
    processError: function (inSender, inResponse) {
        console.error("Ajax Error!");
    }
});


enyo.ready(function() {
    classifiresCollection.fetch();
    new enyo.Application({ name: 'app', view: 'PanelsWithCarouselArranger' });
 });