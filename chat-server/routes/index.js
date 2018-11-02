var express = require('express');
var router = express.Router();
var { processor } = require("../components/nlp/nlp");

router.get('/routeMessage', function(req, res, next) {
    req.app.get("stream").addConnection(req, res);
});

router.post('/sendMessage', function(req, res){
    processor(req.body.message).then(data => {
        let responseBody = {message: data.answer, userId: req.body.userId};
        req.app.get("stream").push_sse(2, "customMessage", responseBody );
        return res.send({ message: req.body });
    });

});

module.exports = router;
