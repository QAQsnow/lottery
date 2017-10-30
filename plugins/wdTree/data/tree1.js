function createNode(){
  var root = {
    "id" : "0",
    "text" : "root",
    "value" : "root",
    "showcheck" : true,
    complete : true,
    "isexpand" : true,
    "oncheckboxclick":function(){
       console.log(arguments);
    },
    onnodeclick: true,
    //"checkstate" : 1,
     cascadecheck: false,
    "hasChildren" : true
  };
  var arr = [];
  for(var i= 1;i<100; i++){
    var subarr = [];
    for(var j=1;j<100;j++){
      
          var value = "node-" + i + "-" + j; 
          subarr.push( {
         "id" : value,
         "text" : value,
         "value" : value,
         "showcheck" : true,
         'theme':"bbit-tree-lines",
          "checkstate" :1,
         "oncheckboxclick":true,
         cascadecheck: false,
         "isexpand" : false,
         
         "hasChildren" : false})
      
    }
    arr.push( {
      "id" : "node-" + i,
      "text" : "node-" + i,
      "value" : "node-" + i,
      "showcheck" : true,
      complete : true,
      "isexpand" : false,
      "checkstate" : i%2==0?1:0,
      'theme':"bbit-tree-lines",
      "hasChildren" : i%2==0?true:false,
      "ChildNodes" : i%2==0?subarr:[]
    });
  }
  root["ChildNodes"] = arr;
  return root; 
}

treedata = [createNode()];
