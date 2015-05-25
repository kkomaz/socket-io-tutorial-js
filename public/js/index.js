function init() {

  var serverBaseUrl = document.domain;
  /* 
   On client init, try to connect to the socket.IO server.
   Note we don't specify a port since we set up our server
   to run on port 8080
  */
  var socket = io.connect('http://127.0.0.1:8080/');

  //We'll save our session ID in a variable for later
  var sessionId = '';

  //Helper function to update participant list
  function updateParticipants(participants) {
   $('#participants').html('');
   for (var i = 0; i < participants.length; i++) {
      $('#participants').append('<span id="' + participants[i].id + '">' +
        participants[i].name + ' ' + (participants[i].id === sessionId ? '(You)' : '') + '<br /></span>');
    } 
  }

  /*
 When the client successfully connects to the server, an
 event "connect" is emitted. Let's get the session ID and
 log it.  Also, let the socket.IO server know there's a new user
 with a session ID and a name. We'll emit the "newUser" event
 for that. 
  */

  socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {id: sessionId, name: $('#name').val()});    
  });

  socket.on('newConnection', function(data){
    updateParticipants(data.participants);
  });

  //dont really understand how disconnect works
  socket.on('userDisconnected', function(data){
    $('#' + data.id).remove();
  });

  socket.on('nameChanged', function(data){
    $('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '(You)' : '') + '<br />');
  });

  socket.on('incomingMessage', function(data){
    var message = data.message;
    var name = data.name;
    $('#messages').prepend('<b>' + name + '</b><br />' + message + '<hr />');
  });

  socket.on('error', function(reason){
    console.log('Unable to connect to server', reason);
  });

  function sendMessage(){
    var outgoingMessage = $('#outgoingMessage').val();
    var name = $('#name').val();
    $.ajax({
      url: '/message',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({message: outgoingMessage, name: name})
    });
    $('#outgoingMessage').val('');
  }

 /*
 If user presses Enter key on textarea, call sendMessage if there
 is something to share
 */

 function outgoingMessageKeyDown(event){
  if (event.which == 13){
    event.preventDefault();
    if ($('#outgoingMessage').val().trim().length <= 0){
      return;
    }
    sendMessage();
    $('#outgoingMessage').val('');
  }
 }

 /*
 Helper function to disable/enable Send button
 */
 function outgoingMessageKeyUp(){
  var outgoingMessageValue = $('#outgoingMessage').val();
  $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
 }

 /*
 When a user updates his/her name, let the server know by
 emitting the "nameChange" event
 */
 function nameFocusOut(){
  var name = $('#name').val();
  socket.emit("nameChange", {id: sessionId, name: name});
 }

 // Elements Setup //
 $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
 $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
 $('#name').on('focusout', nameFocusOut);
 $('#send').on('click', sendMessage);
}

$(document).on('ready', init);