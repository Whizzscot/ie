
class Player {
    constructor(color = '', regions = []){
        this.color = color;
        this.regions = regions;
    }
}

class GameObject {
    constructor(x = 0, y = 0, interactable = false){
        this.elem = document.createElement('div');
        this.elem.classList.add('game-object');
        if(interactable) this.elem.setAttribute('interactable', 'true');
        this.elem.style.gridColumnStart =
        this.elem.style.gridColumnEnd = x;
        this.elem.style.gridRowStart =
        this.elem.style.gridRowEnd = y;
        //generate unique id
        do { this.id = Math.random().toString(36).slice(2); } while(document.getElementById(this.id));
        this.elem.setAttribute('id', this.id);
    }

    moveTo(x, y){
        this.elem.style.gridColumnStart =
        this.elem.style.gridColumnEnd = x+1;
        this.elem.style.gridRowStart =
        this.elem.style.gridRowEnd = y+1;
    }

    get x(){
        return Number(this.elem.style.gridColumnStart);
    }

    get y(){
        return Number(this.elem.style.gridRowStart);
    }

    hide(){
        this.elem.hidden = true;
    }

    show(){
        this.elem.hidden = false;
    }
}

class Indicator extends GameObject{
    constructor(x, y, type){
        super(x, y, true);
        this.elem.classList.add('indicator');
        this.elem.setAttribute('type', type);
    }
}

class Region extends GameObject {
    constructor(coordinates = [], units = {}){
        super(0, 0);
        this.elem.classList.add('region');
        this.coordinates = coordinates;
        this.units = units;
        this.money = 0;
    }

    get alive(){
        this.coordinates.length > 1;
    }

    validate(){
        
    }
}

class Entity extends GameObject{
    constructor(x, y, interactable){
        super(x, y, interactable);
        this.elem.classList.add('entity');
        this.displayElem = document.createElement('div');
        this.displayElem.classList.add("entity-display");
        // this.displayElem.setAttribute('obj-id', this.id);
    }

    moveTo(x, y){
        super.moveTo(x, y);
        this.displayElem.style.left = `calc(${x}rem)`;
        this.displayElem.style.top = `calc(${y}rem)`;
    }

    // render(){
    //     let animBox = this.displayElem.getBoundingClientRect();
    //     this.img.style.left = `${animBox.x}px`;
    //     this.img.style.top = `${animBox.y}px`;
    // }
}

class Shield extends Entity{
    constructor(direction = {x:0,y:0}){
        super(0, 0, false);
        this.elem.classList.add('shield');
        this.direction = direction;
    }

    moveOut(){
        this.moveTo(this.direction.x, this.direction.y);
    }

    moveIn(){
        this.moveTo(0, 0);
    }
}

class Piece extends Entity{
    constructor(x, y, hp = 0, atk = 0, def = 0, color){
        super(x, y, true);
        this.elem.classList.add('piece');
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.color = color;
        this.shields = [];
        while(this.shields.length < 4) this.shields.push(Shield.cloneNode(true));
    }
}

class Feature extends GameObject{
    constructor(x, y, passable = false, destructable = false){
        super(x, y);
        this.elem.classList.add('feature');
        this.passable = passable;
        this.destructable = destructable;
    }
}

class Unit extends Piece{
    constructor(x, y, hp, atk, def, price, wage, color){
        super(x, y, hp, atk, def, color);
        this.elem.classList.add('unit');
        this.price = price;
        this.wage = wage;
    }
}

class Building extends Unit{
    constructor(x, y, hp, price, wage, color){
        super(x, y, hp, 0, 0, price, wage, color);
        this.elem.classList.add('building');
    }
}

function knightWageFunction(n){
    return (Math.pow(n, 3) / 2) - Math.pow(n, 2) + 2.5 * n;
}

class City extends Piece{
    constructor(x, y, color){
        super(x, y, 1, 0, 1, color);
        this.elem.classList.add('city');
        this.shields.push(Shield.cloneNode(true));
    }
}

class Knight extends Unit{
    constructor(x, y, level, color){
        super(x, y, level, level + (level > 3), level, level * 10, knightWageFunction(level), color);
        this.elem.classList.add('knight');
        this.elem.setAttribute('level', level);
        this.maxMove = 4;
    }
}

class Wall extends Building{
    constructor(x, y, level, color){
        super(x, y, level+1, level * 5, knightWageFunction(level-1));
        this.elem.classList.add('wall');
        this.elem.setAttribute('level', level);
    }
}

class Farm extends Building{
    constructor(x, y, farmNum, color){
        super(x, y, 0, 3*(4+farmNum), -5, color);
        this.elem.classList.add('farm');
    }
}

class Grave extends Feature{
    constructor(x, y){
        super(x, y, false, true);
        this.elem.classList.add('grave');
        this.overgrown = false;
    }
}

class Grass extends Feature{
    constructor(x, y){
        super(x, y, false, true);
        this.elem.classList.add('grass');
    }
}

class Board {
    constructor(w, h, players = [], tileData = ""){
        let data = [];
        while(data.length < h) data.push(new Array(w));
        this.width = w;
        this.height = h;
        this.players = players;
        this.elem = document.createElement("div");
        this.elem.classList.add("game-board");
        this.elem.style.width = `${w}rem`;
        this.elem.style.height = `${h}rem`;
    }

    checkTile(x = 0, y = 0){
        
    }
}

class Game {
    constructor(board = new Board){
        this.board = board;

    }
}