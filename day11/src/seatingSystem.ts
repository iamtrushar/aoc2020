import * as fs from 'fs';


const input: string = fs.readFileSync("./src/input.txt", "utf8");
let lines: string[] = input.split("\n");

const seats = FillSeats(lines);
Part1And2(seats);

function FillSeats(lines: string[]) {
    let seats: string[][] = new Array();
    for (let i = 0; i < lines.length; i++) {
        seats.push([]);
        const row = lines[i];
        for (let j = 0; j < row.length; j++) {
            seats[i].push(row[j]);
        }
    }
    return seats;
}

function Part1And2(seats: string[][]) {
    const seatsBefore: string[][] = seats;

    let countMatch: number = 0;
    let match: number = 0;
    while (true) {
        let seatsAfter: string[][] = new Array();
        for (let r = 0; r < seats.length; r++) {
            seatsAfter.push([]);
            for (let c = 0; c < seats[r].length; c++) {
                const value = EvaluateSeat(r, c, seats[r][c], seats);
                seatsAfter[r][c] = value;
            }
        }
        seats = seatsAfter;

        let count: number = GetCount(seats);
        if (countMatch === count) {
            match++;
        }
        else {
            countMatch = count;
        }

        if (match > 1) {
            count = GetCount(seats);
            console.log(`No of occupied seats (Part 1): ${count}`);
            break;
        }
    }

    match = 0;
    countMatch = 0;
    seats = seatsBefore;
    const maxRows = seats.length;
    const maxColumns = seats[0].length;

    while (true) {
        let seatsAfter: string[][] = new Array();
        for (let r = 0; r < seats.length; r++) {
            seatsAfter.push([]);
            for (let c = 0; c < seats[r].length; c++) {

                const seat = seats[r][c];
                const value = EvaluateSeats(r, c, seat, seats, maxRows, maxColumns);
                seatsAfter[r][c] = value;
            }
        }
        seats = seatsAfter;
        let count: number = GetCount(seats);
        if (countMatch === count) {
            match++;
        }
        else {
            countMatch = count;
        }

        if (match > 1) {
            count = GetCount(seats);
            console.log(`No of occupied seats (Part 2): ${count}`);
            break;
        }
    }
}

