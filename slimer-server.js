var slimerjs = require('node-slimerjs'),
    flatiron = require('flatiron'),
    slimerPath = require('slimerjs').path;

console.log("slimerPath : " + slimerPath);
var options = {slimerPath: slimerPath};

/*
var app = module.exports = flatiron.app;

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
    slimerjs.create(function (err, ph) {
        ph.createPage(function (err, page) {
            if(user_agent) {
                console.log("Setting user agent for '"+url+"' to : '" + user_agent + "'");
                page.settings.userAgent = user_agent;
            }
            page.open(url, function () {
                console.log("Page fetched: " + url);
                console.log(page.content)
                page.property('content').then(function (content) {
                    res.end(content);
                    page.close();
                    ph.exit();
                });
            });
        });
    }, options);
});

app.start(8000, function () {
    console.log(' > http server started on port 8000');
    console.log(' > visit: http://localhost:8000/ ');
});
*/

slimerjs.create(function(err, ph) {
    return ph.createPage(function(err,page) {
        return page.open("http://tilomitra.com/repository/screenscrape/ajax.html", function(err,status) {
            console.log("opened site? ", status);
            page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
                //jQuery Loaded.
                //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                setTimeout(function() {
                    return page.evaluate(function() {
                        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                        var h2Arr = [],
                            pArr = [];
                        $('h2').each(function() {
                            h2Arr.push($(this).html());
                        });
                        $('p').each(function() {
                            pArr.push($(this).html());
                        });

                        return {
                            h2: h2Arr,
                            p: pArr
                        };
                    }, function(err,result) {
                        console.log(result);
                        ph.exit();
                    });
                }, 5000);
            });
        });
    });

}, options);