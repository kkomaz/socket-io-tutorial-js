var express = require('express');
    app = express();
    http = require("http").createServer(app);
    bodyParser = require('body-parser');

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

http.listen(app.get("port"), app.get("ipaddr"), function(){
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});