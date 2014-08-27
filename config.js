var pkg = require('./package.json');

var config = {};



config.crawler = {};
config.crawler.userAgent = pkg.name + "-bot v" + pkg.version + " (shanewwarren@gmail.com)";
config.crawler.interval = 1000;

config.rabbit = {};
config.rabbit.publishMethod = "PUSH";
config.rabbit.subscribeMethod = "WORKER";
config.rabbit.worker = {};
config.rabbit.worker.prefetch = 1;
