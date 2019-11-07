let allPositions = [];
let redPegs = [];
let bluePegs = [];
let player = 'red';

class Positions {
     
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = null;
    }
}

class Pegs {
    constructor(position, color) {
        this.x = position.x;
        this.y = position.y;
        this.color = color;
    }
}
