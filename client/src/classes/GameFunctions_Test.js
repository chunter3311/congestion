// class Car {
//     constructor(row, column, id) {
//         this.id = id;
//         this.initialCoordinates = [[row, column]];
//         this.start = null;
//         this.end = null;
//         this.orientation = null;
//         this.length = 1;
//         this.row = null;
//         this.column = null;
//         this.moveOptions = []
//     }

//     add(row, column) {
//         this.initialCoordinates.push([row, column]);
//         this.length++;
//         return;
//     }
// }

// class Game {
//     constructor(layout) {
//         this.isSolved = false;
//         this.ids = new Set();
//         this.layout = layout;
//         this.originalLayout = [[], [], [], [], [], []];
//         this.cars = [];
//         this.validMoves = {};
//         this.moveAnalysis = [];
//         this.previousCarIndex = -1;
//         this.currentCarIndex = -1;
//         this.moves = 0;
//         this.movesList = [];
//         this.solutionMovesList = [];
//         this.initialize(this.layout);
//     }

//     initialize(layout) {
//         for (let row = 0; row < 6; row++) {
//             for (let column = 0; column < 6; column++) {
//                 this.originalLayout[row].push(layout[row][column]);
//                 if (layout[row][column] === 0) continue;
//                 let id = layout[row][column];
//                 if (this.ids.has(id)) {
//                     this.cars[this.getCarIndex(id)].add(row, column);
//                 }
//                 else {
//                     this.ids.add(id);
//                     this.cars.push(new Car(row, column, id));
//                 }
//             }
//         }
//         this.cars.forEach(car => {
//             if (car.initialCoordinates[0][0] === car.initialCoordinates[1][0]) {
//                 car.orientation = 'h';
//                 car.row = car.initialCoordinates[0][0];
//             }
//             else {
//                 car.orientation = 'v';
//                 car.column = car.initialCoordinates[0][1];
//             }
//             this.setCarEndPoints(car);
//         });
//         // this.setMoveOptions()
//         return;
//     }

//     getCarIndex(id) {
//         const carId = parseInt(id);
//         for (let i = 0; i < this.cars.length; i++) {
//             if (this.cars[i].id === carId) return i;
//         }
//     }

//     setCarEndPoints(car) {
//         if (car.orientation === 'h') {
//             car.start = car.initialCoordinates[0][1];
//             car.end = car.initialCoordinates[car.length - 1][1];
//         }
//         else {
//             car.start = car.initialCoordinates[0][0];
//             car.end = car.initialCoordinates[car.length - 1][0];
//         }
//         return;
//     }

//     positiveMove(car) {
//         let unitsMoved = 0;
//         if (car.orientation === 'v') {
//             for (let row = car.end + 1; row <= 5 && this.layout[row][car.column] === 0; row++) {
//                 unitsMoved++;
//                 this.layout[row][car.column] = car.id;
//                 this.layout[row - car.length][car.column] = 0;
//             }
//             if (!unitsMoved) return false;
//             const oldStart = car.start;
//             const oldEnd = car.end;
//             car.start += unitsMoved;
//             car.end += unitsMoved;
//             // this.updateMoveOptions_VerticalPositive(car.column, oldStart, oldEnd, car.start, car.end);
//         }
//         else if (car.orientation === 'h') {
//             for (let column = car.end + 1; column <= 5 && this.layout[car.row][column] === 0; column++) {
//                 unitsMoved++;
//                 this.layout[car.row][column] = car.id;
//                 this.layout[car.row][column - car.length] = 0;
//             }
//             if (!unitsMoved) return false;
//             car.start += unitsMoved;
//             car.end += unitsMoved;
//             if (car.row === 2 && car.end === 5) {
//                 car.start += 2;
//                 car.end += 2;
//                 this.isSolved = true;
//             }
//         }
//         // this.updateMoveOptions(car);

//         return true;
//     }

//     negativeMove(car) {
//         let unitsMoved = 0;
//         // console.log(car);
//         if (car.orientation === 'v') {
//             for (let row = car.start - 1; row >= 0 && this.layout[row][car.column] === 0; row--) {
//                 unitsMoved++;
//                 this.layout[row][car.column] = car.id;
//                 this.layout[row + car.length][car.column] = 0;
//             }
//             if (!unitsMoved) return false;
//             car.start -= unitsMoved;
//             car.end -= unitsMoved;
//         }
//         else if (car.orientation === 'h') {
//             for (let column = car.start - 1; column >= 0 && this.layout[car.row][column] === 0; column--) {
//                 unitsMoved++;
//                 this.layout[car.row][column] = car.id;
//                 this.layout[car.row][column + car.length] = 0;
//             }
//             if (!unitsMoved) return false;
//             car.start -= unitsMoved;
//             car.end -= unitsMoved;
//         }
//         return true;
//     }

