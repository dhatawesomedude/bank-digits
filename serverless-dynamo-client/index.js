const AWS = require('aws-sdk'),
    options = {
        region: "localhost",
        endpoint: "http://localhost:8000",
        apiVersion: '2012-10-08',
    };

const isOffline = function () {
    // Depends on serverless-offline plugion which adds IS_OFFLINE to process.env when running offline
    return process.env.IS_OFFLINE;
};

const customDynamoDB = {
    doc: isOffline() ? new AWS.DynamoDB.DocumentClient(options) : new AWS.DynamoDB.DocumentClient(),
    raw: isOffline() ? new AWS.DynamoDB(options) : new AWS.DynamoDB()
};
module.exports.customDynamoDB = customDynamoDB;
