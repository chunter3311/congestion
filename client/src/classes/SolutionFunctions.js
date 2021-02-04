export function SolvePuzzle(game) {
    // const previousCarIndex = game.getCarIndex(game.previousCarId);
    const carIndex = getRandomCarIndex(game);
    const directionNumb = getRandomDirection();
    const car = game.cars[carIndex];
    let direction = '';
    if (car.orientation === 'h') {
        if (directionNumb === 1) direction = 'L';
        else if (directionNumb === 2) direction = 'R';
    }
    else {
        if (directionNumb === 1) direction = 'U';
        else if (directionNumb === 2) direction = 'D';
    }
    const move = [`${car.id}`, `${direction}`]
    return move;
}

function getRandomCarIndex(game) {
    const length = game.cars.length;
    let carIndex;
    if (game.previousCarId === null) {
        carIndex = Math.floor(Math.random() * length);
    }
    else {
        const previousCarIndex = game.getCarIndex(game.previousCarId);
        do {
            carIndex = Math.floor(Math.random() * length);
            // console.log(carIndex)
            console.log(previousCarIndex)
        } while(carIndex !== previousCarIndex)
    }
    return carIndex;
}

function getRandomDirection() {
    const min = Math.ceil(1);
    const max = Math.floor(3);
    return Math.floor(Math.random() * (max - min) + min);
}