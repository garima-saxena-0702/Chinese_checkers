const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "brown";
const radius = 18;
const distance = 40;
const noOfRows = 13;
const rowDivsion = Math.floor(13/2);

function createCircles(x, y, rad, fillColor = null) {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2*Math.PI);
    if(!fillColor)
    ctx.stroke();
    else{
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawCircles() {
    for(var i = 0; i < rowDivsion+2; i++){
        for(var j = 0; j < i; j++) {
            allPositions.push(new Positions(canvas.width/2 + (distance * (j-i)) + (distance/2 * i), distance * (i)))
            createCircles(canvas.width/2 + (distance * (j-i)) + (distance/2 * i), distance * (i), radius);
        }
    }
    for(var k = 0; k < rowDivsion; k++) {
        for(var j = rowDivsion; j > k; j--) {
            allPositions.push(new Positions(canvas.width/2 + (distance * (k-j)) + (distance/2 * (rowDivsion-k)), distance * (i)))
            createCircles(canvas.width/2 + (distance * (k-j)) + (distance/2 * (rowDivsion-k)), distance * (i), radius);
        }
        i++;
    }
    console.log(allPositions);
}

function drawPegs() {
    for(let i = 0; i < 10; i++) {
        redPegs.push(new Pegs(allPositions[i], 'red'));
        allPositions[i].color = 'red';
        bluePegs.push(new Pegs(allPositions[48-i], 'blue'));
        allPositions[48-i].color = 'blue';
        createCircles(allPositions[i].x, allPositions[i].y, radius -1, 'red');
        createCircles(allPositions[48-i].x, allPositions[48-i].y, radius -1, 'blue');
    }
}


drawCircles();
drawPegs();
