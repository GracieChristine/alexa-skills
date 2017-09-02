let Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
  let alexa = Alexa.handler(event, context);

  // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

  alexa.registerHandlers(handlers);
  alexa.execute();
};

let handlers = {
  'LaunchRequest': function() {
    this.emit('MyIntent');
    this.emit('WhatsUpIntent');
    this.emit('AMAZON.HelpIntent');
    this.emit('AMAZON.StopIntent');
    this.emit('AMAZON.CancelIntent');

    this.emit('MyNameIsIntent');

    this.emit('DestinationIntent');
  },

  // Tell hello world
  'MyIntent': function() {
    this.emit(':tell', 'Hello World from Alexa!');
  },

  // Ask what's up
  'WhatsUpIntent': function() {
    this.emit(':ask', 'What\'s up from Alexa!');
  },

  // Help / Help me
  'AMAZON.HelpIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':ask', `${myName}, what can Alexa help you with?`);
  },

  // Stop / Stop now
  'AMAZON.StopIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `Goodbye, ${myName}`, 'try again');
  },

  // Cancel / Cancel it
  'AMAZON.CancelIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `Confirm cancelation, ${myName}`);
  },

  // My name is {firstname}
  'MyNameIsIntent': function() {
    let myName = this.event.request.intent.slots.firstname.value;
    this.attributes['name'] = myName;
    this.emit(':tell', `Nice to meet you, ${myName}.`);
  },

  
};
