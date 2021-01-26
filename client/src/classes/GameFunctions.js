// export const solvePuzzle = (layout) => {
//     const moves = {};

//     return moves;
// }

// export class Car {
//     constructor(row, column, id) {
//         this.id = id;
//         this.initialCoordinates = [[row, column]];
//         this.start = null;
//         this.end = null;
//         this.orientation = null;
//         this.length = 1;
//         this.row = null;
//         this.column = null;
//     }

//     add(row, column) {
//         this.initialCoordinates.push([row, column]);
//         this.length++;
//         return;
//     }
// }

// export class Game {
//     constructor(layout) {
//         this.isSolved = false;
//         this.ids = new Set();
//         this.moves = 0;
//         this.layout = layout;
//         this.cars = [];
//         this.initialize(this.layout);
//     }

//     initialize(layout) {
//         for (let row = 0; row < 6; row++) {
//             for (let column = 0; column < 6; column++) {
//                 if (layout[row][column] === 0) continue;
//                 let id = layout[row][column];

//                 this.buildCar(row, column, id);
//             }
//         }
//         this.defineOrientations();

//         return;
//     }

//     buildCar(row, column, id) {
//         if (this.ids.has(id)) {
//             this.cars[id - 1].add(row, column);
//         }
//         else {
//             this.ids.add(id);
//             const car = new Car(row, column, id);
//             this.cars.push(car);
//         }
//         return;
//     }

//     defineOrientations() {
//         this.cars.forEach(car => {

//             if (car.initialCoordinates[0][0] === car.initialCoordinates[1][0]) {
//                 car.orientation = 'h';
//                 car.row = car.initialCoordinates[0][0];
//                 car.start = car.initialCoordinates[0][1];
//                 car.end = car.initialCoordinates[car.length - 1][1];
//             }
//             else {
//                 car.orientation = 'v';
//                 car.column = car.initialCoordinates[0][1];
//                 car.start = car.initialCoordinates[0][0];
//                 car.end = car.initialCoordinates[car.length - 1][0];
//             }
//         });
//         return;
//     }

//     // reset(layout) {
//     //     this.isSolved = false;
//     //     this.moves = 0;
//     //     this.resetLayout(layout);
//     //     this.resetCars();
//     //     this.defineOrientations();
//     // }

//     // resetLayout(layout) {
//     //     this.layout.forEach((row, r) => {
//     //         row.forEach((column, c) => {
//     //             row[c] = layout[r][c];
//     //         })
//     //     })
//     // }

//     // resetCars() {
//     //     this.cars.forEach(car => {
//     //         car.initialCoordinates.forEach(set => {
//     //             set = [];
//     //         })
//     //     })

//     //     for (let r = 0; r < 6; r++) {
//     //         for (let c = 0; c < 6; c++) {
//     //             if (this.layout[r][c] === 0) continue;
//     //             for (let b = 0; b < this.cars.length; b++) {
//     //                 if (this.cars[b].id === this.layout[r][c]) {
//     //                     this.cars[b].initialCoordinates.push(r, c);
//     //                     break;
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     positiveMove(car) {
//         if (car.orientation === 'v') {
//             for (let row = car.end; row <= 4; row++) {
//                 if (this.layout[row + 1][car.column] > 0) {
//                     if (row === car.end) return false;
//                     car.end = row;
//                     break;
//                 }
//             }
//             car.end = 5;
//             car.start = car.end - (car.length - 1);
//             this.updateLayout(car.id, car.start, car.end, car.row, car.column);
//             return true;
//         }
//         else if (car.orientation === 'h') {
//             for (let column = car.end; column <= 4; column++) {
//                 if (this.layout[car.row][column + 1] > 0) {
//                     if (column === car.end) return false;
//                     car.end = column;
//                     break;
//                 }
//             }
//             if (car.row === 2) {
//                 car.end = 7;
//                 this.isSolved = true;
//             }
//             else {
//                 car.end = 5;
//                 car.start = car.end - (car.length - 1);
//             }
//             this.updateLayout(car.id, car.start, car.end, car.row, car.column);
//             return true;
//         }
//     }

//     negativeMove(car) {
//         if (car.orientation === 'v') {
//             for (let row = car.start; row >= 1; row--) {
//                 if (this.layout[row - 1][car.column] > 0) {
//                     if (row === car.start) return false;
//                     car.start = row;
//                     break;
//                 }
//             }
//             car.start = 0;
//             car.end = car.start + car.length - 1;
//             this.updateLayout(car.id, car.start, car.end, car.row, car.column);
//             return true;
//         }
//         else if (car.orientation === 'h') {
//             for (let column = car.start; column >= 1; column--) {
//                 if (this.layout[car.row][column - 1] > 0) {
//                     if (column === car.start) return false;
//                     car.start = column;
//                     break;
//                 }
//             }
//             car.start = 0;
//             car.end = car.start + (car.length - 1);
//             this.updateLayout(car.id, car.start, car.end, car.row, car.column);
//             return true;
//         }
//     }


//     updateLayout(id, start, end, row, column) {
//         if (row) {
//             for (let c = 0; c <= 5; c++) {
//                 if (c === start) {
//                     while (c <= end) {
//                         this.layout[row][c] = id;
//                         c++;
//                     }
//                 }
//                 if (this.layout[row][c] === id) this.layout[row][c] = 0;
//             }
//         }
//         else {
//             for (let r = 0; r <= 5; r++) {
//                 if (r === start) {
//                     while (r <= end) {
//                         this.layout[r][column] = id;
//                         r++;
//                     }
//                 }
//                 else {
//                     if (this.layout[r][column] === id) this.layout[r][column] = 0;
//                 }
//                 console.log(r)
//                 console.log(column)
//             }
//         }
//     }
// }

// // arraysEqual(_arr1, _arr2) {
// //     if (
// //         !Array.isArray(_arr1)
// //         || !Array.isArray(_arr2)
// //         || _arr1.length !== _arr2.length
// //     ) {
// //         return false;
// //     }

// //     const arr1 = _arr1.concat().sort();
// //     const arr2 = _arr2.concat().sort();

// //     for (let i = 0; i < arr1.length; i++) {
// //         if (arr1[i] !== arr2[i]) {
// //             return false;
// //         }
// //     }

// //     return true;
// // }

// // const moves = {
// //     1: [2, 'D']
// // };

// // [0, 0, 0, 0, 0, 0],
// // [0, 0, 0, 0, 0, 0],
// // [0, 0, 0, 0, 0, 0],
// // [0, 0, 0, 0, 0, 0],
// // [0, 0, 0, 0, 0, 0],
// // [0, 0, 0, 0, 0, 0]

//     // [1, 1, 1, 2, 3, 4],
//     // [5, 0, 0, 2, 3, 4],
//     // [5, 0, 0, 6, 6, 4],
//     // [5, 0, 0, 7, 7, 7],
//     // [0, 0, 0, 8, 0, 0],
//     // [0, 0, 0, 8, 9, 9]

