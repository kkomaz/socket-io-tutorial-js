/* 
  Module dependencies:

  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)
  - Underscore (because it's cool)
  - Socket.IO(Note: we need a web server to attach Socket.IO to)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
  The only exception is Underscore, where we use, conveniently, an 
  underscore. Oh, and "socket.io" is simply called io. Seriously, the 
  rest should be named after its module name.

*/

var express = require('express');
    app = express();
    http = require("http").createServer(app);
    bodyParser = require('body-parser');
    io = require('socket.io').listen(http);
    _ = require('underscore');

// Refactor for more restful routes
// var routes = require("./routes/index");
// app.use("/", routes);

//Server configuration
app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);

//Specify the views folder 
//see if your can refactor with require path (**)
app.set("views", __dirname + "/views");

//View engine is in Jade
app.set("view engine", "jade");

//Specify where static content is
app.use(express.static("public", __dirname + "/public"));

app.use(bodyParser.json());


app.get("/", function(request, response){
  response.render("index");
});

app.post("/message", function(request, response) {
  //The request body expects a param named "message"
  var message = request.body.message;
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }
  response.json(200, {message: "Message received"});
});

//curl -X POST -H 'Content-Type:application/json' 'http://127.0.0.1:8080/message' -d '{"message": "Good news, everyone!"}'

http.listen(app.get("port"), app.get("ipaddr"), function(){
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});