//     reset() {
//         for (let row = 0; row < 6; row++) {
//             for (let column = 0; column < 6; column++) {
//                 this.layout[row][column] = this.originalLayout[row][column];
//             }
//         }
//         this.cars.forEach(car => {
//             this.setCarEndPoints(car);
//         });

//         this.previousCarIndex = -1;
//         this.currentCarIndex = -1;
//         this.moves = 0;
//         this.movesList = [];
//         this.isSolved = false;
//     }

//     getSolution() {
//         let UICount = 1;
//         let firstMoveOnSolved = {};
//         for (let attempt = 1; attempt <= 1000000; attempt++) {
//             if (UICount === 100000) {
//                 UICount = 0;
//                 console.log(`${attempt / 1000000 * 100}% complete...`);
//             }
//             UICount++;
//             this.reset();
//             let firstMove = '';
//             for (let moveCount = 1; moveCount <= 800; moveCount++) {
//                 // console.log(`Beginning Move ${moveCount} (of  attempt ${attempt})`);
//                 // console.log(`(best solution so far: ${this.solutionMovesList.length})`)
//                 // console.log('----------------------');
//                 const move = this.getMove();
//                 const car = move[0];
//                 const direction = move[1];
//                 if (moveCount === 1) firstMove = `${car.id}${direction}`;
//                 // console.log(`moving car ${car.id} in ${direction} direction`)
//                 if (direction === 'U' || direction === 'L') this.negativeMove(car);
//                 else this.positiveMove(car);
//                 this.movesList.push([`${car.id}`, `${direction}`])
//                 this.previousCarIndex = this.currentCarIndex;
//                 this.moves++;
//                 // this.setMoveOptions();

//                 if (this.solutionMovesList.length === 0) {
//                     if (this.isSolved) {
//                         this.solutionMovesList = this.movesList.slice(0);
//                         console.log(`the first solution was found on attempt ${attempt}/3000000 (${this.solutionMovesList.length} moves)`);
//                         // firstMoveOnSolved.push([...firstMove]);
//                         if (firstMoveOnSolved[firstMove]) firstMoveOnSolved[firstMove]++;
//                         else firstMoveOnSolved[firstMove] = 1;
//                     }
//                 }
//                 else {
//                     if (this.moves >= this.solutionMovesList.length) break;
//                     else if (this.isSolved) {
//                         this.solutionMovesList = this.movesList.slice(0);
//                         console.log(`a better solution was found on attempt ${attempt}/3000000 (${this.solutionMovesList.length} moves)`);
//                         if (firstMoveOnSolved[firstMove]) firstMoveOnSolved[firstMove]++;
//                         else firstMoveOnSolved[firstMove] = 1;
//                         break;
//                     }
//                 }
//             }
//         }
//         console.log()
//         console.log(`ALL DONE`);
//         console.log('=============')
//         if (this.solutionMovesList.length === 0) console.log('no solution was found :-(');
//         else {
//             console.log(`the best found solution was ${this.solutionMovesList.length} moves:`);
//             console.log(this.solutionMovesList);
//             console.log();
//             console.log('firstMoveOnSolved:');
//             console.log(firstMoveOnSolved);
//         }
//     }

//     getMove() {
//         // this.setMoveOptions();
//         // if (this.moveAnalysis.length < this.moves) this.setMoveAnalysis();
//         // if (this.validMoves)
//         const move = [];
//         let direction = null;
//         let car = null;
//         let carIndex = null;
//         do {
//             carIndex = Math.floor(Math.random() * this.cars.length);
//             car = this.cars[carIndex];
//             direction = this.getDirection(car);
//         } while (direction === null || carIndex === this.previousCarIndex)
//         // console.log('updated carIndexes', carIndexes);

//         this.currentCarIndex = carIndex;
//         move.push(car);
//         move.push(direction);

//         return move;
//     }

//     getDirection(car) {
//         const directions = [];
//         if (car.orientation === 'v') {
//             if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) directions.push('D');
//             if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) directions.push('U');
//         }
//         else {
//             if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) directions.push('R');
//             if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) directions.push('L');
//         }
//         if (directions.length === 1) return directions[0];
//         else if (directions.length === 2) return directions[Math.floor(Math.random() * 2)];
//         else return null;
//     }

