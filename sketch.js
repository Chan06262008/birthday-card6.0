let envelopeOpen = false;
let flowers = [];
let messageAlpha = 0;
let particles = [];

function setup() {
    createCanvas(800, 600);
    textAlign(CENTER, CENTER);
    textSize(32);
}

function draw() {
    background(240);
    
    // Draw envelope
    if (!envelopeOpen) {
        // Envelope body
        fill(201, 42, 42);
        rect(width/2 - 200, height/2 - 100, 400, 250, 0, 0, 10, 10);
        
        // Envelope flap
        fill(231, 76, 60);
        beginShape();
        vertex(width/2 - 200, height/2 - 100);
        vertex(width/2, height/2 - 200);
        vertex(width/2 + 200, height/2 - 100);
        endShape(CLOSE);
        
        // Hint text
        fill(255);
        textSize(20);
        text("Click the envelope to open!", width/2, height/2 + 80);
    } else {
        // Opened envelope
        // Envelope body
        fill(201, 42, 42);
        rect(width/2 - 200, height/2 - 100, 400, 250, 0, 0, 10, 10);
        
        // Flap opened
        fill(231, 76, 60);
        beginShape();
        vertex(width/2 - 200, height/2 - 100);
        vertex(width/2, height/2 - 250);
        vertex(width/2 + 200, height/2 - 100);
        endShape(CLOSE);
        
        // Card
        fill(255);
        rect(width/2 - 180, height/2 - 80, 360, 210, 5);
        
        // Message
        fill(0, 0, 0, messageAlpha);
        textSize(36);
        textStyle(BOLD);
        text("Happy Birthday Jian!", width/2, height/2 - 30);
        
        // Animate message appearance
        if (messageAlpha < 255) {
            messageAlpha += 3;
        }
        
        // Draw flowers
        for (let flower of flowers) {
            drawFlower(flower.x, flower.y, flower.size, flower.color);
        }
        
        // Draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].isFinished()) {
                particles.splice(i, 1);
            }
        }
    }
}

function mousePressed() {
    if (!envelopeOpen && 
        mouseX > width/2 - 200 && 
        mouseX < width/2 + 200 && 
        mouseY > height/2 - 100 && 
        mouseY < height/2 + 150) {
        envelopeOpen = true;
        createFlowers();
        createParticles();
    }
}

function createFlowers() {
    for (let i = 0; i < 8; i++) {
        flowers.push({
            x: random(width/2 - 150, width/2 + 150),
            y: random(height/2 + 20, height/2 + 100),
            size: random(30, 50),
            color: color(random(200, 255), random(100, 200), random(100, 200))
        });
    }
}

function drawFlower(x, y, size, col) {
    // Stem
    fill(46, 204, 113);
    noStroke();
    rect(x - size/15, y, size/7.5, size * 1.5);
    
    // Petals
    fill(col);
    ellipse(x, y - size/2, size, size);
    ellipse(x - size/2, y - size/2, size, size);
    ellipse(x + size/2, y - size/2, size, size);
    ellipse(x, y - size, size, size);
    ellipse(x, y, size, size);
    
    // Center
    fill(241, 196, 15);
    ellipse(x, y - size/2, size/2, size/2);
}

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(width/2, height/2 - 150));
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1, 3));
        this.acc = createVector(0, 0.1);
        this.lifespan = 255;
        this.color = color(
            random(200, 255),
            random(100, 200),
            random(100, 200),
            this.lifespan
        );
        this.size = random(5, 15);
    }
    
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.lifespan -= 2;
        this.color.setAlpha(this.lifespan);
    }
    
    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
    isFinished() {
        return this.lifespan <= 0;
    }
}
