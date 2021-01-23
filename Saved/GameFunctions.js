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
        this.layout = layout;
        this.oldLayout = [[],[],[],[],[],[]];
        this.blocks = [];
        this.verticalBlocks = [];
        this.horizontalBlocks = [];
        this.initialize(this.layout);
    }

    reset(layout) {
        this.isSolved = false;
        this.moves = 0;
        this.resetLayout(layout);
        this.resetBlocks();
        this.defineOrientations();
    }

    resetLayout(layout) {
        this.layout.forEach((row, r) => {
            row.forEach((column, c) => {
                row[c] = layout[r][c];
            })
        })
    }

    resetBlocks() {
        this.blocks.forEach(car => {
            car.initialCoordinates.forEach(set => {
                set = [];
            })
        })


        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 6; c++) {
                if (this.layout[r][c] === 0) continue;
                for (let b = 0; b < this.blocks.length; b++) {
                    if (this.blocks[b].id === this.layout[r][c]) {
                        this.blocks[b].initialCoordinates.push(r, c);
                        break;
                    }
                }
            }
        }

        // this.blocks.forEach(car => {
        //     console.log(car.initialCoordinates);
        // })

        // this.layout.forEach((row, r) => {
        //     row.forEach((val, c) => {
        //         this.oldLayout[r][c] = val;
        //     })
        // })
    }

    initialize(layout) {
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                this.buildBlock(row, column, id);
            }
        }
        this.defineOrientations();

        return;
    }

    buildBlock(row, column, id) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].id === id) {
                this.blocks[i].add(row, column);
                return;
            }
        }
        const car = new Car(row, column, id);
        this.blocks.push(car);
        return;
    }



    defineOrientations() {
        this.blocks.forEach(car => {
            if (car.initialCoordinates[0][0] === car.initialCoordinates[car.length - 1][0]) {
                car.orientation = 'h';
                car.row = car.initialCoordinates[0][0];
                car.start = car.initialCoordinates[0][1];
                car.end = car.initialCoordinates[car.length - 1][1];
                this.horizontalBlocks.push(car);
            } else {
                car.orientation = 'v';
                car.column = car.initialCoordinates[0][1];
                car.start = car.initialCoordinates[0][0];
                car.end = car.initialCoordinates[car.length - 1][0];
                this.horizontalBlocks.push(car);
            }
        });
        return;
    }

    positiveMove(car) {
        if (car.orientation === 'v') {
            for (let row = car.end + 1; row <= 5; row++) { //1
                if (this.layout[row][car.column] > 0) { //2
                    car.end = row - 1;
                    car.start = car.end - (car.length - 1);
                    return this.updateLayout();
                }
            }
            car.end = 5;
            car.start = car.end - (car.length - 1);
            return this.updateLayout();
        }
        else if (car.orientation === 'h') {
            for (let column = car.end + 1; column <= 5; column++) {
                if (this.layout[car.row][column] > 0) {
                    car.end = column - 1;
                    car.start = car.end - (car.length - 1);
                    return this.updateLayout();
                }
            }
            if (car.row === 2) {
                car.end = 7;
                car.start = 6;
                this.isSolved = true;
            }
            else {
                car.end = 5;
                car.start = car.end - (car.length - 1);
            }
            return this.updateLayout();
        }
        return this.updateLayout();
    }

    negativeMove(car) {
        if (car.orientation === 'v') {
            for (let row = car.start - 1; row >= 0; row--) { //1
                if (this.layout[row][car.column] > 0) { //2
                    car.start = row + 1;
                    car.end = car.start + (car.length - 1);
                    return this.updateLayout();
                }
            }
            car.start = 0;
            car.end = car.start + (car.length - 1);
            return this.updateLayout();
        }
        else if (car.orientation === 'h') {
            for (let column = car.start - 1; column >= 0; column--) { //1
                if (this.layout[car.row][column] > 0) { //2
                    car.start = column + 1;
                    car.end = car.start + (car.length - 1);
                    return this.updateLayout();

                }
            }
            car.start = 0;
            car.end = car.start + (car.length - 1);
            return this.updateLayout();
        }
        return this.updateLayout();
    }

    updateLayout() {
        this.layout.forEach((row, r) => {
            // console.log(r)
            row.forEach((val, c) => {
                // console.log(r)
                this.oldLayout[r][c] = val;
                // console.log(this.oldLayout)
                
            })
        })
        
        
        this.layout.forEach(row => {
            row.forEach((column, i) => {
                row[i] = 0;
            })
        })
        this.blocks.forEach(car => {
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
        })

        console.log(this.oldLayout);
        console.log(this.layout);
        return this.arraysEqual(this.oldLayout, this.layout);


    }

    arraysEqual(_arr1, _arr2) {
        // console.log('this.oldLayout', _arr1);
        // console.log('newLayout', _arr2);
        if (
            !Array.isArray(_arr1)
            || !Array.isArray(_arr2)
            || _arr1.length !== _arr2.length
        ) {
            return false;
        }

        // .concat() is used so the original arrays are unaffected
        const arr1 = _arr1.concat().sort();
        const arr2 = _arr2.concat().sort();

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }
}

// const moves = {
//     1: [2, 'D']
// };

// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0]

//     [1, 1, 1, 2, 3, 4],
//     [5, 0, 0, 2, 3, 4],
//     [5, 0, 0, 6, 6, 4],
//     [5, 0, 0, 7, 7, 7],
//     [0, 0, 0, 8, 0, 0],
//     [0, 0, 0, 8, 9, 9]

export const solvePuzzle = (layout) => {
    const moves = {};

    return moves;
}