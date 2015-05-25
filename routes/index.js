var express = require('express');
    app = express();
    router = express.Router();
    http = require("http").createServer(app);
    bodyParser = require('body-parser');
    _ = require('underscore');
    io = require('socket.io').listen(http);

router.route('/')
  .get(function(request, response){
    response.render("index");
  // })

  // .post(function(request, response) {
  // //The request body expects a param named "message"
  // var message = request.body.message;
  // var name = request.body.name;

  // if(_.isUndefined(message) || _.isEmpty(message.trim())) {
  //   return response.json(400, {error: "Message is invalid"});
  // }
  // //include sender name + message
  // io.sockets.emit("incomingMessage", {message: message, name: name});
  // response.json(200, {message: "Message received"});
});
  
module.exports = router;