function EvaluateSeats(row: number, column: number, seat: string, seats: string[][], maxRows: number, maxColumns: number) {

    let s = "";
    let n = "";
    let e = "";
    let w = "";
    let ne = "";
    let nw = "";
    let se = "";
    let sw = "";

    let r = 1;
    let c = 1;

    if (seat === "L") { // empty seat at the postion

        while (true) {
            if (s !== "#" && s !== "L" && seats[row + r] && seats[row + r][column]) {
                s = seats[row + r][column];
            }
            if (n !== "#" && n !== "L" && seats[row - r] && seats[row - r][column]) {
                n = seats[row - r][column];
            }
            if (e !== "#" && e !== "L" && seats[row][column + c]) {
                e = seats[row][column + c];
            }
            if (w !== "#" && w !== "L" && seats[row][column - c]) {
                w = seats[row][column - c];
            }
            if (ne !== "#" && ne !== "L"  && seats[row - r] && seats[row - r][column + c]) {
                ne = seats[row - r][column + c];
            }
            if (nw !== "#" && nw !== "L" && seats[row - r] && seats[row - r][column - c]) {
                nw = seats[row - r][column - c];
            }
            if (se !== "#" && se !== "L" && seats[row + r] && seats[row + r][column + c]) {
                se = seats[row + r][column + c];
            }
            if (sw !== "#" && sw !== "L" && seats[row + r] && seats[row + r][column - c]) {
                sw = seats[row + r][column - c];
            }

            if (r++ >= maxRows || c++ >= maxColumns) {
                break;
            }

        }
        if (row === 0) { // first row

            if (column === 0) { // first column

                if ((e === "L" || e === ".")
                    && (se === "L" || se === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return seat;
                }
            }
            else if (column === (seats[0].length - 1)) { // last colum

                if ((w === "L" || w === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
            else { // all other columns

                if ((e === "L" || e === ".")
                    && (w === "L" || w === ".")
                    && (se === "L" || se === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
        }
        else if (row === (seats.length - 1)) { // last row

            if (column === 0) { // first column

                if ((e === "L" || e === ".")
                    && (ne === "L" || ne === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
            else if (column === (seats[0].length - 1)) { // last colum

                if ((w === "L" || w === ".")
                    && (nw === "L" || nw === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
            else { // all other columns

                if ((e === "L" || e === ".")
                    && (w === "L" || w === ".")
                    && (ne === "L" || ne === ".")
                    && (nw === "L" || nw === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
        }
        else { // all other rows

            if (column === 0) { // first column

                // evalute east, south east, south
                if ((n === "L" || n === ".")
                    && (ne === "L" || ne === ".")
                    && (e === "L" || e === ".")
                    && (se === "L" || se === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
            else if (column === (seats[0].length - 1)) { // last colum

                // evalute east, south east, south
                if ((n === "L" || n === ".")
                    && (nw === "L" || nw === ".")
                    && (w === "L" || w === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
            else {

                if ((n === "L" || n === ".")
                    && (s === "L" || s === ".")
                    && (e === "L" || e === ".")
                    && (w === "L" || w === ".")
                    && (ne === "L" || ne === ".")
                    && (nw === "L" || nw === ".")
                    && (sw === "L" || sw === ".")
                    && (se === "L" || se === ".")) {
                    return "#";
                }
                else {
                    return seat;;
                }
            }
        }
    }
    else if (seat === "#") { // occupied

        while (true) {
            if (s !== "#" && s !== "L" && seats[row + r] && seats[row + r][column]) {
                s = seats[row + r][column];
            }
            if (n !== "#" && n !== "L" && seats[row - r] && seats[row - r][column]) {
                n =  seats[row - r][column];
            }
            if (e !== "#" && e !== "L"&& seats[row][column + c]) {
                e = seats[row][column + c];
            }
            if (w !== "#" && w !== "L"&& seats[row][column - c]) {
                w = seats[row][column - c];
            }
            if (ne !== "#" && ne !== "L" && seats[row - r] && seats[row - r][column + c]) {
                ne = seats[row - r][column + c];
            }
            if (nw !== "#" && nw !== "L" && seats[row - r] &&  seats[row - r][column - c]) {
                nw = seats[row - r][column - c];
            }
            if (se !== "#" && se !== "L" && seats[row + r] && seats[row + r][column + c]) {
                se = seats[row + r][column + c];
            }
            if (sw !== "#" && sw !== "L" && seats[row + r] && seats[row + r][column - c]) {
                sw = seats[row + r][column - c];
            }

            if (r++ >= maxRows || c++ >= maxColumns) {
                break;
            }
        }

        let count = 0;
        if (row === 0) { // first row

            if (e === "#") {
                count++;
            }
            if (w === "#") {
                count++;
            }
            if (s === "#") {
                count++;
            }
            if (se === "#") {
                count++;
            }
            if (sw === "#") {
                count++;
            }
        }
        else if (row === (seats.length - 1)) { // last row

            if (w === "#") {
                count++;
            }
            if (nw === "#") {
                count++;
            }
            if (n === "#") {
                count++;
            }
            if (ne === "#") {
                count++;
            }
            if (e === "#") {
                count++;
            }
        }
        else {

            if (e === "#") {
                count++;
            }
            if (w === "#") {
                count++;
            }
            if (n === "#") {
                count++;
            }
            if (s === "#") {
                count++;
            }
            if (se === "#") {
                count++;
            }
            if (sw === "#") {
                count++;
            }
            if (ne === "#") {
                count++;
            }
            if (nw === "#") {
                count++;
            }
        }

        if (count >= 5) {
            return "L";
        }
        else {
            return "#";
        }
    }
    else {
        return ".";
    }
}

function EvaluateSeat(row: number, column: number, seat: string, seats: string[][]) {

    const s = seats[row + 1] == undefined ? undefined : seats[row + 1][column];
    const n = seats[row - 1] == undefined ? undefined : seats[row - 1][column];
    const e = seats[row][column + 1];
    const w = seats[row][column - 1];
    const ne = seats[row - 1] == undefined ? undefined : seats[row - 1][column + 1];
    const nw = seats[row - 1] == undefined ? undefined : seats[row - 1][column - 1];
    const se = seats[row + 1] == undefined ? undefined : seats[row + 1][column + 1];
    const sw = seats[row + 1] == undefined ? undefined : seats[row + 1][column - 1];

    if (seat === "L") { // empty seat at the postion

        if (row === 0) { // first row

            if (column === 0) { // first column

                // evalute east, south east, south
                if ((e === "L" || e === ".")
                    && (se === "L" || se === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }

            }
            else if (column === (seats[0].length - 1)) { // last colum

                // evaluate west, south west, south 
                if ((w === "L" || w === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
            else { // all other columns

                // evaluate east, south east, south, south west, west
                if ((e === "L" || e === ".")
                    && (se === "L" || se === ".")
                    && (s === "L" || s === ".")
                    && (w === "L" || w === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
        }
        else if (row === (seats.length - 1)) { // last row

            if (column === 0) { // first column

                if ((e === "L" || e === ".")
                    && (ne === "L" || ne === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
            else if (column === (seats[0].length - 1)) { // last colum

                if ((w === "L" || w === ".")
                    && (nw === "L" || nw === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
            else { // all other columns
                if ((e === "L" || e === ".")
                    && (ne === "L" || ne === ".")
                    && (n === "L" || n === ".")
                    && (w === "L" || w === ".")
                    && (nw === "L" || nw === ".")
                    && (n === "L" || n === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
        }
        else { // all other rows

            if (column === 0) { // first column

                // evalute east, south east, south
                if ((n === "L" || n === ".")
                    && (ne === "L" || ne === ".")
                    && (e === "L" || e === ".")
                    && (se === "L" || se === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }

            }
            else if (column === (seats[0].length - 1)) { // last colum

                // evalute east, south east, south
                if ((n === "L" || n === ".")
                    && (nw === "L" || nw === ".")
                    && (w === "L" || w === ".")
                    && (sw === "L" || sw === ".")
                    && (s === "L" || s === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
            else {
                if ((e === "L" || e === ".")
                    && (s === "L" || s === ".")
                    && (n === "L" || n === ".")
                    && (w === "L" || w === ".")
                    && (se === "L" || se === ".")
                    && (sw === "L" || sw === ".")
                    && (ne === "L" || ne === ".")
                    && (nw === "L" || nw === ".")) {
                    return "#";
                }
                else {
                    return "L"
                }
            }
        }

    }
    else if (seat === "#") { // occupied

        let count = 0;
        if (row === 0) { // first row

            if (column === 0 || column === (seats[0].length - 1)) { // first & last column
                return "#";
            }
            else {
                if (e === "#") {
                    count++;
                }
                if (w === "#") {
                    count++;
                }
                if (s === "#") {
                    count++;
                }
                if (se === "#") {
                    count++;
                }
                if (sw === "#") {
                    count++;
                }
            }
        }
        else if (row === (seats.length - 1)) { // last row

            if (column === 0 || column === (seats[0].length - 1)) { // first & last column
                return "#";
            }
            else {
                if (w === "#") {
                    count++;
                }
                if (nw === "#") {
                    count++;
                }
                if (n === "#") {
                    count++;
                }
                if (ne === "#") {
                    count++;
                }
                if (e === "#") {
                    count++;
                }
            }
        }
        else {

            if (e === "#") {
                count++;
            }
            if (w === "#") {
                count++;
            }
            if (n === "#") {
                count++;
            }
            if (s === "#") {
                count++;
            }
            if (se === "#") {
                count++;
            }
            if (sw === "#") {
                count++;
            }
            if (ne === "#") {
                count++;
            }
            if (nw === "#") {
                count++;
            }
        }

        if (count >= 4) {
            return "L";
        }
        else {
            return "#"
        }
    }
    else {
        return ".";
    }

}

function GetCount(seats: string[][]) {
    let count: number = 0;
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] === "#") {
                count++
            }
        }
    }
    return count;
}
