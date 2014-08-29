var async = require('async'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var UrlQueueItem = function(messageType, payload) {
  this.messageType = messageType;
  this.payload = payload;
  this.timestamp = new Date();
};

var UrlQueue = (function(){

  var queueName = "url_queue";

  var queue = function() {

  };

  util.inherits(queue, EventEmitter);

  queue.prototype.initialize = function(storeName, context, type){
      if(type === "WORKER")
        socket = context.socket(type, {prefetch: 1});
      else
        socket = context.socket(type);

    queueName = storeName + "_" + queueName;

      var self = this;
      socket.connect(queueName, function(){
        self.emit('ready');
      });

  };

  queue.prototype.close = function(callback){
    if(socket){
      socket.on('close', callback);
      socket.close();
      return;
    }else{
      callback();
    }
  };

  queue.prototype.readItem = function(str){
    var message = socket.read();
    return JSON.parse(message);
  };

  queue.prototype.acknowledgeItem = function(){
    socket.ack();
  };

  queue.prototype.writeStart = function(){
    var item = new UrlQueueItem('START', null);
    socket.write(JSON.stringify(item), 'utf8');
  };

  queue.prototype.writeStop = function(){
    var item = new UrlQueueItem('STOP', null);
    socket.write(JSON.stringify(item), 'utf8');
  };

  queue.prototype.writeUrl = function(url){
    var item = new UrlQueueItem('MESSAGE', url);
    socket.write(JSON.stringify(item), 'utf8');
  };

  return queue;

})();


module.exports = UrlQueue;
