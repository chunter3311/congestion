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
        this.moveOptions = []
        // this.canMovePositive = null;
        // this.canMoveNegative = null;
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
        this.ids = new Set();
        this.layout = layout;
        this.originalLayout = [[], [], [], [], [], []];
        this.cars = [];
        // this.validMoves = {};
        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.solutionMovesList = [];
        this.initialize(this.layout);
    }

    initialize(layout) {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.originalLayout[row].push(layout[row][column]);
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                if (this.ids.has(id)) {
                    this.cars[this.getCarIndex(id)].add(row, column);
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
        // this.setMoveOptions()
        return;
    }

    getCarIndex(id) {
        const carId = parseInt(id);
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === carId) return i;
        }
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

    // setMoveOptions() {
    //     this.cars.forEach(car => {
    //         if (car.orientation === 'v') {
    //             if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) car.moveOptions.push('D');
    //             if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) car.moveOptions.push('U');
    //         }
    //         else {
    //             if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) car.moveOptions.push('R');
    //             if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) car.moveOptions.push('L');
    //         }

    //     })
    // }

    // updateMoveOptions_VerticalPositive(column, oldStart, oldEnd, newStart, newEnd) {

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
            const oldStart = car.start;
            const oldEnd = car.end;
            car.start += unitsMoved;
            car.end += unitsMoved;
            // this.updateMoveOptions_VerticalPositive(car.column, oldStart, oldEnd, car.start, car.end);
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
        }
        // this.updateMoveOptions(car);

        return true;
    }

    negativeMove(car) {
        let unitsMoved = 0;
        // console.log(car);
        if (car.orientation === 'v') {
            for (let row = car.start - 1; row >= 0 && this.layout[row][car.column] === 0; row--) {
                unitsMoved++;
                this.layout[row][car.column] = car.id;
                this.layout[row + car.length][car.column] = 0;
            }
            if (!unitsMoved) return false;
            car.start -= unitsMoved;
            car.end -= unitsMoved;
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
        }
        return true;
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

        this.previousCarIndex = -1;
        this.currentCarIndex = -1;
        this.moves = 0;
        this.movesList = [];
        this.isSolved = false;
    }

    // this.validMoves = {
    //     '0': {
    //         '0': ['U'],
    //         '1': ['L', 'R']
    //     }
    // }
    // for (const move in this.validMoves) {
    //     if (index == this.validMoves[index] && this.validMoves[index] > luckyInt) luckyInt = this.validMoves[index];
    // }
    // let carIndexes = [];
    // this.cars.forEach(car, i => {
    //     carIndexes.push(i);
    // })
    // let carIndexSet = new Set(carIndexes);
    // if (this.previousCarIndex >= 0) carIndexSet.delete(this.previousCarIndex);

    getMove() {
        const move = [];
        let direction = null;
        let car = null;
        let carIndex = null;
        const carIndexes = new Set();
        this.cars.forEach((car, i) => {
            carIndexes.add(i);
        })
        console.log('og carIndexes', carIndexes);
        carIndexes.delete(this.previousCarIndex);
        do {
            carIndex = Math.floor(Math.random() * carIndexes.size);
            console.log('carIndex', carIndex)
            car = this.cars[carIndex];
            direction = this.getDirection(car);
            console.log('direction', direction)
            if (direction === null) carIndexes.delete(carIndex);
        } while (direction === null)
        console.log('updated carIndexes', carIndexes);
        this.currentCarIndex = carIndex;
        move.push(car);
        move.push(direction);
        // console.log('move', move)
        return move;
    }

    getDirection(car) {
        const directions = [];
        if (car.orientation === 'v') {
            if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) directions.push('D');
            if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) directions.push('U');
        }
        else {
            if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) directions.push('R');
            if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) directions.push('L');
        }
        if (directions.length === 1) return directions[0];
        else if (directions.length === 2) return directions[Math.floor(Math.random() * 2)];
        else return null;
    }

    // [1, 1, 1, 2, 3, 4],
    // [5, 0, 0, 2, 3, 4],
    // [5, 0, 0, 6, 6, 4],
    // [5, 0, 0, 7, 7, 7],
    // [0, 0, 0, 8, 0, 0],
    // [0, 0, 0, 8, 9, 9]





    // getMove() {
    //     const carIndex = this.getRandomCarIndex();
    //     const directionNumb = this.getRandomDirection();
    //     const car = this.cars[carIndex];
    //     let direction = '';
    //     if (car.orientation === 'h') {
    //         if (directionNumb === 1) direction = 'L';
    //         else if (directionNumb === 2) direction = 'R';
    //     }
    //     else {
    //         if (directionNumb === 1) direction = 'U';
    //         else if (directionNumb === 2) direction = 'D';
    //     }
    //     const move = [`${carIndex}`, `${direction}`]
    //     return move;
    // }

    // getRandomCarIndex() {
    //     let carIndex = null;
    //     if (this.previousCarIndex === -1) {
    //         carIndex = Math.floor(Math.random() * this.cars.length);
    //     }
    //     else {
    //         do {
    //             carIndex = Math.floor(Math.random() * this.cars.length);
    //         } while (carIndex !== this.previousCarIndex)
    //     }
    //     return carIndex;
    // }

    // getRandomDirection() {
    //     const min = Math.ceil(1);
    //     const max = Math.floor(3);
    //     return Math.floor(Math.random() * (max - min) + min);
    // }

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