// export const solvePuzzle = (layout) => {
//     const moves = {};

//     return moves;
// }

export class Car {
    constructor(row, column, id) {
        this.id = id;
        this.initialCoordinates = [[row, column]];
        this.start = null;
        this.end = null;
        this.orientation = null;
        this.length = 1;
        this.row = null;
        this.column = null;
    }

    add(row, column) {
        this.initialCoordinates.push([row, column]);
        this.length++;
        return;
    }
}

export class Game {
    constructor(layout) {
        this.ids = new Set();
        this.layout = layout;
        this.cars = [];
        this.initialize();
    }

    initialize() {
        for (let c = 1; c <= 18; c++) {
            const car = new Car(c);
            this.cars.push(car);
        }
        return;
    }

    // setCarEndPoints(car) {
    //     if (car.orientation === 'h') {
    //         car.start = car.initialCoordinates[0][1];
    //         car.end = car.initialCoordinates[car.length - 1][1];
    //     }
    //     else {
    //         car.start = car.initialCoordinates[0][0];
    //         car.end = car.initialCoordinates[car.length - 1][0];
    //     }
    //     return;
    // }

    positiveMove(car) {
        let unitsMoved = 0;
        if (car.orientation === 'v') {
            for (let row = car.end + 1; row <= 5 && this.layout[row][car.column] === 0; row++) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row - car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            car.start += unitsMoved;
            car.end += unitsMoved;
            console.log(car.id);
            console.log('D');
            return true;
        }
        else if (car.orientation === 'h') {
            for (let column = car.end + 1; column <= 5 && this.layout[car.row][column] === 0; column++) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column - car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start += unitsMoved;
            car.end += unitsMoved;
            if (car.row === 2 && car.end === 5) {
                car.start += 2;
                car.end += 2;
                this.isSolved = true;
            }
            console.log(car.id);
            console.log('R');
            return true;
        }
    }

    negativeMove(car) {
        let unitsMoved = 0;
        if (car.orientation === 'v') {
            for (let row = car.start - 1; row >= 0 && this.layout[row][car.column] === 0; row--) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row + car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
            console.log(car.id);
            console.log('U');
            return true;
        }
        else if (car.orientation === 'h') {
            for (let column = car.start - 1; column >= 0 && this.layout[car.row][column] === 0; column--) {
                unitsMoved++;
                this.layout[car.row][column] = car.id;
                this.layout[car.row][column + car.length] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
            console.log(car.id);
            console.log('L');
            return true;
        }
    }

    reset() {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.layout[row][column] = this.originalLayout[row][column];
            }
        }
        this.cars.forEach(car => {
            this.setCarEndPoints(car);
        });
        this.isSolved = false;
        this.moves = 0;
    }

    solve() {
        
    }
}

// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0]

// [1, 1, 1, 2, 3, 4],
// [5, 0, 0, 2, 3, 4],
// [5, 0, 0, 6, 6, 4],
// [5, 0, 0, 7, 7, 7],
// [0, 0, 0, 8, 0, 0],
// [0, 0, 0, 8, 9, 9]