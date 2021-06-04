//Assingment 2, Breif 2 (Dynamic Visual Identity)
//Title: Elsewhere by Jim Hall
//Author: Monique Sinclair n9961496
//Song Credit:‘Elsewhere’ by Jim Hall available at https://freemusicarchive.org/music/jim-hall/synth-kid-elsewhere/elsewhere under a Creative Commons Attribution 4.0. Full terms at https://creativecommons.org/licenses/by/4.0/
//Inspiration: https://towardsdatascience.com/bringing-songs-to-life-through-music-visualization-8beee9573b7b

//This sketch analysis the bass, mid, and treble of the audio, to create an interactive audio visual experience. The shapes and colours are different to each analysation of the audio. The shapes move in accordince to this as well. The interactivity of the sketch is when the mouse is moved, it changes the quantity (and thus pattern of the shapes). The colours are neon to reflect the audio genre. Clicking the screen pauses the audio, and clicking 's' will save an image of the canvas (please note, you can only save it after clicking the screen, but as often as you want afterwards).

let pieces;
let radius;
let fft;
let mapMouseX;
let mapMouseY;
let song;
let font;

//Upload Audio
function preload() {
  song = loadSound("assets/Jim Hall - Elsewhere.mp3");
  font = loadFont("assets/Benguiat Bold.ttf");
}

//Setting Up Canvas
function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);

  //Setting Up Audio and Audio Loop
  fft = new p5.FFT();
  song.loop();
}

//Pause and Play Function Via Clicking the Mouse on the Canvas
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  background(0, 0, 17);

  //Analysing the Audio and Returns the Amount of Volume at a     //Specific Frequency
  fft.analyze();
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy(100, 150);
  mid = fft.getEnergy("mid");

  //Song Title
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  textSize(15);
  tint(255, 128);
  tint(20);
  fill(0, 0, 100);
  noStroke();
  text("elsewhere", width / 2, height / 2.15);

  //Artist Name
  textFont(font);
  noFill();
  strokeWeight(1);
  stroke("white");
  textSize(20);
  text("Jim Hall", width / 2, height / 1.95);

  //Adding the Interactive Elements via the Mouse, So When the User //Moves their Mouse, it Effects the Audio Visual Presentation
  mapMouseX = map(mouseX, 0, width, 2, 0.1);
  mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

  pieces = mapMouseX;
  radius = mapMouseY;

  mapScaleX = map(mouseX, 0, width, 1, 0);
  mapScaleY = map(mouseY, 0, height, 0, 1);

  //Places the Bass, Mid, and Treble on the Screen, and Effects the  //Shapes with the Analysed Audio
  //Bass
  mapbass = map(bass, 0, 255, -100, 800);
  scalebass = map(bass, 0, 255, 0.5, 1.2);
  //Mid
  mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
  scaleMid = map(mid, 0, 255, 1, 1.5);
  //Treble
  mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
  scaleTreble = map(treble, 0, 255, 1, 1.5);

  //Puts the Audio Visualiser in the Middle of the Canvas
  translate(width / 2, height / 2);

  //For Loop, Which Controls the Amount of Shapes that are Drawn
  for (i = 0; i < pieces; i += 0.01) {
    rotate(TWO_PI / pieces);

    //Draws BASS Audio Visuals Via Lines
    push();
    strokeWeight(1);
    stroke(333, 93, 90);
    scale(scalebass);
    rotate(frameCount * -0.5);
    line(mapbass, radius / 2, radius, radius);
    line(-mapbass, -radius / 2, radius, radius);
    pop();

    //Draws MID Audio Visuals Via Circles
    push();
    strokeWeight(1);
    noFill();
    stroke(276, 91, 90);
    circle(mapMid, radius, radius * 2);
    pop();

    //Draws TREBLE Audio Visuals Via Triangles
    push();
    stroke(194, 85, 90);
    noFill();
    scale(scaleTreble);
    triangle(mapTreble, radius / 2, radius, radius, radius / 2, mapTreble);
    pop();
  }
}

//Save Canvas as an PNG File
function keyPressed() {
  if (key == "s") {
    save("Elsewhere Audio Visual.png");
  }
}
