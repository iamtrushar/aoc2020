import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let data: string[] = input.split("\n");;


console.log("Part 1");

let highest = 0;
let seatIds: number[] = new Array();


for (let index = 0; index < data.length; index++) {

    const passport = data[index];
    const row = processPosition(passport, 127, 0, 128, 7);
    const column = processPosition(passport.substr(7), 7, 0, 8, 3);
    const seatId = (row * 8) + column;

    if (seatId >= 100) {
        seatIds.push(seatId);
    }
    if (highest < seatId) {
        highest = seatId;
    }
}

var sorted = seatIds.sort();

for (let i = 0; i < sorted.length; i++) {

    const current: number = sorted[i];
    const next: number = sorted[i + 1];
    if (current + 1 != next && i + 1 < sorted.length) {
        console.log(`My seat: ${next - 1}`);
    }
}

console.log(`Highest ${highest}`);

function processPosition(passport: string, upper: number, lower: number, row: number, loopCount: number) {

    let position = 0;

    for (let i = 0; i < loopCount; i++) {

        row = row / 2;
        const p: string = passport[i];

        if (p == "F") {
            upper -= row;
            position = lower;
        }
        else if (p == "L") {
            upper -= row;
            position = lower;
        }
        else if (p == "B") {
            lower += row;
            position = upper;
        }
        else if (p == "R") {
            lower += row;
            position = upper;
        }
        else {
            console.error("Failed - Parsing error, cannot find F or B.");
        }
        //console.log(`Lower ${lower}. Upper ${upper}.`);
    }

    return position;
}