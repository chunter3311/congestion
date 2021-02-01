export class Car {
    constructor(id) {
        this.id = id;
        this.imageUrl = null;
        this.position = [];
        this.orientation = null;
        this.length = 0;
        this.start = null;
        this.end = null;
        this.row = null;
        this.column = null;
    }
}

export class Game {
    constructor(layout) {
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

    addCar (row, column, length, orientation, imageUrl) {
        if (!this.isValidMove(row, column, length, orientation)) return null;
        for (let c = 0; c < this.cars.length; c++) {
            if (this.cars[c].length === 0) {
                this.cars[c].length = length;
                this.cars[c].orientation = orientation;
                this.cars[c].imageUrl = imageUrl;
                if (orientation === 'h') {
                    let columnEnd = column;
                    let columnStart = columnEnd - (length - 1);
                    for (let c = columnStart; c <= columnEnd; c++) {
                        this.cars[c].position.push([row, c]);
                    }
                    this.cars[c].row = row;
                    this.cars[c].start = columnStart;
                    this.cars[c].end = columnEnd;
                }
                else if (orientation === 'v') {
                    let rowEnd = row;
                    let rowStart = rowEnd - (length - 1);
                    for (let r = rowStart; r <= rowEnd; r++) {
                        this.cars[c].position.push([r, column]);
                    }
                    this.cars[c].column = column;
                    this.cars[c].start = rowStart;
                    this.cars[c].end = rowEnd;
                }
                return c;
            }
        }

        this.updateLayout();
        return;
    }

    move(row, column, car) {
        if (!this.isValidMove(row, column, car.length, car.orientation)) return false;
        if (car.orientation === 'v') {
            if (row === 5 && car.length === 2) row--;
            else if (row === 5 && car.length === 3) row = row - 2;
            for (let r = row; r < row + car.length; r++) {
                
                if (this.layout[r][column] > 0 && this.layout[r][column] !== car.id) return false;
            }
            car.column = column;
            car.start = row;
            car.end = car.start + (car.length - 1);
            this.updateLayout();
            return true;
        }
        else if (car.orientation === 'h') {
            if (column === 5 && car.length === 2) column--;
            else if (column === 5 && car.length === 3) column = column - 2;
            for (let c = column; c < column + car.length; c++) {
                if (this.layout[row][c] > 0 && this.layout[row][c] !== car.id) return false;
            }
            car.row = row;
            car.start = column;
            car.end = car.start + (car.length - 1);
            this.updateLayout();
            return true;
        }
    }

    isValidMove(row, column, length, orientation) {
        if (orientation === 'h') {
            let columnEnd = column;
            let columnStart = columnEnd - (length - 1);
            if (columnStart < 0) return false;
            if (columnEnd > 5) return false;
            for (let c = columnStart; c <= columnEnd; c++) {
                if (this.layout[row][c] > 0) return false;
            }
        }
        else if (orientation === 'v') {
            let rowEnd = row;
            let rowStart = rowEnd - (length - 1);
            if (rowStart < 0) return false;
            if (rowEnd > 5) return false;
            for (let r = rowStart; r <= rowEnd; r++) {
                if (this.layout[r][column] > 0) return false;
            }
        }
        return true;
    }

    remove(i) {
        this.cars.splice(i, 1);
        this.updateLayout();
        return;
    }

    updateLayout() {
        this.layout.forEach(row => {
            row.forEach((column, i) => {
                row[i] = 0;
            })
        })
        this.cars.forEach(car => {
            if (car.length > 0) {
                if (car.orientation === 'h') {
                    for (let column = car.start; column <= car.end; column++) {
                        this.layout[car.row][column] = car.id;
                    }
                }
                else if (car.orientation === 'v') {
                    for (let row = car.start; row <= car.end; row++) {
                        this.layout[row][car.column] = car.id;
                    }
                }
            }
        })
    }

    getDatabaseLayout() {
        console.log(this.layout)
        let databaseLayout = '';
        this.layout.forEach((row, i) => {
            row.forEach((value, i) => {
                databaseLayout += `${value}0`;
            })
        })
        return databaseLayout;
    }
}