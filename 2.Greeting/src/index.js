let Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
  let alexa = Alexa.handler(event, context);

  alexa.registerHandlers(handlers);
  alexa.execute();
};

let handlers = {
  'LaunchRequest': function() {
    this.emit('UserNameIntent');
    this.emit('HelloIntent');
    this.emit('GoodbyeIntent');

    this.emit('AMAZON.HelpIntent');
    this.emit('AMAZON.StopIntent');
    this.emit('AMAZON.CancelIntent');
  },


  // My name is {firstname}
  'UserNameIntent': function() {
    let myName = this.event.request.intent.slots.firstname.value;
    this.attributes['name'] = myName;
    this.emit(':tell', `Nice to meet you, ${myName}.`);
  },

  // Hello
  'HelloIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `Hello , ${myName}, hope you have a great day.`);
  },

  // Goodbye
  'GoodbyeIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `Tatty bye , ${myName}.`);
  },

  // Help / Help me
  'AMAZON.HelpIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':ask', `${myName}, shall I explain how this works again?`);
  },

  // Stop / Stop now
  'AMAZON.StopIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `Let me know if you need me later, ${myName}`, 'try again');
  },

  // Cancel / Cancel it
  'AMAZON.CancelIntent': function() {
    let myName = '';
    if (this.attributes['name']) {
      myName = this.attributes['name'];
    }
    this.emit(':tell', `${myName}, your cancellation is confirm.`);
  }
};
