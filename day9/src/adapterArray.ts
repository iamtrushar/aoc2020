import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");

Part1(lines);
Part2(lines);

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
    console.log(`Last rating: ${lastRating}`);


    let arrangementsSortedJolts: string[] = new Array();


    let b = 0;
    do {

        let joltsDiff: number[] = new Array();
        let a = 0;

        const cloneSortedJolts = Array.from(sortedJolts);
        do {

            for (let i = 0; i < sortedJolts.length; i++) {

                let diff = 0;
                if (i == 0) {
                    diff = sortedJolts[i];
                }
                else {
                    diff = sortedJolts[i] - sortedJolts[i - 1];
                }

                if (diff == 3 || diff == 2 || diff == 1) {
                    joltsDiff.push(sortedJolts[i]);
                }
                else {
                    break;
                }
            }

            if (joltsDiff[joltsDiff.length - 1] == lastRating) {
                const j = joltsDiff.join(",");
                if (arrangementsSortedJolts.includes(j) == false) {
                    arrangementsSortedJolts.push(j);
                    //console.log(j);
                }
            }

            sortedJolts = Array.from(cloneSortedJolts);
            joltsDiff = [];
            sortedJolts.splice(a++, 1);
        } while (a <= sortedJolts.length - 1);

        if (++b < arrangementsSortedJolts.length) {
            sortedJolts = [];
            arrangementsSortedJolts[b].split(",").forEach(ele => sortedJolts.push(+ele));
        }
    } while (b < arrangementsSortedJolts.length);

    console.log(`Total arrangements: ${arrangementsSortedJolts.length}`);
    // arrangementsSortedJolts.forEach(arrayElement => {
    //     console.log(arrayElement);
    // });

}
