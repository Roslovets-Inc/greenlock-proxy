var pkg = require('./package.json');
var Greenlock = require('greenlock');


class GreenlockProxy {

    maintainerEmail
    targets = []
    proxy
    greenlock

    constructor(opts) {
        this.maintainerEmail = opts.maintainerEmail;
        staging = opts.staging | false;
        var pkg = require('./package.json');
        var Greenlock = require('greenlock');
        this.greenlock = Greenlock.create({
            packageRoot: __dirname,
            configDir: "./greenlock.d/",
            packageAgent: pkg.name + '/' + pkg.version,
            maintainerEmail: this.maintainerEmail,
            staging: staging
        });

        this.greenlock.manager
            .defaults({
                agreeToTerms: true,
                subscriberEmail: this.maintainerEmail
            })
    }

    register(domains, target) {
        this.targets.push({
            domains: domains,
            target: target
        })
        this.greenlock.add({
            subject: domains[0],
            altnames: domains
        })
    }

    start() {
        require('greenlock-express')
            .init({
                packageRoot: __dirname,
                // contact for security and critical bug notices
                maintainerEmail: this.maintainerEmail,
                // where to look for configuration
                configDir: './greenlock.d',
                // whether or not to run at cloudscale
                cluster: false
            })
            // Serves on 80 and 443
            // Get's SSL certificates magically!
            .ready(this.httpsWorker.bind(this));
    }

    httpsWorker(glx) {
        this.proxy = require("http-proxy").createProxyServer({ xfwd: true });
        // catches error events during proxying
        this.proxy.on("error", function (err, req, res) {
            console.error(err);
            res.statusCode = 500;
            res.end();
            return;
        })
        // servers a node app that proxies requests to a localhost
        glx.serveApp(this.serveFcn.bind(this))
    }

    serveFcn(req, res) {
        this.targets.forEach(target => {
            this.bindTarget(req, res, this.proxy, target.domains, target.target);
        })
    }


    bindTarget(req, res, proxy, domains, target) {
        if (domains.includes(req.headers.host)) {
            proxy.web(req, res, {
                target: target
            })
        }
    }
}

module.exports = GreenlockProxy;
