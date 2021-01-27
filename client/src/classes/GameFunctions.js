export const solvePuzzle = (layout) => {
    const moves = {};

    return moves;
}

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
        this.isSolved = false;
        this.moves = 0;
        this.ids = new Set();
        this.layout = layout;
        this.originalLayout = [[],[],[],[],[],[]];
        this.cars = [];
        this.initialize(this.layout);
    }

    initialize(layout) {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.originalLayout[row].push(layout[row][column]);
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                if (this.ids.has(id)) {
                    this.cars[id - 1].add(row, column);
                }
                else {
                    this.ids.add(id);
                    this.cars.push(new Car(row, column, id));
                }
            }
        }
        this.cars.forEach(car => {
            if (car.initialCoordinates[0][0] === car.initialCoordinates[1][0]) {
                car.orientation = 'h';
                car.row = car.initialCoordinates[0][0];
            }
            else {
                car.orientation = 'v';
                car.column = car.initialCoordinates[0][1];
            }
            this.setCarEndPoints(car);
        });
        return;
    }

    setCarEndPoints(car) {
        if (car.orientation === 'h') {
            car.start = car.initialCoordinates[0][1];
            car.end = car.initialCoordinates[car.length - 1][1];
        }
        else {
            car.start = car.initialCoordinates[0][0];
            car.end = car.initialCoordinates[car.length - 1][0];
        }
        return;
    }

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