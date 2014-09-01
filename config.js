var pkg = require('./package.json');

var config = {};
config.version = pkg.version;


config.crawler = {};
config.crawler.userAgent = pkg.name + "-bot v" + pkg.version + " (shanewwarren@gmail.com)";
config.crawler.interval = 1000;

config.rabbit = {};
config.rabbit.url = 'amqp://localhost';


module.exports = config;
