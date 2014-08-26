var p = require('./lib/threads/phantom'),
    j = require('./lib/threads/stores/jcrew');


var ph = new p.PhantomWrapper();
var jc = new j.JCrew();
ph.startPhantom(function(){
  ph.getHtml("https://www.jcrew.com/mens_category/shoes/PRD~A1214/A1214.jsp", function(err, html){
      jc.parse(html);
      console.log(jc);
      ph.stopPhantom(function(){
        console.log("phantom finished...");
      })
  })
});
