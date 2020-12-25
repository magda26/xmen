import DBManager from "./dbManager";
import AWS from 'aws-sdk';

var dbManager = new DBManager();

describe('check saving and reading data', () => {
    beforeEach(async () => {
        clearItem('local-env');
    });

    test(' single dna is invalid ', () => {
        dbManager.saveData(["GGGG"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(0);
                }
            });
        });
    });

    test(' Is no mutant ', () => {
        dbManager.saveData(["GGTG", "AGCT", "AGGT", "GCTA"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                let expectedItem = { id: '1', isMutant: false }
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(1);
                    expect(data.Item[0].isMutant).toEqual(expectedItem.isMutant);
                }
            });
        });
    });

    test(' Is no mutant only one row', () => {
        dbManager.saveData(["GGTG", "AGCT", "AGGT", "GCTA"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                let expectedItem = { id: '1', isMutant: false }
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(1);
                    expect(data.Item[0].isMutant).toEqual(expectedItem.isMutant);
                }
            });
        });
    });

    test(' is mutant by row', () => {
        dbManager.saveData(["GGGG", "AGCT", "AAAA", "GCTA"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                let expectedItem = { id: '1', isMutant: true }
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(1);
                    expect(data.Item[0].isMutant).toEqual(expectedItem.isMutant);
                }
            });
        });
    });

    test(' col dis mutant by col', () => {
        dbManager.saveData(["AGCT", "AGCT", "AGGT", "ACTT"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                let expectedItem = { id: '1', dna: "GGGG", isMutant: true }
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(1);
                    expect(data.Item[0].isMutant).toEqual(expectedItem.isMutant);
                }
            });
        });
    });

    test(' is mutant by diag ', () => {
        dbManager.saveData(["GGGG", "GGGG", "GGGG", "GGGG"], false).then(async () => {
            dbManager.readData().then((data: { Item: [{ isMutant: '' }]; }) => {
                let expectedItem = { id: '1', isMutant: true }
                if (data.Item instanceof Array) {
                    expect(data.Item.length).toEqual(1);
                    expect(data.Item[0].isMutant).toEqual(expectedItem.isMutant);
                }
            });
        });
    });
});

const clearItem = async (region: string) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient({ region });
    await DynamoDB.delete({ TableName: dbManager.tableName, Key: { id: '1', }, }).promise();
};