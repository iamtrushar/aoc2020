import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let data: string[] = input.split("\r\n\r\n").map(String);


console.log("Part 1");
console.log(`Valid passports: ${passportProcessing(data, true)}`);


console.log("Part 2");
console.log(`Valid passports: ${passportProcessing(data, false)}`);

function passportProcessing(data: string[], isPart1: boolean) {

    let count: number = 0;
    for (let i = 0; i < data.length; i++) {

        var passport = data[i].split("\r\n").join(" ");
        if (passport.includes("byr")
            && passport.includes("iyr")
            && passport.includes("eyr")
            && passport.includes("hgt")
            && passport.includes("hcl")
            && passport.includes("ecl")
            && passport.includes("pid")) {

            if (isPart1) {
                count++;
            }
            else {
                if (ValidatePassportInfo(passport)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function ValidatePassportInfo(passportData: string) {

    let isValidPassport = false;

    // (Birth Year) - four digits; at least 1920 and at most 2002.
    const byrRegEx = /byr:[0-9]{4}/;
    const byrResult = passportData.match(byrRegEx);
    if (byrResult != null &&byrResult.length == 1) {
        const b = +byrResult[0].substring("byr:".length);
        if (b >= 1920 && b <= 2002) {
            isValidPassport = true;
        }
        else {
            return false;
        }
    }
    else{
        return false;
    }

    // (Issue Year) - four digits; at least 2010 and at most 2020.
    const iyrRegEx = /iyr:[0-9]{4}/;
    const iyrResult = passportData.match(iyrRegEx);
    if (iyrResult != null && iyrResult.length == 1) {
        const y = +iyrResult[0].substring("iyr:".length);
        if (y >= 2010 && y <= 2020) {
            isValidPassport = true;
        }
        else {
            return false;
        }
    }
    else{
        return false;
    }

    // (Expiration Year) - four digits; at least 2020 and at most 2030.
    const eyrRegEx = /eyr:[0-9]{4}/;
    const eyrResult = passportData.match(eyrRegEx);
    if (eyrResult != null && eyrResult.length == 1) {
        const y = +eyrResult[0].substring("eyr:".length);
        if (y >= 2020 && y <= 2030) {
            isValidPassport = true;
        }
        else {
            return false;
        }
    }
    else{
        return false;
    }

    // (Height) - a number followed by either cm or in:
    // If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.
    const hgtRegEx = /hgt:[0-9]{3}cm|hgt:[0-9]{2}in/;
    const hgtResult = passportData.match(hgtRegEx);
    if (hgtResult != null && hgtResult.length == 1) {
        const r = hgtResult[0];
        if (r.includes("cm")) {
            const h = +r.substring("hgt:".length).replace("cm","");
            if (h >= 150 && h <= 193) {
                isValidPassport = true;
            }
            else {
                return false;
            }
        }
        else if (r.includes("in")) {
            const h = +r.substring("hgt:".length).replace("in","");
            if (h >= 59 && h <= 76) {
                isValidPassport = true;
            }
            else {
                console.log(`Input (${passportData})`);
                console.log(`(Height) - a number followed by in (59/76): '${r}'`);
                return false;
            }
        }
    }
    else{
        return false;
    }
    

    // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    const hclRegEx = /hcl:#[0-9a-f]{6}/;
    const hclresult = passportData.match(hclRegEx);
    if (hclresult != null && hclresult.length == 1) {
        const _= hclresult[0].substring("hcl:".length);
        isValidPassport = true;
    }
    else {
        // console.log(`Input (${passportData})`);
        // console.log(`(Hair Color) - a # followed by exactly six characters 0-9 or a-f: NotFound`);
        return false;
    }

    // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const eclRegEx = /ecl:amb|blu|brn|gry|grn|hzl|oth/;
    const eclResult = passportData.match(eclRegEx);
    if (eclResult != null && eclResult.length == 1) {
        const _ = eclResult[0].substring("eyr:".length);
        isValidPassport = true;
    }
    else {
        return false;
    }


    // (Passport ID) - a nine-digit number, including leading zeroes.
    const pidRegEx = /pid:[0-9]*/;
    const pidResult = passportData.match(pidRegEx);
    if (pidResult != null 
        && pidResult.length == 1
        && pidResult[0].substring("pid:".length).length == 9) {
        isValidPassport = true;
    }
    else {
        return false;
    }

    return isValidPassport;
}

