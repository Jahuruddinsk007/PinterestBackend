// function add(){
//     console.log("hiiii")
// }

// add()
var uC=require('upper-case')
var http=require('http');
var testData="hi all";
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':"text/html"});
    res.write(uC.upperCase(testData));
    res.end();
}).listen(4300)