import express = require('express');
import DnaManager from "./dnaManager";
import DBManager from "./dbManager";

const app: express.Application = express();
app.use(express.json());

const dnaManager = new DnaManager();
const dbManager = new DBManager();

/**
 * POST
 * http://localhost:9000/mutant 
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
 * http://localhost:9000/stats 
 * 
 */
app.get('/stats', async function (req, res) {
    let data = await dbManager.readData();
    res.status(200).json(dnaManager.getStats(data.Items));
});

app.listen(9000, function () {
    console.log('Listening on port 9000!');
});
