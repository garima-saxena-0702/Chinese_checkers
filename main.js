const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "brown";
const radius = 18;
const distance = 40;
const noOfRows = 13;
const rowDivsion = Math.floor(13/2);

function drawCircles() {
    for(var i = 0; i < rowDivsion+2; i++){
        for(var j = 0; j < i; j++) {
            ctx.beginPath();
            ctx.arc(canvas.width/2 + (distance * (j-i)) + (distance/2 * i), distance * (i), radius, 0, 2*Math.PI);
            allPositions.push(new Positions(canvas.width/2 + (distance * (j-i)) + (distance/2 * i), distance * (i)))
            ctx.stroke();
        }
    }
    for(var k = 0; k < rowDivsion; k++) {
        for(var j = rowDivsion; j > k; j--) {
            ctx.beginPath();
            ctx.arc(canvas.width/2 + (distance * (k-j)) + (distance/2 * (rowDivsion-k)), distance * (i), radius, 0, 2*Math.PI);
            allPositions.push(new Positions(canvas.width/2 + (distance * (k-j)) + (distance/2 * (rowDivsion-k)), distance * (i)))
            ctx.stroke();
        }
        i++;
    }
    console.log(allPositions);
}

canvas.addEventListener('click', (event) => {
    x = event.clientX - canvas.offsetLeft;
    y= event.clientY - canvas.offsetTop;
    console.log(x, y);
})

drawCircles();
