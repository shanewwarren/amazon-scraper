var should = require('should'),
    cheerio = require('cheerio'),
    utils = require('../../utility'),
    stores = require('../../../lib/threads/stores')

describe('JCrew', function(){
  describe('#parseName($)', function(){
    it('should parse and return product name from html', function(){
      var expected = "Alden® for J.Crew longwing bluchers in navy Horween Chromexcel leather";

      utils.loadFixture("jcrew-product-page.html", function(err, result){
        should.ifError(err);

        $ = cheerio.load(result);

        var jcrew = new stores.JCrew();
        var name = jcrew.parseName($);
        console.log("Value: " + name);
        if(!name)
          should.fail(name, expected, "Failed to parse product name");

        name.should.equal(expected);
      });
    })
  })
})
