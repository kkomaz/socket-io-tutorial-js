var express = require('express');
    app = express();
    router = express.Router();
    http = require("http").createServer(app);
    bodyParser = require('body-parser');
    _ = require('underscore');

router.route('/')
  .get(function(request, response){
    response.render("index");
  })
  .post(function(request,response){
    var message = request.body.message;
    if(_.isUndefined(message) || _.isEmpty(message.trim())) {
      return response.json(400, {error: "Message is invalid"});
    }
  });

module.exports = router;