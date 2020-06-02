# Bank Digits API project
- [x] AU BSB validation
- [ ] AWS Developer portal to manage subscriptions
- [ ] NZ NCC validation
- [ ] US routing number validation
- [ ] Indian IFSC validation
- [ ] Nigerian NUBAN validation
- [ ] swift code validation
- [ ] IBAN validation

## Description

This project is includes the code for [bank digits](https://api.bankdigits.io), an API to verify bank details. 

See the [API Docs](https://stoplight.io/p/docs/gh/dhatawesomedude/bank-digits-docs/reference/Bank-Digits.v1.yaml/paths/~1australia-bsb/get?srn=gh/dhatawesomedude/bank-digits-docs/reference/Bank-Digits.v1.yaml/paths/~1australia-bsb/get&group=master) for more details

## Requirements
Some of these dependencies are optional for local tests. You could run this project locally using `serverless offline` and ignore those marked required for deployment.

- Node.js v12
- DynamoDB
- AWS account (required for deployment)
- serverless (required for deployment)
- Environment variables: I've set this project up using `direnv`. see `.envrc.sample` for required environment variables. 
- Custom domain data. There's some custom domain data in the serverless template that will need to be commented out or updated.
- Usage plans and API keys. Usage plans and API keys are set up using environment variables. See `serverless.yml` and `.envrc.sample`


### Endpoint requirement
- AU BSB validation:
    - The `S3_FILE_PATH` and `S3_OBJECT_KEY` environment variable are required to run the migration script.

## Structure
- AU BSB validation:
    - one lambda to validate API
    - one scheduled lambda to use the save the latest csv file from the Aus payment network website to an S3 bucket (IN PROGRESS)
    - One lambda to update the DB when the S3 bucket with the data is updated (IN PROGRESS)
    
- Architecture diagram:
(IN PROGRESS)
    
## Deploy
- `npm run deploy`

### Bootstrap data:
- `npm run updateDB` - requires data from Australian payments network saved as CSV in S3, and file path set to `S3_FILE_PATH`.