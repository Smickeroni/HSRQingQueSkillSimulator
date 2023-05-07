const getMode = (array) => {
    let max = -1;
    let result;

    array.reduce((accumulator, currentValue) => {
        accumulator.set(currentValue, (accumulator.has(currentValue) ? accumulator.get(currentValue) : 0) + 1)
        return accumulator;
    }, new Map())
        .forEach((value, key) => {
            if (value > max) {
                max = value;
                result = key;
            }
        })
    return result;
}

const getRandomInteger = async () => {
    return Math.floor(Math.random() * 3) + 1;
}

const skill = async (array) => {
    return [await getRandomInteger(),await getRandomInteger()];
}

const keep = (array, mode) => {
    const nonModeTile = (element) => element != mode;
    const index = array.findIndex(nonModeTile);
    if (index >= 0) { return index} else {return -1;}
}

const check = (array, mode) => {
    let tiles = 0;
    array.filter((element) => {
        if (element == mode) {
            tiles++;
        }
    });
    return (tiles >= 4);
}

 const simulate = async () => {
    var iterations = 0;

    // tile set vals 1-3 to signify the different mahjong tiles
    var tiles = [await getRandomInteger()];

    while (true) {
        const mode = getMode(tiles);
        for (let i = tiles.length; i >= 4; i--) {
            const index = keep(tiles,mode);
            if (index >= 0) {
                tiles.splice(index,1);
            } else { break; }
        }
        if (check(tiles,mode)) {
            break;
        }
        tiles = tiles.concat(await skill(tiles));
        iterations++;
    }
    return iterations;
}

const run = async (runs) => {
    let totalIterations = 0;
    for (let i = 0; i < runs; i++) {
        totalIterations += await simulate();
    }
   console.log("Average skill procs to reach four of a kind: " + (totalIterations/runs));
}

run(10)