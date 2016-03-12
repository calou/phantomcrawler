var phantom = require('phantom'),
    flatiron = require('flatiron');

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
                console.log("Setting user agent for '"+url+"' to : '" + user_agent + "'");
                page.settings.userAgent = user_agent;
            }
            page.open(url).then(function (status) {
                if(status == "success") {
                    console.log("Page fetched: " + url);
                    page.property('content').then(function (content) {
                        res.end(content);
                    });
                } else {
                    res.statusCode = 404;
                    res.end(status);
                }
                page.close();
                ph.exit();
            });
        });
    });
});

app.start(8000, function () {
    console.log(' > http server started on port 8000');
    console.log(' > visit: http://localhost:8000/ ');
});