//     setMoveOptions() {
//         this.cars.forEach(car => {
//             const directions = [];
//             if (car.orientation === 'v') {
//                 if (car.end < 5 && this.layout[car.end + 1][car.column] === 0) directions.push('D');
//                 if (car.start > 0 && this.layout[car.start - 1][car.column] === 0) directions.push('U');
//             }
//             else {
//                 if (car.end < 5 && this.layout[car.row][car.end + 1] === 0) directions.push('R');
//                 if (car.start > 0 && this.layout[car.row][car.start - 1] === 0) directions.push('L');
//             }
//             car.moveOptions = directions.slice(0);
//             this.validMoves[car.id] = car.moveOptions;
//         })
//     }

//     // setMoveAnalysis() {

//     // }
// }

// // let moveAnalysis = {

// // }

// // const layout = [
//     // [0, 0, 0, 0, 0, 0],
//     // [0, 0, 0, 0, 0, 0],
//     // [0, 0, 0, 0, 0, 0],
//     // [0, 0, 0, 0, 0, 0],
//     // [0, 0, 0, 0, 0, 0],
//     // [0, 0, 0, 0, 0, 0],
// // ]

// // const layout = [
// //     [1, 1, 2, 3, 0, 0],
// //     [5, 6, 2, 3, 4, 4],
// //     [5, 6, 2, 7, 7, 8],
// //     [9, 9, 0, 0, 0, 8],
// //     [10, 10, 0, 0, 0, 11],
// //     [12, 12, 0, 13, 13, 11],
// // ]

// // const layout = [
// //     [1, 0, 0, 0, 0, 0],
// //     [1, 2, 2, 3, 0, 0],
// //     [4, 4, 5, 3, 6, 7],
// //     [8, 8, 5, 9, 6, 7],
// //     [0, 10, 11, 9, 6, 12],
// //     [0, 10, 11, 13, 13, 12]
// // ]

// // const layout = [
// //     [0, 4, 5, 5, 6, 7],
// //     [0, 4, 0, 0, 6, 7],
// //     [0, 1, 1, 2, 0, 0],
// //     [3, 3, 0, 2, 0, 0],
// //     [8, 9, 10, 11, 11, 11],
// //     [8, 9, 10, 12, 12, 12]
// // ]

// // const layout = [
// //     [0, 1, 1, 1, 2, 0],
// //     [0, 3, 3, 3, 2, 4],
// //     [0, 5, 5, 6, 2, 4],
// //     [7, 8, 8, 6, 0, 4],
// //     [7, 0, 9, 10, 11, 11],
// //     [0, 0, 9, 10, 12, 12]
// // ]



// // const layout = [
// //     [1, 0, 2, 3, 3, 3],
// //     [1, 0, 2, 4, 0, 0],
// //     [1, 5, 5, 4, 6, 7],
// //     [8, 8, 8, 9, 6, 7],
// //     [0, 0, 0, 9, 6, 7],
// //     [10, 10, 0, 0, 0, 0]
// // ]

// // const layout = [
// //     [0, 0, 0, 1, 1, 1],
// //     [0, 0, 0, 2, 0, 0],
// //     [0, 3, 3, 2, 4, 5],
// //     [6, 7, 7, 7, 4, 5],
// //     [6, 0, 8, 9, 4, 5],
// //     [6, 0, 8, 9, 10, 10],
// // ]





// // the best found solution was 25 moves:
// // [
// //   [ '9', 'D' ], [ '10', 'R' ],
// //   [ '8', 'R' ], [ '1', 'D' ],
// //   [ '7', 'D' ], [ '6', 'D' ],
// //   [ '5', 'L' ], [ '2', 'D' ],
// //   [ '7', 'U' ], [ '3', 'L' ],
// //   [ '7', 'U' ], [ '4', 'U' ],
// //   [ '6', 'U' ], [ '8', 'R' ],
// //   [ '2', 'D' ], [ '5', 'R' ],
// //   [ '1', 'U' ], [ '10', 'L' ],
// //   [ '5', 'L' ], [ '2', 'D' ],
// //   [ '1', 'D' ], [ '8', 'L' ],
// //   [ '6', 'D' ], [ '7', 'D' ],
// //   [ '5', 'R' ]
// // ]

