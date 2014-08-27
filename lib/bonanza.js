var PhantomWrapper = require('./threads/phantom').PhantomWrapper;

var phantom = null;

// first start off the phantom...
phantom = new PhantomWrapper();
phantom.startPhantom(function(){
});


if(phantom){
  phantom.stopPhantom();
  phantom = null;
}

phantom.getHtml(queueItem.url, function(err, html){
  var newProducts = currentStore.parseProducts(cheerio.load(html));
  if(newProducts == []) {
    console.log("No products found on " + queueItem.url);
    return;
  }

  for(var index = 0; index < newProducts.length; index++)
    console.log(newProducts[index]);
  products.push.apply(products, newProducts);
});
