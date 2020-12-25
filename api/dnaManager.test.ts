import DnaManager from "./dnaManager";

var dnaManager = new DnaManager();

describe('check isMutant cases', () => {
    test(' one element array', () => {
        let isMutant = dnaManager.isMutant(["AAAA"]);
        expect(isMutant).toBe(false);
    });

    test(' check only one row array ', () => {
        let isMutant = dnaManager.isMutant(["AGCT", "AAAA", "ACGG", "TTGG"]);
        expect(isMutant).toBe(false);
    });

    test(' check more than one row array ', () => {
        let isMutant = dnaManager.isMutant(["GGGG", "ATTG", "ACGG", "GGGG"]);
        expect(isMutant).toBe(true);
    });

    test(' check only one col array ', () => {
        let isMutant = dnaManager.isMutant(["AGCT", "ATTT", "ACGG", "AGGG"]);
        expect(isMutant).toBe(false);
    });

    test(' check more than one col array ', () => {
        let isMutant = dnaManager.isMutant(["AGCG", "ATTG", "ACGG", "AGGG"]);
        expect(isMutant).toBe(true);
    });

    test(' check only one diag array ', () => {
        let isMutant = dnaManager.isMutant(["AGCT", "TATG", "GTAG", "GTGA"]);
        expect(isMutant).toBe(false);
    });

    test(' check more than one diag array ', () => {
        let isMutant = dnaManager.isMutant(["AGCT", "TATT", "GTAG", "TGGA"]);
        expect(isMutant).toBe(true);
    });

});

describe('check getStats cases', () => {

    test(' equal quantity ', () => {
        var items = [];
        items.push({ "isMutant": false })
        items.push({ "isMutant": true })
        var results = dnaManager.getStats(items);
        expect(results.count_human_dna).toBe(1);
        expect(results.count_mutant_dna).toBe(1);
        expect(results.ratio).toBe(1);
    });

    test(' more mutants ', () => {
        var items = [];
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        items.push({ "isMutant": true })
        items.push({ "isMutant": true })
        items.push({ "isMutant": true })
        var results = dnaManager.getStats(items);
        expect(results.count_human_dna).toBe(2);
        expect(results.count_mutant_dna).toBe(3);
        expect(results.ratio).toBe(1.5);
    });

    test(' more humans ', () => {
        var items = [];
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        items.push({ "isMutant": true })
        items.push({ "isMutant": true })
        var results = dnaManager.getStats(items);
        expect(results.count_human_dna).toBe(4);
        expect(results.count_mutant_dna).toBe(2);
        expect(results.ratio).toBe(0.5);
    });

    test(' No humans ', () => {
        var items = [];
        items.push({ "isMutant": true })
        items.push({ "isMutant": true })
        items.push({ "isMutant": true })
        var results = dnaManager.getStats(items);
        expect(results.count_human_dna).toBe(0);
        expect(results.count_mutant_dna).toBe(3);
        expect(results.ratio).toBe(3);
    });

    test(' No mutants ', () => {
        var items = [];
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        items.push({ "isMutant": false })
        var results = dnaManager.getStats(items);
        expect(results.count_human_dna).toBe(3);
        expect(results.count_mutant_dna).toBe(0);
        expect(results.ratio).toBe(0);
    });

});