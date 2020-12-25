import express = require('express');
import DnaManager from "./dnaManager";
import DBManager from "./dbManager";

const app: express.Application = express();
app.use(express.json());

const dnaManager = new DnaManager();
const dbManager = new DBManager();

/**
 * POST
 * http://localhost:1233/mutant 
 * 
 * {
 *  "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 * }
 * 
 */
app.post('/mutant/', function (req: any, res: any) {
    let dna = req.body.dna, isMutant, status;
    if (dna.length > 3) {
        isMutant = dnaManager.isMutant(dna);
        status = dbManager.saveData(dna, isMutant);
    } else {
        isMutant = false;
    }
    if (isMutant && status != null) {
        res.status(200).send();
    } else {
        res.status(403).send();
    }

});
/**
 * GET
 * http://localhost:1233/stats 
 * 
 */
app.get('/stats', async function (req, res) {
    dbManager.readData().then((data: { Item: []; }) => {
        res.status(200).json(dnaManager.getStats(data.Item));
    })
});

app.listen(1234, function () {
    console.log('Listening on port 1233!');
});
