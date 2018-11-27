
//the lambda function that your Alexa skill will connect to.

'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to tvc workflow');
    },
    'ShowWorkflowIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var taskNumber = 0;

        var params = {
            TableName: "Workflow",
            Key: {
                "taskId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber": taskNumber
            }
        };
        docClient.update(params, (() => {
            this.emit(':ask', 'you asked for complete workflow');
        }));
    },
    'ShowTaskIntent': function () {
        // this.emit(':ask', 'you said task number ' );
        var docClient = new AWS.DynamoDB.DocumentClient();
        var taskNumber = this.event.request.intent.slots.number.value;

        var params = {
            TableName: "Workflow",
            Key: {
                "taskId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber": taskNumber
            }
        };
        docClient.update(params, (() => {
            
            this.emit(':ask', 'you said task number ' + taskNumber);
        }));
    },
    'UpdateTaskIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var taskid = this.event.request.intent.slots.id.value;
        var label = this.event.request.intent.slots.label.value;
        var params = {
            TableName: "Task",
               Key: {
                "TaskID": 12
            },
            UpdateExpression: "set label = :newlabel",
             ExpressionAttributeValues: {
                ":newlabel": label
            }
        };

        docClient.update(params, (() => {
            this.emit(':ask', 'you said id as ' + taskid + ' and label as ' + label);
        }));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'you can ask for specific task by saying task number 1');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'bye bye Technia, have a nice day');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'bye bye Technia, have a nice day');
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
