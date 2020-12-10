import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let mapWithTrees: string[] = input.split("\r\n").map(String);

console.log("Part 1");
console.log(`Trees found (part 1): ${calculateTrees(3, 1, mapWithTrees)}`);


console.log("Part 2");
console.log(`Trees found (part 1): ${calculateTrees(1, 1, mapWithTrees) * calculateTrees(3, 1, mapWithTrees) * calculateTrees(5, 1, mapWithTrees) * calculateTrees(7, 1, mapWithTrees) * calculateTrees(1, 2, mapWithTrees)}`);

function calculateTrees(right: number, down: number, mapWithTrees: string[]){

    let validTree: number = 0;
    let position: number = right;
    
    for (let i = down; i < mapWithTrees.length; i = i + down) {

        const row = mapWithTrees[i];
        let value: string = row[position];
        if (value == "#") {
            validTree++;
        }
    
        position = position + right;
    
        if(position >= row.length){
            position = position - row.length;
        }
    }

    return validTree;
}
