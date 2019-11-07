let marked = {x: null, y: null, color: null, index: null};
let allowedPlaces = [];

function calculateAlllowedPlaces() {
    allowedPlaces = allPositions;
    return allowedPlaces;
}

function isEmptyObject(obj) {
    if(Object.entries(obj).length === 0 && obj.constructor === Object) return true
    return false
}

function checkWin(playerColor) {
    let i, max;
    if(playerColor == 'blue') {
        i = 0;
        max = 10;
    }
    else {
        i = 39;
        max = 49;
    }
    for(; i < max; i++) {
        if(allPositions[i].color !== playerColor) return false; 
    }
    let winCanvas = document.getElementById('winCanvas')
    winCanvas.innerHTML = playerColor
    canvas.style.display = 'none';
    return true;
}

canvas.addEventListener('click', (event) => {
    x = event.clientX - canvas.offsetLeft;
    y= event.clientY - canvas.offsetTop;
    for(let i = 0; i < allPositions.length; i++) {
        if((allPositions[i].x - radius < x && allPositions[i].x + radius > x) && (allPositions[i].y - radius < y && allPositions[i].y + radius > y)) {
            if(allPositions[i].color && allPositions[i].color == player) {
                createCircles(allPositions[i].x, allPositions[i].y, radius-1, 'rgba(0,255,0,1)');
                createCircles(allPositions[i].x, allPositions[i].y, radius-5, allPositions[i].color);
                if(marked.color){
                    createCircles(marked.x, marked.y, radius-1, marked.color);  
                } 
                marked.x = allPositions[i].x;
                marked.y = allPositions[i].y;
                marked.color = allPositions[i].color;
                marked.index = i;
                calculateAlllowedPlaces();
            }
            else {
                if(allowedPlaces.filter(place => {return place.x == allPositions[i].x && place.y == allPositions[i].y}).length && !isEmptyObject(marked)) {
                    createCircles(marked.x, marked.y, radius-1, 'white');
                    createCircles(allPositions[i].x, allPositions[i].y, radius-1, marked.color)
                    allPositions[i].color = marked.color;
                    allPositions[marked.index].color = null;
                    checkWin(player);
                    marked = {};
                    player = player == 'red' ? 'blue' : 'red';
                }
            }
        }
    }  
})
