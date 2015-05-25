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
  });
  
module.exports = router;
