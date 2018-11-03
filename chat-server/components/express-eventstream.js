const CustStream = function() {
    var self = this;

    // object literal of connections; IP addresses of each subscriber as the key
    self.connections = {};

    self.enable = function() {
        return function(req, res, next) {
            res.sseSetup = function() {
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                })
            };

            res.sseSend = function(id, event, data) {
                var stream = "id: " + String(id) + "\n" +
                    "event: " + String(event) + "\n" +
                    "data: " + JSON.stringify(data) +
                    "\n\n";
                res.write(stream);
            };

            next();
        }
    };

    self.addConnection = function(request, response) {
        response.sseSetup();
        var ip = String(request.ip);
        self.connections[ip] = response;
    }.bind(self);

    self.push_sse = function(id, event, obj) {
        Object.keys(self.connections).forEach(function(key){
            self.connections[key].sseSend(id, event, obj);
        });
    }.bind(self);

};

module.exports = CustStream;