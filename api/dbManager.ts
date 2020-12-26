require('dotenv').config();
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
;

let awsConfig;
const isTest = process.env.JEST_WORKER_ID;
if (isTest) {
    awsConfig = {
        convertEmptyValues: true,
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env',
    };
} else {
    awsConfig = {
        "region": "us-east-2",
        "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
        "accessKeyId": process.env.accessKeyId, "secretAccessKey": process.env.secretAccessKey
    };
}

AWS.config.update(awsConfig)
let docClient = new AWS.DynamoDB.DocumentClient();

export default class DBManager {
    tableName: string;

    constructor() {
        this.tableName = "dna";
    }

    saveData = async (dna: string[], isMutant: boolean) => {
        let id = uuidv4();
        var input = {
            "id": id,
            "dna": dna.toString(),
            "created_on": new Date().toString(), "isMutant": isMutant
        };
        var params = {
            TableName: this.tableName,
            Item: input
        };
        return await docClient.put(params, function(err:any, data:any) {});
    }

    readData = async () => {
        var params = {
            TableName: this.tableName
        };
        return await docClient.scan(params).promise();
    }

}