'use strict';
const {findBsb} = require("./lib/findBsb");

// http status codes use the JSend specification https://github.com/dhatawesomedude/jsend
module.exports.verifyAustralianBSB = async event => {

    console.log("received query: ", event);

    // validate
    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Allow-Credentials": true,
            },
            body: JSON.stringify(
                {
                    status: "fail",
                    data: {
                        "bsb": "BSB is a required parameter"
                    },
                },
                null,
                2
            )
        }
    }

    const {bsb} = event.queryStringParameters;

    // find BsB
    try {
        const bsbDetails = await findBsb(bsb);
        console.log("bsbDetails", bsbDetails);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Allow-Credentials": true,
            },
            body: JSON.stringify(
                {
                    status: 'success',
                    data: {
                        bank: bsbDetails
                    },
                },
                null,
                2
            ),
        };
    }
    catch (e) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Allow-Credentials": true,
            },
            body: JSON.stringify({
                status: "error",
                message: `Not Found! BSB (${bsb}) is not a valid BSB number`
            })
        }
    }
};
