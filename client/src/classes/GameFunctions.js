export class Block {
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

    reset() {
        this.initialCoordinates = [];
        this.start = null;
        this.end = null;
        this.orientation = null;
        this.length = 1;
        this.row = null;
        this.column = null;
    }
}

export class Game {
    constructor(layout) {
        this.isSolved = false;
        this.moves = 0;
        this.layout = layout;
        this.blocks = [];
        this.verticalBlocks = [];
        this.horizontalBlocks = [];
        this.initialize(this.layout);
    }

    reset(layout) {
        this.isSolved = false;
        this.moves = 0;
        this.layout = layout;
        this.blocks = [];
        this.verticalBlocks = [];
        this.horizontalBlocks = [];
        this.initializeReset(this.layout);
    }

    initializeReset(layout) {
        this.blocks.forEach(block => {
            block.reset();
        })

        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 6; column++) {
                if (layout[row][column] === 0) continue;
                let id = layout[row][column];
                this.resetBlockPosition(row, column, id);
            }
        }
        this.defineOrientations();
        
        return;
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
        const block = new Block(row, column, id);
        this.blocks.push(block);
        return;
    }

    resetBlockPosition(row, column, id) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].id === id) {
                this.blocks[i].add(row, column);
                return;
            }
        }
        
        return;
    }

    defineOrientations() {
        this.blocks.forEach(block => {
            if (block.initialCoordinates[0][0] === block.initialCoordinates[block.length - 1][0]) {
                block.orientation = 'h';
                block.row = block.initialCoordinates[0][0];
                block.start = block.initialCoordinates[0][1];
                block.end = block.initialCoordinates[block.length - 1][1];
                this.horizontalBlocks.push(block);
            } else {
                block.orientation = 'v';
                block.column = block.initialCoordinates[0][1];
                block.start = block.initialCoordinates[0][0];
                block.end = block.initialCoordinates[block.length - 1][0];
                this.horizontalBlocks.push(block);
            }
        });
        return;
    }

    positiveMove(block) {
        if (block.orientation === 'v') {
            for (let row = block.end + 1; row <= 5; row++) { //1
                if (this.layout[row][block.column] > 0) { //2
                    block.end = row - 1;
                    block.start = block.end - (block.length - 1);
                    this.updateLayout();
                    return;
                }
            }
            block.end = 5;
            block.start = block.end - (block.length - 1);
            this.updateLayout();
        }
        else if (block.orientation === 'h') {
            for (let column = block.end + 1; column <= 5; column++) {
                if (this.layout[block.row][column] > 0) {
                    block.end = column - 1;
                    block.start = block.end - (block.length - 1);
                    this.updateLayout();
                    return;
                }
            }
            if (block.row === 2) {
                block.end = 7;
                block.start = 6;
                this.isSolved = true;
            }
            else {
                block.end = 5;
                block.start = block.end - (block.length - 1);
            }
            this.updateLayout();
        }
        return;
    }

    negativeMove(block) {
        if (block.orientation === 'v') {
            for (let row = block.start - 1; row >= 0; row--) { //1
                if (this.layout[row][block.column] > 0) { //2
                    block.start = row + 1;
                    block.end = block.start + (block.length - 1);
                    this.updateLayout();
                    return;
                }
            }
            block.start = 0;
            block.end = block.start + (block.length - 1);
            this.updateLayout();
        }
        else if (block.orientation === 'h') {
            for (let column = block.start - 1; column >= 0; column--) { //1
                if (this.layout[block.row][column] > 0) { //2
                    block.start = column + 1;
                    block.end = block.start + (block.length - 1);
                    this.updateLayout();
                    return;
                }
            }
            block.start = 0;
            block.end = block.start + (block.length - 1);
            this.updateLayout();
        }
        return;
    }

    updateLayout() {
        this.moves++;
        let oldLayout = this.layout.slice();

        this.layout.forEach(row => {
            row.forEach((column, i) => {
                row[i] = 0;
            })
        })
        this.blocks.forEach(block => {
            if (block.orientation === 'h') {
                for (let column = block.start; column <= block.end; column++) {
                    this.layout[block.row][column] = block.id;
                }
            }
            else if (block.orientation === 'v') {
                for (let row = block.start; row <= block.end; row++) {
                    this.layout[row][block.column] = block.id;
                }
            }
        })

        return this.arraysEqual(oldLayout, this.layout);
        
        
    }
    
    arraysEqual(_arr1, _arr2) {
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