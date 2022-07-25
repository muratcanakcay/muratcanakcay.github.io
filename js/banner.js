var viewport_width = document.documentElement.clientWidth;
var new_viewport_width = viewport_width;

var c = document.getElementById("graphBanner");    
c.width = viewport_width >= 1010 ? 1000 : viewport_width*0.9;
c.height = c.width / 10 

var ctx = c.getContext("2d");
var x = 0;
const r = c.width/1000 * 2;
var id;
let circles = [[925, 10], [870, 40], [140, 80], [170, 60], [239, 10], [290, 80], [310, 40], [450, 15], [600, 70], [670, 35], [710, 25], [740, 60], [902, 73], [811, 14], [122, 67], [192, 54], [201, 2], [298, 27], [343, 7], [403, 75], [587, 52], [632, 19], [711, 12], [725, 43]]
var steps = [[0.35,0.3], [-0.25,0.4], [0.3,-0.5], [-0.15,0.3], [-0.2,-0.4], [0.5,-0.2], [-0.35,0.1], [0.2,-0.4], [0.55,0.2], [-0.45,0.1], [-0.3,-0.1], [0.22,0.1], [0.52,-0.2], [-0.32,0.1], [0.22,-0.4], [0.52,0.2], [0.21,0.1], [0.31,0.3], [-0.22,0.4],[-0.41,0.1], [-0.37,-0.1], [0.31,-0.5], [-0.12,0.3], [-0.27,-0.4]];
let start = 0;

drawBanner();
    
function drawBanner() {
    animate();
}

function animate(timestamp) { 
    const elapsed = timestamp - start;
    if (elapsed > 30) {
        start = timestamp;
        tick();
    }
    requestAnimationFrame(animate); 
}

function tick() {
    if (new_viewport_width !== viewport_width) {   
        viewport_width = new_viewport_width;
        c.width = viewport_width >= 1010 ? 1000 : viewport_width*0.9;
        c.height = c.width / 10 
    }
    
    ctx.fillStyle = "#0000ff";        
    ctx.textAlign = "center";

    if (viewport_width > 900) {ctx.font = "bold 55px Sans-serif";}
    else if (viewport_width > 650) {ctx.font = "bold 45px Sans-serif";}
    else if (viewport_width > 500) {ctx.font = "bold 35px Sans-serif";}
    else if (viewport_width > 400) {ctx.font = "bold 30px Sans-serif";}
    else if (viewport_width > 340) {ctx.font = "bold 25px Sans-serif";}
    else {ctx.font = "bold 20px Sans-serif";}
    
    ctx.clearRect(0, 0, c.width, c.height);
    // var img = document.getElementById("metalic-bg");
    // ctx.drawImage(img, 0, 0, c.width, c.height)
    
    for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i+1; j < circles.length; j++) {
            var d = distanceBetween(circles[i], circles[j]);
            if (d >= c.width/8.5) continue;
            var color = lineColor(d);
            ctx.strokeStyle = `rgb(${color},${color},${color})`;                
            ctx.beginPath();
            ctx.moveTo(circles[i][0], circles[i][1]);
            ctx.lineTo(circles[j][0], circles[j][1]);
            ctx.stroke();
            ctx.closePath();
        }
    }
    
    ctx.strokeStyle = "#ffffff";
    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c[0], c[1], r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    })

    ctx.fillText( document.getElementById("banner-text").value, c.width/2, 5*c.height/7);
    ctx.strokeStyle = "#333333";
    ctx.strokeText(document.getElementById("banner-text").value, c.width/2, 5*c.height/7);                
        
    for (let i = 0; i < circles.length; i++) {
        const t = 20;
        circles[i][0] += steps[i][0] * c.width/1000;
        circles[i][1] += steps[i][1] * c.width/1000;
        if (circles[i][0] > c.width + t) { circles[i][0] = -t; }
        if (circles[i][0] < -t) { circles[i][0] = c.width + t; }
        if (circles[i][1] > c.height + t) { circles[i][1] = -t; }
        if (circles[i][1] < -t) { circles[i][1] = c.height + t; }
    }
}

function distanceBetween(p1, p2) {
    return Math.sqrt(((p1[0] - p2[0]) * (p1[0] - p2[0])) + ((p1[1] - p2[1]) * (p1[1] - p2[1])));
}

function lineColor (d) {
    return Math.min(280-(d*2940/c.width), 255);
}

window.addEventListener('resize', function() {
    new_viewport_width = document.documentElement.clientWidth;        
    clearInterval(id);
    drawBanner();
});