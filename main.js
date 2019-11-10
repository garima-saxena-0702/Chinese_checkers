let marked = { x: null, y: null, color: null, index: null };
let allowedPlaces = [];
let allowedPassed = [];

function findNextAdjacent(marked, space) {
    let dx = space.x - marked.x;
    let dy = space.y - marked.y;
    console.log(2)
    let jumpedPeg = allPositions[findPeg(marked.x + dx * 2, marked.y + dy * 2)];
    if (jumpedPeg && !jumpedPeg.color) {
        findNeighbour(jumpedPeg)
            .map(newSpace => {
                if (newSpace.color) {
                    if (!allowedPassed.some(peg => peg.index == jumpedPeg.index)){
                        console.log(allowedPassed.map(x=>x.index))
                        allowedPassed.push(jumpedPeg)
                        return findNextAdjacent(jumpedPeg, newSpace);
                    }
                }
                return undefined
            }).filter(x => x)
        allowedPlaces.push(jumpedPeg)
        return jumpedPeg
    }
    return undefined
}

function findNeighbour(marked) {
    return [
        findPeg(marked.x - 20, marked.y - 40),
        findPeg(marked.x + 20, marked.y - 40),
        findPeg(marked.x - 40, marked.y),
        findPeg(marked.x + 40, marked.y),
        findPeg(marked.x - 20, marked.y + 40),
        findPeg(marked.x + 20, marked.y + 40),
    ]
        .filter(x => x)
        .map(x => allPositions[x])
}

function calculateAllowedPlaces(marked) {
    //[...allowedPlaces,
    //     findPeg(marked.x - 20, marked.y - 40),
    //     findPeg(marked.x + 20, marked.y - 40),
    //     findPeg(marked.x - 40, marked.y),
    //     findPeg(marked.x + 40, marked.y),
    //     findPeg(marked.x - 20, marked.y + 40),
    //     findPeg(marked.x + 20, marked.y + 40),
    // ]
    //     .filter(x => x)
    //     .map(x => allPositions[x])
    findNeighbour(marked)
        .map(space => {
            if (space.color) {
                return findNextAdjacent(marked, space)
                // let dx = space.x - marked.x;
                // let dy = space.y - marked.y;
                // let jumpedPeg = allPositions[findPeg(marked.x + dx * 2, marked.y + dy * 2)];
                // if(jumpedPeg && !jumpedPeg.color){
                //     console.log(allowedPlaces, jumpedPeg)
                //     calculateAllowedPlaces(jumpedPeg)
                // }
                // return (jumpedPeg && jumpedPeg.color) ? undefined : jumpedPeg
            }
            if (space)
                allowedPlaces.push(space)
        }).filter(x => x)
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0
}

function checkWin(playerColor) {
    let i, max;
    if (playerColor == 'blue') {
        i = 0;
        max = 10;
    }
    else {
        i = 39;
        max = 49;
    }
    for (; i < max; i++) {
        if (allPositions[i].color !== playerColor) return false;
    }
    let winCanvas = document.getElementById('winCanvas')
    winCanvas.innerHTML = playerColor
    canvas.style.display = 'none';
    return true;
}

function findPeg(x, y) {
    for (let i = 0; i < allPositions.length; i++) {
        if ((allPositions[i].x - radius < x && allPositions[i].x + radius > x)
            && (allPositions[i].y - radius < y && allPositions[i].y + radius > y)) {
            return i;
        }
    }
    return null
}

function showSelectedPeg(index) {
    createCircles(allPositions[index].x, allPositions[index].y, radius - 1, 'rgba(0,255,0,1)');
    createCircles(allPositions[index].x, allPositions[index].y, radius - 5, allPositions[index].color);
    if (marked.color) {
        createCircles(marked.x, marked.y, radius - 1, marked.color);
        marked = {};
        clearAllowedPlaces();
        allowedPlaces = [];
    }
    else {
        marked = { ...marked, ...allPositions[index] }
    }
}

function movePegFromMarked(index) {
    clearAllowedPlaces();
    allowedPlaces = [];
    createCircles(marked.x, marked.y, radius - 1, 'white');
    createCircles(allPositions[index].x, allPositions[index].y, radius - 1, marked.color)
    allPositions[index].color = marked.color;
    allPositions[marked.index].color = null;
    checkWin(player);
    marked = {};
    player = player == 'red' ? 'blue' : 'red';
}

function colorAllowedPlaces() {
    allowedPlaces.forEach(space => {
        createCircles(space.x, space.y, radius - 1, 'rgba(0,100,100,1)');
        createCircles(space.x, space.y, radius - 5, 'white');
    })
}

function clearAllowedPlaces() {
    allowedPlaces.forEach(space => {
        createCircles(space.x, space.y, radius - 1, 'white');
    })
}

canvas.addEventListener('click', (event) => {
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
    let index = findPeg(x, y);
    if (index) {
        if (allPositions[index].color && allPositions[index].color == player) {
            showSelectedPeg(index);
            calculateAllowedPlaces(marked);
            colorAllowedPlaces()
        }
        else {
            if (allowedPlaces.some(place => {
                return place.x == allPositions[index].x && place.y == allPositions[index].y
            }) && !isEmptyObject(marked)) {
                movePegFromMarked(index);
            }
        }
    }
})
