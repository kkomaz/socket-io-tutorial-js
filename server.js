var express = require('express');
    app = express();
    http = require("http").createServer(app);
    bodyParser = require('body-parser');

app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);

app.use(bodyParser.json());

app.get("/", function(request, response){
  response.send("Server is up and running");
});

http.listen(app.get("port"), app.get("ipaddr"), function(){
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});