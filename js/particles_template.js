const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//mouse
const mouse = {
    x: null,
    y:null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse.x, mouse.y);
})

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('a', 20, 40);
const data = ctx.getImageData(0, 0, 100, 100);
/* visualize the area*/
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 100, 100);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*30)+1;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < mouse.radius){
            this.size = 10;
        } else {
            this.size = 2;
        }
    }
}

function init(){
    particleArray = [];
    for(let i = 0; i < 500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
}

init();
console.log(particleArray);
animate();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}