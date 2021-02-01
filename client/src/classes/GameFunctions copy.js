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
        this.newCarIndex = 0;
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
        if (!this.isValidMove(row, column, length, orientation)) return false;
        const car = this.cars[this.newCarIndex];
        car.length = length;
        car.orientation = orientation;
        car.imageUrl = imageUrl;
        if (orientation === 'h') {
            car.row = row;
            car.start = column;
        }
        else if (orientation === 'v') {
            car.column = column;
            car.start = row;
        }
        car.end = car.start + car.length - 1;
        this.updateLayout();
        return true;
    }

    move(row, column, car) {
        if (!this.isValidMove(row, column, car.length, car.orientation)) return false;
        if (car.orientation === 'h') {
            for (let count = 0; count < car.length; count++) {
                this.layout[row][car.start + count] = 0;
                this.layout[row][column + count] = car.id;
            }
            car.row = row;
            car.start = column;
            car.end = column + car.length - 1;
        }
        else if (car.orientation === 'v') {
            for (let count = 0; count < car.length; count++) {
                this.layout[car.start + count][column] = 0;
                this.layout[row + count][column] = car.id;
            }
            car.column = column;
            car.start = row;
            car.end = row + car.length - 1;
        }
    }

    isValidMove(row, column, length, orientation) {
        if (orientation === 'h' && column > (6 - length)) return false; // checking bounds
        else if (orientation === 'v' && row > (6 - length)) return false;

        if (orientation === 'h') { // checking for enough space
            for (let c = column; c < column + length; c++) {
                if (this.layout[row][c] > 0) return false;
            }
        }
        else if (orientation === 'v') {
            for (let r = row; r < row + length; r++) {
                if (this.layout[r][column] > 0) return false;
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
        return;
    }

    getDatabaseLayout() {
        let databaseLayout = '';
        this.layout.forEach((row, i) => {
            row.forEach((value, i) => {
                databaseLayout += `${value}0`;
            })
        })
        return databaseLayout;
    }

}