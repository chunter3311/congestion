const getProperValues = (puzzle) => {
    const layoutStringToArray = puzzle.layout.split("");
    const properValues = [];
    let properValue;
    for (let i = 0; i < layoutStringToArray.length; i++) {
        if (i % 2 === 0) {
            properValue = '';
            if (layoutStringToArray[i] === '0') continue;
        }
        properValue += layoutStringToArray[i];

        if (i % 2 !== 0) {
            properValues.push(parseInt(properValue));
        }
    }
    return properValues;
}

export const getLayout = (puzzle) => {
    const properValues = getProperValues(puzzle);
    const layoutArray = [[],[],[],[],[],[]];
    let column = 0;
    let row = 0;
    for (let i = 0; i < properValues.length; i++) {
        layoutArray[row].push(properValues[i]);
        column++;

        if (column === 6) {
            column = 0;
            row++;
        }
    }

    // console.log(layoutArray)
    return layoutArray;
}

// export const getLayouts = (puzzles) => {
//     puzzles.forEach((puzzle) => {
//         return [...getLayoutArray(puzzle)];
//     })
// }