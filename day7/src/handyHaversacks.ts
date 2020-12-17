import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");
Part1(lines);
Part2(lines);

function Part1(lines: string[]) {
    let holdingGold: string[] = findBag("shiny gold", lines, new Array())

    let i = 0;
    do {
        const bagContainingGold = holdingGold[i].substring(0, (holdingGold[i].indexOf("bag") - 1));
        const items = findBag(bagContainingGold, lines, holdingGold);
        items.forEach(element => {
            holdingGold.push(element);
        });
    } while (holdingGold.length != ++i)


    function findBag(bagName: string, data: string[], golds: string[]) {
        let goldBag: string[] = new Array();
        for (let index: number = 0; index < data.length; index++) {

            const line = data[index];
            if (line.indexOf(bagName) != -1 && !line.startsWith(bagName)) {
                if (!golds.includes(line)) {
                    goldBag.push(line);
                }
            }
        }
        return goldBag;
    }

    console.log(`Answer Part 1: ${holdingGold.length}`);
}

function Part2(lines: string[]) {

    let allBags: string[] = getBags(1, "shiny gold", lines);

    let i = 0;
    do {
        const bagName: string = allBags[i].match(/[a-z\s]+/)[0].trim();
        const bagCount: number = +allBags[i].match(/[0-9]*/);
        const items = getBags(bagCount, bagName, lines);
        items.forEach(element => {
            allBags.push(element);
        });
    } while (allBags.length != ++i)


    // shiny gold bags contain 4 pale black bags, 4 dim violet bags, 3 muted yellow bags.
    function getBags(multiplier: number, bagToFind: string, records: string[]) {

        let bags: string[] = new Array();
        let i = 0;
        while (i < records.length) {
            const line = records[i];
            const bagName = line.substring(0, (line.indexOf("bag") - 1));
            if (bagName == bagToFind && line.startsWith(bagName)) {
                const bagTypes = line.split(/bags|bag+/);
                bagTypes.forEach(element => {
                    const e = element.replace(",", "").replace("contain", "").trim();
                    if (e != bagToFind && e != ".") {
                        const n: string = e.substring(2);
                        const c: number = +e.substring(0, 2);
                        const newCount = c * multiplier;
                        if (n.indexOf(" other") == -1) {
                            bags.push(`${newCount} ${n}`);
                        }
                    }
                });
            }
            i++;
        }

        return bags;
    }

    let count = 0;
    allBags.forEach(element => {
        const item = element.match(/[0-9]+/)[0].trim();
        count += +item;
    });

    console.log(`Answer Part 2: ${count}`);
}