// // [
// //     [ '6', 'U' ], [ '9', 'D' ],
// //     [ '8', 'R' ], [ '10', 'R' ],
// //     [ '7', 'U' ], [ '1', 'D' ],
// //     [ '5', 'L' ], [ '2', 'D' ],
// //     [ '6', 'D' ], [ '3', 'L' ],
// //     [ '6', 'U' ], [ '4', 'U' ],
// //     [ '7', 'U' ], [ '8', 'R' ],
// //     [ '2', 'D' ], [ '5', 'R' ],
// //     [ '1', 'U' ], [ '10', 'L' ],
// //     [ '1', 'D' ], [ '5', 'L' ],
// //     [ '2', 'D' ], [ '8', 'L' ],
// //     [ '6', 'D' ], [ '7', 'D' ],
// //     [ '5', 'R' ]
// //   ]

// // the first solution was found on attempt 47/3000000 (61 moves)
// // a better solution was found on attempt 897/3000000 (57 moves)
// // a better solution was found on attempt 1709/3000000 (42 moves)
// // a better solution was found on attempt 4389/3000000 (41 moves)
// // a better solution was found on attempt 5235/3000000 (37 moves)
// // a better solution was found on attempt 6544/3000000 (36 moves)
// // a better solution was found on attempt 10735/3000000 (32 moves)
// // a better solution was found on attempt 79710/3000000 (28 moves)
// // a better solution was found on attempt 318313/3000000 (23 moves)

// // ALL DONE
// // =============
// // the best found solution was 23 moves:
// // [
// //   [ '9', 'D' ],  [ '8', 'R' ],
// //   [ '10', 'R' ], [ '1', 'D' ],
// //   [ '5', 'L' ],  [ '2', 'D' ],
// //   [ '7', 'U' ],  [ '3', 'L' ],
// //   [ '6', 'U' ],  [ '7', 'U' ],
// //   [ '8', 'R' ],  [ '4', 'U' ],
// //   [ '2', 'D' ],  [ '5', 'R' ],
// //   [ '1', 'U' ],  [ '10', 'L' ],
// //   [ '1', 'D' ],  [ '2', 'D' ],
// //   [ '8', 'L' ],  [ '6', 'D' ],
// //   [ '7', 'D' ],  [ '1', 'U' ],
// //   [ '5', 'R' ]
// // ]

// // the first solution was found on attempt 48/3000000 (72 moves)
// // a better solution was found on attempt 218/3000000 (55 moves)
// // a better solution was found on attempt 225/3000000 (50 moves)
// // a better solution was found on attempt 2352/3000000 (44 moves)
// // a better solution was found on attempt 7095/3000000 (37 moves)
// // a better solution was found on attempt 10710/3000000 (30 moves)
// // a better solution was found on attempt 82808/3000000 (28 moves)
// // a better solution was found on attempt 231422/3000000 (26 moves)
// // a better solution was found on attempt 595490/3000000 (24 moves)
// // a better solution was found on attempt 3375180/3000000 (23 moves)
// // a better solution was found on attempt 5873981/3000000 (22 moves)

// // ALL DONE
// // =============
// // the best found solution was 22 moves:
// // [
// //   [ '9', 'D' ],  [ '8', 'R' ],
// //   [ '10', 'R' ], [ '1', 'D' ],
// //   [ '5', 'L' ],  [ '2', 'D' ],
// //   [ '6', 'D' ],  [ '3', 'L' ],
// //   [ '4', 'U' ],  [ '7', 'U' ],
// //   [ '6', 'U' ],  [ '8', 'R' ],
// //   [ '2', 'D' ],  [ '5', 'R' ],
// //   [ '1', 'U' ],  [ '10', 'L' ],
// //   [ '2', 'D' ],  [ '8', 'L' ],
// //   [ '5', 'L' ],  [ '7', 'D' ],
// //   [ '6', 'D' ],  [ '5', 'R' ]
// // ]

// // [
// //     [ '6', 'D' ],  [ '9', 'D' ],
// //     [ '10', 'R' ], [ '8', 'R' ],
// //     [ '1', 'D' ],  [ '5', 'L' ],
// //     [ '2', 'D' ],  [ '3', 'L' ],
// //     [ '4', 'U' ],  [ '6', 'U' ],
// //     [ '7', 'U' ],  [ '8', 'R' ],
// //     [ '2', 'D' ],  [ '5', 'R' ],
// //     [ '1', 'U' ],  [ '10', 'L' ],
// //     [ '2', 'D' ],  [ '8', 'L' ],
// //     [ '1', 'D' ],  [ '6', 'D' ],
// //     [ '7', 'D' ],  [ '5', 'R' ]
// //   ]