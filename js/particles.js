const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 0;
let adjustY = 0;

//mouse
const mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove', function(event){
    let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    mouse.x = event.x;
    mouse.y = event.y - (vh*0.1);
    /* console.log("mouse coordinates", mouse.x, mouse.y); */
})

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('🕷🕸', 2, 29);
const textCoordinates = ctx.getImageData(0, 0, 170, 35);
/* visualize the area*/
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 170, 35);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*5)+1;
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
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        /* console.log(forceDirectionX, forceDirectionY); */
        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx /20;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy /20;
            }
        }
    }
}

function init(){
    particleArray = [];
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x*4)] >128){
                let spread = 15;
                let positionX = (x + adjustX) *spread;
                let positionY = (y + adjustY) *spread;
                particleArray.push(new Particle(positionX,positionY));
            }
        }
    }
    /*Random particles*/
    
    
    /* for(let i = 0; i < 500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }  */
   
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}

function connect(){
    let opacity = 1;
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a; b < particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            let minDist = 50;
            if(distance < minDist){
                let percent = distance/minDist;
                opacity = 1 - percent;
                ctx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

init();
console.log(particleArray);
animate();