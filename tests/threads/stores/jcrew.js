var should = require('should'),
    cheerio = require('cheerio'),
    utils = require('../../utility'),
    stores = require('../../../lib/threads/stores');

describe('JCrew', function(){

  var jcrew = new stores.JCrew();

  var longwingBluchersFixture = "jcrew-product-page.html";
  var longwingBluchersExpectedName = "Alden® for J.Crew longwing bluchers in navy Horween Chromexcel leather";
  var longwingBluchersExpectedDescription = "Founded in Massachusetts by Charles H. Alden in 1884, the Alden Shoe Company is in its fourth generation and is the oldest shoemaker in New England. These limited-edition bluchers, an exclusive collaboration designed with J.Crew, are made with navy Chromexcel leather from Chicago's renowned Horween Leathers. Finished with a crepe sole and shaped on Alden's famous Barrie last, they're as comfortable as they are handsome. <ul><li>These shoes were shaped over a Barrie last and run one half size larger than regular US sizes.</li><li>Horween navy Chromexcel upper.</li><li>Tan leather lining.</li><li>Plantation crepe sole.</li><li>USA.</li><li>Select stores.</li></ul>";
  var longwingBluchersExpectedPrice = "$530.00";

  describe('#parseName($)', function(){
    it('should parse and return product name from html', function(){
      utils.loadFixture("jcrew-product-page.html", function(err, result){
        should.ifError(err);

        var name = jcrew.parseName(cheerio.load(result), 0);
        if(!name)
          should.fail(name, longwingBluchersExpectedName, "Failed to parse product name");

        name.should.equal(longwingBluchersExpectedName);
      });
    });
  });

  describe('#parseDescription($)', function(){
    it('should parse and return product description from html', function(){
      utils.loadFixture("jcrew-product-page.html", function(err, result){
        should.ifError(err);

        var name = jcrew.parseDescription(cheerio.load(result), 0);
        if(!name)
          should.fail(name, longwingBluchersExpectedDescription, "Failed to parse product description");

        name.should.equal(longwingBluchersExpectedDescription);
      });
    });
  });

  describe('#parsePrice($)', function(){
    it('should parse and return product price from html', function(){
      utils.loadFixture("jcrew-product-page.html", function(err, result){
        should.ifError(err);

        var name = jcrew.parsePrice(cheerio.load(result), 0);
        if(!name)
          should.fail(name, longwingBluchersExpectedPrice, "Failed to parse product price");

        name.should.equal(longwingBluchersExpectedPrice);
      });
    });
  });


  describe('#parseProducts($)', function(){
    it('should parse and return six products', function(){
      utils.loadFixture("jcrew-multiple-item.html", function(err, result){
        should.ifError(err);

        var products = jcrew.parseProducts(cheerio.load(result));
        if(!products)
          should.fail(products.length, 6, "Should have parsed six products");

        products.length.should.equal(6);
        products[5].name.should.equal('Classic leather belt with removable silver-plated buckle');
        products[5].price.should.equal('$59.50');
      });
    });
  });

  describe('#parseProducts($)', function(){
    it('should parse and return one product', function(){
      utils.loadFixture("jcrew-quilted-jacket.html", function(err, result){
        should.ifError(err);

        var products = jcrew.parseProducts(cheerio.load(result));
        if(!products)
          should.fail(products.length, 1, "Should have parsed one product");


        products.length.should.equal(1);
        products[0].name.should.equal('Broadmoor quilted jacket in Japanese chambray');
        products[0].price.should.equal('$238.00');
        console.log(products);
      });
    });
  });
})
