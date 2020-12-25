export default class DnaManager {
    repNitBases: number;

    constructor() {
        this.repNitBases = 4;
    }

    isMutant = (dna: string[]) => {
        return this.countRow(dna) + this.countCol(dna) + this.countDiag(dna) > 1;
    }

    getStats = (dnaRecords: any[]) => {
        let count_mutant_dna = 0;
        let count_human_dna = 0;
        dnaRecords.forEach((record) => {
            if (record.isMutant) {
                count_mutant_dna++;
            } else {
                count_human_dna++;
            }
        })
        return {
            count_mutant_dna: count_mutant_dna,
            count_human_dna: count_human_dna,
            ratio: count_human_dna != 0 ? count_mutant_dna / count_human_dna : count_mutant_dna
        }
    }

    countDiag = (dna: string[]): number => {
        let times = 0;
        for (let i = 0; i < dna.length; i++) {
            for (let j1 = 0, j2 = dna.length - 1; j1 < dna.length && j2 >= 0; j1++, j2--) {
                let values1 = { letter: dna[i].charAt(j1), quantity: 1, df: true };
                let values2 = { letter: dna[i].charAt(j2), quantity: 1, df: true };
                for (let diagI = i + 1, diagJ1 = j1 + 1, diagJ2 = j2 - 1; diagI < dna.length && diagJ1 < dna.length && diagJ2 >= 0; diagI++, diagJ1++, diagJ2--) {
                    times = times + this.checkInfo(values1, dna[diagI].charAt(diagJ1)) + this.checkInfo(values2, dna[diagI].charAt(diagJ2));
                    if (times > 1) {
                        return times;
                    }
                }
            }
        }
        return times;
    }

    countRow = (dna: string[]): number => {
        let times = 0;
        for (let i = 0; i < dna.length; i++) {
            let values = { letter: dna[i].charAt(0), quantity: 1, df: true };
            for (let j = 1; j < dna[i].length; j++) {
                times = times + this.checkInfo(values, dna[i].charAt(j));
                if (times > 1) {
                    return times;
                }
            }
        }
        return times;
    }

    countCol = (dna: string[]): number => {
        let times = 0
        for (let j = 0; j < dna.length; j++) {
            let values = { letter: dna[0].charAt(j), quantity: 1, df: true };
            for (let i = 1; i < dna.length; i++) {
                times = times + this.checkInfo(values, dna[i].charAt(j));
                if (times > 1) {
                    return times;
                }
            }
        }
        return times;
    }

    checkInfo = (values: { letter: string; quantity: number; df: boolean }, newLetter: string) => {
        let add = 0;
        if (values.letter === newLetter) {
            values.quantity++;
        } else {
            values.quantity = 1;
            values.df = true;
        }
        if (values.quantity >= this.repNitBases && values.df) {
            add++;
            values.df = false;
        }
        values.letter = newLetter;
        return add;
    }
}