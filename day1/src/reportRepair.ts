import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
const report: number[] = input.split("\n").map(Number);

console.log("Part 1");
for (const { index, value } of report.map((value, index) => ({ index, value }))) {

    const reportEntry: number = 2020 - value;
    if (report.indexOf(reportEntry) != -1) {
        console.log(`Found ${reportEntry} for ${value} at index: ${index}`);
        console.log(`Answer (multiplication): ${value * reportEntry}`);
        break;
    }
}


console.log("Part 2");
for (let i: number = 0; i < report.length; i++) {

    let found: boolean = false;
    const first: number = report[i];
    for (let j = 0; j < report.length; j++) {

        if (j == i) { continue; }

        const second: number = report[j];
        const reportEntry: number = 2020 - (first + second);
        if (report.indexOf(reportEntry) != -1) {
            console.log(`Found ${reportEntry} for ${first} ${second}.`);
            console.log(`Answer (multiplication): ${first * second * reportEntry}`);
            found = true;
            break;
        }
    }

    if (found) { break; }
}
