import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");

Part1(lines);

Part2(lines);

function Part1(lines: string[]) {

    let accumulators: number[] = new Array();
    let accIndexes: number[] = new Array();
    let i = 0;
    let accValue = 0;
    let k = 0;
    while (true) {

        const operation = lines[i].substring(0, 3);
        const value = +lines[i].substring(3);

        if (operation == "nop") {
            i++;
        }
        else if (operation == "jmp") {
            i += value;
        }
        else {
            accValue += value;
            accumulators.push(accValue);
            accIndexes.push(i);
            i++;
        }

        if (k++ >= lines.length) {
            break;
        }
    }


    for (let i = 0; i < accIndexes.length; i++) {

        let indValue = accIndexes[i];
        for (let j = 0; j < accIndexes.length; j++) {

            if (i == j) {
                continue;
            }
            if (indValue == accIndexes[j]) {
                console.log(`Accumulator Value ${accumulators[j - 1]}`);
                return;
            }
        }

    }

}


function Part2(linesParm: string[]) {

    const lines = linesParm;
    let accValue = -1;
    let k = 0;
    while (true) {

        const operation = lines[k].substring(0, 3);
        const value = +lines[k].substring(3);
        if (operation == "nop") {
            let l = [...lines];
            l[k] = "jmp " + value;
            accValue = CalculateAcc(l);
            if (accValue != -1) {
                break;
            }

            k++;
        }
        else if (operation == "jmp") {
            let l = [...lines];
            l[k] = "nop " + value;
            accValue = CalculateAcc(l);
            if (accValue != -1) {
                break;
            }

            k++;
        }
        else {
            k++;
        }

        accValue = -1
        if (k > lines.length) {
            break;
        }
    }

    if (accValue != -1) {
        console.log(`Accumulator Value ${accValue}`);
    }
}

function CalculateAcc(lines: string[]) {

    let accValue = 0;
    let i = 0;
    let k = 0;
    while (i < lines.length) {
        const operation = lines[i].substring(0, 3);
        const value = +lines[i].substring(3);

        if (operation == "nop") {
            i++;
        }
        else if (operation == "jmp") {
            i += value;
        }
        else {
            accValue += value;
            i++;
        }

        if (k++ >= lines.length) {
            return -1;
        }
    }

    return accValue;
}