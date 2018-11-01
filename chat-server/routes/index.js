var express = require('express');
var router = express.Router();

router.get('/routeMessage', function(req, res, next) {
    console.log(req.param)
    req.app.get("stream").addConnection(req, res);
});

router.post('/sendMessage', function(req, res){
    req.app.get("stream").push_sse(2, "customMessage", req.body);
    return res.send({ message: req.body });
});

module.exports = router;
