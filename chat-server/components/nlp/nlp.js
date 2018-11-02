const { NlpManager } = require('node-nlp');
const trainNlp = require("./trainingSet.js");
const manager = new NlpManager({ languages: ['en'] });

trainNlp(manager,console.log);

const processor = function processInput(input){
    return manager.process('en', input);
};

module.exports = { processor };