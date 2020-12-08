import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let passwords: string[] = input.split("\n").map(String);

console.log("Part 1");
let validPasswords: number = 0;
for (let i = 0; i < passwords.length; i++) {

    const split: string[] = passwords[i].split(" ");

    const condition: string[] = split[0].split("-");
    const lowerLimit: number = +condition[0];
    const upperLimit: number = +condition[1];

    const value: string = split[1].replace(":", "");

    const password: string = split[2];

    var occurance: number = password.split(value).length - 1;
    if (occurance >= lowerLimit && occurance <= upperLimit) {
        validPasswords++;
    }
}
console.log(`Valid passwords (part 1): ${validPasswords}`);

console.log("Part 2");
validPasswords = 0;

for (let i = 0; i < passwords.length; i++) {

    const split: string[] = passwords[i].split(" ");

    const condition: string[] = split[0].split("-");
    const lowerPosition: number = +condition[0];
    const upperPosition: number = +condition[1];

    const value: string = split[1].replace(":", "");

    const password: string = split[2].replace("\r", "");

    var l = password[lowerPosition - 1];
    var u = password[upperPosition - 1];

    if (l != undefined
        && u != undefined
        && !(l == value && u == value)
        && !(l != value && u != value)) {

        validPasswords++;
    }
}
console.log(`Valid passwords (part 2): ${validPasswords}`);
