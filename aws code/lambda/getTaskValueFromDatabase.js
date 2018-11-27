//the lambda function that gets the value from the DynamoDB and returns it to the API
'use strict';
var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "Workflow",
    Key: {
        "taskId": 0
    }
};
var workflowTaskToDisplay = "task not set";

exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("that didn't work");
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        workflowTaskToDisplay = obj.Item.pictureToShow;
    
        callback(null, {"Workflow":workflowTaskToDisplay});
    });
};
