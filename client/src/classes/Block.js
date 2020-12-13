export class Block {
    constructor(x, y, id, isMainBlock) {
        this.length = 1;
        this.position = [[x, y]];
        this.orientation = null;
        this.id = id;
        this.isMainBlock = isMainBlock;
    }

    grow(x, y) {
        if (this.length === 1) {
            if (this.position[0][0] === x) this.orientation = "vertical";
            else this.orientation = "horizontal";
        }
        this.position.push([x, y]);
        this.length++;
    }
}

export class Game {
    constructor() {
        this.blocks = [];
    }

    addLayout(x, y, id, isMainBlock) {
        let found = false;
        for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].id === id && found === false) {
                this.blocks[i].grow(x, y);
                found = true;
                break;
            }
        }
        if (found === false) {
            this.addBlock(x, y, id, isMainBlock);
        }
    }

    addBlock(x, y, id, isMainBlock) {
        const block = new Block(x, y, id, isMainBlock);
        this.blocks.push(block);
    }
}

// const layout = [[
//     [1,1,1,2,3,4],
//     [5,0,0,2,3,4],
//     [5,0,0,6,6,4],
//     [5,0,0,7,7,7],
//     [0,0,0,8,0,0],
//     [0,0,0,8,9,9]
// ], 6];

export function CreateBlocks(layout, game) {
    const grid = layout[0];
    const mainBlock = layout[1];
    let isMainBlock;

    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
            if (grid[y][x] === 0) continue;
            if (grid[y][x] === mainBlock) isMainBlock = true;
            else isMainBlock = false;
            game.addLayout(x, y, grid[y][x], isMainBlock);
        }
    }
    return;
}
