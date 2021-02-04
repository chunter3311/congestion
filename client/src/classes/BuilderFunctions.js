export class Car {
    constructor(id) {
        this.id = id;
        this.orientation = null;
        this.imageUrl = null;
        this.length = 0;
        this.row = null;
        this.column = null;
        this.start = null;
        this.end = null;
    }
}

export class Game {
    constructor(layout) {
        this.layout = layout;
        this.cars = [];
        this.newCarIndex = null;
        this.initialize();
    }

    initialize() {
        for (let id = 1; id <= 18; id++) {
            const car = new Car(id);
            this.cars.push(car);
        }
        return;
    }

    addCar(row, column, length, orientation, imageUrl) {
        const car = this.cars[this.getNewCarIndex()];
        if (!this.isValidMove(car.id, row, column, length, orientation)) return false;
        car.length = length;
        car.orientation = orientation;
        car.imageUrl = imageUrl;
        if (orientation === 'h') {
            for (let count = 0; count < car.length; count++) {
                this.layout[row][column + count] = car.id;
            }
            car.row = row;
            car.start = column;
        }
        else if (orientation === 'v') {
            for (let count = 0; count < car.length; count++) {
                this.layout[row + count][column] = car.id;
            }
            car.column = column;
            car.start = row;
        }
        car.end = car.start + car.length - 1;
        return true;
    }

    getNewCarIndex() {
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].length === 0) {
                this.newCarIndex = i;
                return i;
            }
        }
    }

    move(row, column, car) {
        if (!this.isValidMove(car.id, row, column, car.length, car.orientation)) return false;
        if (car.orientation === 'h') {
            for (let count = 0; count < car.length; count++) {
                this.layout[car.row][car.start + count] = 0;
                this.layout[row][column + count] = car.id;
            }
            car.row = row;
            car.start = column;
            car.end = column + car.length - 1;
        }
        else if (car.orientation === 'v') {
            for (let count = 0; count < car.length; count++) {
                this.layout[car.start + count][car.column] = 0;
                this.layout[row + count][column] = car.id;
            }
            car.column = column;
            car.start = row;
            car.end = row + car.length - 1;
        }
        return true;
    }

    isValidMove(id, row, column, length, orientation) {
        if (orientation === 'h' && column > (6 - length)) return false;
        else if (orientation === 'v' && row > (6 - length)) return false;

        if (orientation === 'h') {
            for (let c = column; c < column + length; c++) {
                if (this.layout[row][c] > 0 && this.layout[row][c] !== id) return false;
            }
        }
        else if (orientation === 'v') {
            for (let r = row; r < row + length; r++) {
                if (this.layout[r][column] > 0 && this.layout[r][column] !== id) return false;
            }
        }
        return true;
    }

    remove(i) {
        const car = this.cars[i];
        if (car.orientation === 'h') {
            for (let column = car.start; column <= car.end; column++) {
                this.layout[car.row][column] = 0;
            }
        }
        else if (car.orientation === 'v') {
            for (let row = car.start; row <= car.end; row++) {
                this.layout[row][car.column] = 0;
            }
        }
        car.orientation = null;
        car.imageUrl = null;
        car.length = 0;
        car.row = null;
        car.column = null;
        car.start = null;
        car.end = null;
        return;
    }

    getCarIndex(id) {
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].id === id) return i;
        }
    }

    reset() {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                this.layout[row][column] = 0;
            }
        }
        this.cars.forEach(car => {
            car.orientation = null;
            car.imageUrl = null;
            car.length = 0;
            car.row = null;
            car.column = null;
            car.start = null;
            car.end = null;
        });
        this.newCarIndex = null;
        return;
    }

    getDatabaseLayout() {
        let databaseLayout = '';
        this.layout.forEach((row, i) => {
            row.forEach((value, i) => {
                console.log(i, value, value.toString().length);
                if (value.toString().length === 1) {
                    databaseLayout += '0';
                }
                databaseLayout += `${value}`;
            })
        })
        return databaseLayout;
    }
}

// [1, 1, 1, 2, 3, 4],
// [5, 0, 0, 2, 3, 4],
// [5, 0, 0, 6, 6, 4],
// [5, 0, 0, 7, 7, 7],
// [0, 0, 0, 8, 0, 0],
// [0, 0, 0, 8, 10, 10]