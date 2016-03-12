var phantom = require('phantom'),
    flatiron = require('flatiron'),
    logger = require('./log');

var app = module.exports = flatiron.app;
var phantomJsOptions = ['--ignore-ssl-errors=yes'];

app.use(flatiron.plugins.http, {
    headers: {
        'x-powered-by': 'flatiron ' + flatiron.version
    }
});

app.router.get('/crawl', function () {
    var res = this.res,
        req = this.req;
    var url = req.query['url'];
    var user_agent = req.query['user_agent'];
    phantom.create(phantomJsOptions).then(function (ph) {
        ph.createPage().then(function (page) {
            if(user_agent) {
                logger.info("Setting user agent for '"+url+"' to : '" + user_agent + "'");
                page.settings.userAgent = user_agent;
            }
            page.open(url).then(function (status) {
                if(status == "success") {
                    logger.info("Page fetched: " + url);
                    page.property('content').then(function (content) {
                        res.end(content);
                    });
                } else {
                    logger.info("Can not fetch page '" + url +"' : " +status);
                    res.statusCode = 404;
                    res.end("");
                }
                page.close();
                ph.exit();
            });
        });
    });
});

var port = 8000
app.start(port, function () {
    logger.info('Server started on port ' + port);
});