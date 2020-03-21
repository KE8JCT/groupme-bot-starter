'use strict';

require('dotenv').config();

const https = require('https');

class Bot {
    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */
    static checkMessage(message) {
        const messageText = message.text;
        const messageId = message.user_id
        const messageName = message.name
        
        if (messageName = "Nolan Pearce") {
            return messageId;
            
        }
        // Learn about regular expressions in JavaScript: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
        const botRegex = /\/shrug/;
		//seems like /\ interprets literally...
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && botRegex.test(messageText)) {
            // Check is successful, return a message!
            return '¯\\_(ツ)_/¯';
        }
		const beatNavy = /navy/;
		//seems like /\ interprets literally...
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && beatNavy.test(messageText)) {
            // Check is successful, return a message!
            return 'Beat Navy!';
        }
        
        const TL = /(((((^W)|(^(Do)))|(^(Is)))|(^(Are)))|((((^w)|(^(do)))|(^(is)))|(^(are)))).*(?=(\?)$)/;
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && TL.test(messageText)) {
            // Check is successful, return a message!
            return 'Ask your team leader';
        }

        const askThomas = /((\@thomas)|(\@Thomas))/;
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && askThomas.test(messageText)) {
            // Check is successful, return a message!
            return "I don't know"; //fix this
        }

        return null;
    };

    /**
     * Sends a message to GroupMe with a POST request.
     *
     * @static
     * @param {string} messageText A message to send to chat
     * @return {undefined}
     */
    static sendMessage(messageText) {
        // Get the GroupMe bot id saved in `.env`
        const botId = process.env.BOT_ID;

        const options = {
            hostname: 'api.groupme.com',
            path: '/v3/bots/post',
            method: 'POST'
        };

        const body = {
            bot_id: botId,
            text: messageText
        };

        // Make the POST request to GroupMe with the http module
        const botRequest = https.request(options, function(response) {
            if (response.statusCode !== 202) {
                console.log('Rejecting bad status code ' + response.statusCode);
            }
        });

        // On error
        botRequest.on('error', function(error) {
            console.log('Error posting message ' + JSON.stringify(error));
        });

        // On timeout
        botRequest.on('timeout', function(error) {
            console.log('Timeout posting message ' + JSON.stringify(error));
        });

        // Finally, send the body to GroupMe as a string
        botRequest.end(JSON.stringify(body));
    };
};

module.exports = Bot;
