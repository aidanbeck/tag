import Theatre from './easel/Theatre.js';
import Messenger from './easel/Messenger.js'
import Texture from './easel/Texture.js';
import Velocity from './easel/Velocity.js';
import Keyboard from './easel/Keyboard.js';
import { Rectangle, Circle, Point } from './easel/Shape.js'

// API
//const messenger = new Messenger("http://0.0.0.0:8000", "ws://0.0.0.0:8000");

//messenger.addHandler("playerJoin", (data) => {
//   cars.push(data.id, 0, 0);
//});

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 400, 400);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.redraw = render;

// State
const cars = [];

class Car {
    constructor(id, x, y) {
        this.id;
        this.shape = new Circle(x, y, 8);
        this.v = new Velocity(0,0);
        this.angle = 0;
	}
}

const center = 1024/2;
cars.push(new Car(cars.length, center, center));
cars.push(new Car(cars.length, center-50, center-50));


const bg = new Texture('./media/bg.png');

function render(callAnimationFrame = false) {
    
    const player = cars[0].shape;

    const offsetX = player.x;
    const offsetY = player.y;

    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
    bg.draw(Math.floor(-offsetX), Math.floor(-offsetY), 0, ctx);

    // draw circles
    ctx.fillStyle = "blue";
    for (const car of cars) {
        ctx.beginPath();

        let x = car.shape.x;
        let y = car.shape.y;
        const r = car.shape.r;

        x -= offsetX;
        y -= offsetY;

        ctx.arc(x, y, r, 0, Math.PI * 2); 
        ctx.fill();
    }

    callAnimationFrame && requestAnimationFrame(render);
}

function physics() {

    for (const car of cars) {

        car.v.moveObject(car.shape);
        car.v.applyFriction(0.8);
    }
}

function controller() {
    const car = cars[0];

    controls.left && car.v.addVelocity({x: -1, y: 0});
    controls.right && car.v.addVelocity({x: 1, y: 0});
    controls.up && car.v.addVelocity({x: 0, y: -1});
    controls.down && car.v.addVelocity({x: 0, y: 1});
}


const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

const keyboard = new Keyboard();
keyboard.bindValue('ArrowLeft', v => controls.left = v);
keyboard.bindValue('ArrowRight', v => controls.right = v);
keyboard.bindValue('ArrowUp', v => controls.up = v);
keyboard.bindValue('ArrowDown', v => controls.down = v);

setInterval(() => {
    controller();
    physics();

//  messenger.sendMessage({
//      type: "move",
//      v: cars[0].v,
//      shape: cars[0].shape
//  })
}, 20);

render(true);

globalThis.CARS = cars;
