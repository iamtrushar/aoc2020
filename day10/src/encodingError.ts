import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");

const resut = Part1(lines, 25);
console.log(`Found error ${resut}`);

const sum = Part2(lines, resut);
console.log(`Total ${sum}`);

function Part1(lines: string[], preamblesLength: number) {

    let encodings: number[] = new Array();
    for (let i = 0; i < lines.length; i++) {
        encodings.push(+lines[i]);
    }

    for (let i = 0; i < encodings.length; i++) {

        let preambles: number[] = new Array();
        for (let k = i; k < i + preamblesLength; k++) {
            preambles.push(encodings[k]);
        }

        let startAt = i + preambles.length;

        const value = encodings[startAt];
        let found = false;
        for (let j = 0; j < preambles.length; j++) {

            if (i != j) {
                const valueToFind = Math.abs(preambles[j] - value);
                if (preambles.indexOf(valueToFind) != -1) {
                    found = true;
                    break;
                }
            }
        }

        if (found == false) {
            return value;
        }
    }
}

function Part2(lines: string[], encodingError: number) {

    let encodings: number[] = new Array();
    for (let i = 0; i < lines.length; i++) {
        encodings.push(+lines[i]);
    }

    for (let i = 0; i < encodings.length; i++) {

        let total = 0;
        let preambles: number[] = new Array();
        for (let k = i + 1; k < encodings.length; k++) {

            preambles.push(encodings[k]);
            total += encodings[k];
            if (total == encodingError) {
                const sorted = preambles.sort((a,b) => a-b);
                return sorted[0] + sorted[sorted.length - 1];
            }
            else if (total > encodingError) {
                break;
            }
        }

    }
}


