const AWS = require('aws-sdk');
const {customDynamoDB} = require("../serverless-dynamo-client");
const csv = require('csvtojson');
const s3 = new AWS.S3({signatureVersion: 'v4'});

const addData = async (params) => {
    try {
        const response = await customDynamoDB.doc.put(params).promise();
        console.log("response : ", response);
        console.log("Added item:", JSON.stringify(params.Item, null, 2));
    }
    catch (error) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
};

const processCSV = () => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_OBJECT_KEY,
    };
    //grab the csv file from s3
    const s3Stream = s3.getObject(params).createReadStream();

    csv({noheader: true,}).fromStream(s3Stream)
        .on('data', async (row) => {
            //read each row
            let jsonContent = JSON.parse(row);
            const [bsb, bankName, bankUnit, streetAddress, city, state, postCode] = Object.values(jsonContent);

            //push each row into DynamoDB
            let paramsToPush = {
                TableName: process.env.DYNAMODB_TABLE,
                Item: {
                    bsb: bsb.replace("-", ""),
                    bankName,
                    bankUnit,
                    streetAddress,
                    city,
                    state,
                    postCode,
                    lastUpdated: new Date().toISOString()
                },
                ReturnConsumedCapacity: 'TOTAL',
            };
            await addData(paramsToPush);
        });
};

module.exports = {processCSV};
