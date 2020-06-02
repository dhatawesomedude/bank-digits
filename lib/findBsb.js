const {customDynamoDB} = require("../serverless-dynamo-client");

const findBsb = async (bsb) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: '#bsb = :bsb', // a string representing a constraint on the attribute
        ExpressionAttributeNames: {
            '#bsb': 'bsb',
        },
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':bsb': bsb
        }
    };

    const result = await customDynamoDB.doc.query(params).promise();
    if (!result.Items || !result.Items.length) {
        throw new Error("bsb not found");
    }
    return result.Items[0];
};

module.exports = {findBsb};