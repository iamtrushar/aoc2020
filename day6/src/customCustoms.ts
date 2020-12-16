import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let data: string[] = input.split("\n\n");;

let count = 0;
for (let index: number = 0; index < data.length; index++) {

    const group = data[index].split("\n").join("");
    let distinctGroup: string[] = new Array();
    for (var i = 0; i < group.length; i++) {
        const g = group[i];
        if (distinctGroup.indexOf(g) == -1) {
            distinctGroup.push(g)
        }
    }
    count += distinctGroup.length;
}
console.log(`Part 1 answer: ${count}`);


let countCommon = 0;
for (let index: number = 0; index < data.length; index++) {

    const rows: string[] = data[index].split("\n");
    const a = rows[0].split("").sort();
    let questions: string[] = new Array();
    for (let i = 0; i < a.length; i++) {

        const q = a[i];
        let commonQuestion: string[] = new Array();
        if (rows.length == 1) {
            questions.push(q);
        }

        let found = false;
        for (let j = 1; j < rows.length; j++) {

            const b = rows[j].split("").sort();
            if (b.indexOf(q) != -1) {
                found = true;
            }
            else {
                found = false;
                break;
            }
        }

        if (found && !(commonQuestion.indexOf(q) != -1)) {
            commonQuestion.push(q);
        }

        commonQuestion.forEach(element => {
            questions.push(element);
        });
    }

    countCommon += questions.length;
}

console.log(`Part 2 answer: ${countCommon}`);
