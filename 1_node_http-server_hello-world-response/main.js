var http = require("http");
var url = require('url');

http.createServer(function (request, response) {
  // Send the HTTP header 
  // HTTP Status: 200 : OK
  // Content Type: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});
   
  // Read URL
  var query = url.parse(request.url, true).query;
  var text = query.year + " " + query.month;
  console.log("text= " + text);
  
  // Check URL
  if (text!=="") {
    // Send the response body of the text variable
    response.end(text+"\n");
  }else{
    // Send the default response body as "Hello World"
    response.end('Hello World\n');
  }
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
