import * as fs from 'fs';
import * as sw from 'perf_hooks';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");

Part1(lines);
const t0 = sw.performance.now();
Part2(lines);
const t1 = sw.performance.now();
console.log("Part2 took " + (t1 - t0) + " milliseconds.");


function Part1(lines: string[]) {

    let jolts: number[] = new Array();
    for (let i = 0; i < lines.length; i++) {
        jolts.push(+lines[i]);
    }
    const sortedJolts = jolts.sort((a, b) => a - b);


    let joltsDiff1: number[] = new Array();
    let joltsDiff2: number[] = new Array();
    let joltsDiff3: number[] = new Array();
    for (let i = 0; i < sortedJolts.length; i++) {

        let diff = 0;
        if (i == 0) {
            diff = sortedJolts[i];
        }
        else {
            diff = sortedJolts[i] - sortedJolts[i - 1];
        }


        if (diff == 3) {
            joltsDiff3.push(sortedJolts[i]);
        }
        else if (diff == 2) {
            joltsDiff2.push(sortedJolts[i]);
        }
        else if (diff == 1) {
            joltsDiff1.push(sortedJolts[i]);
        }

    }

    const j1 = joltsDiff1.length;
    const j2 = joltsDiff2.length;
    const j3 = joltsDiff3.length + 1

    console.log(`Multiplier: ${j1 * j3}`);
}


function Part2(lines: string[]) {

    let jolts: number[] = new Array();
    for (let i = 0; i < lines.length; i++) {
        jolts.push(+lines[i]);
    }
    let sortedJolts = jolts.sort((a, b) => a - b);
    const lastRating = sortedJolts[sortedJolts.length - 1] + 3;

    sortedJolts.push(lastRating);


    let combinations: number = 1;
    let d : number[] = new Array();
    for (let i = 0; i < sortedJolts.length; i++) {

        let diff = 0;
        if (i == 0) {
            diff = sortedJolts[i];
        }
        else {
            diff = sortedJolts[i] - sortedJolts[i - 1];
        }

        if (diff == 1 && (i + 1) < sortedJolts.length) {
            if ((sortedJolts[i + 1] - sortedJolts[i]) == 1) {
                d.push(sortedJolts[i])
            }
            else{
                const l = d.length;
                if(l == 3){
                    combinations = combinations * 7;
                }
                else if( l == 2){
                    combinations = combinations * 4;
                }
                else if (l == 1){
                    combinations = combinations * 2;
                }
                d = [];
            }
        }
    }

    console.log(`Combinations: ${combinations}`);
}
