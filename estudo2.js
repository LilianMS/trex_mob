 //// OBJETOS

 var bola = {
    x:50,
    y:50,
    r:20,
    cor:["blue","purple","red","yellow"],
    vx:0,
    vy:0,
 }


 bola.r = 50



function setup(){
    createCanvas(500,500);
}

bola.vx = 2


 function draw(){
    background("white")




    fill(bola.cor[Math.round(random(0,3))])
    circle(bola.x,bola.y,bola.r)
    //ellipse(bola.x,bola.y+50,bola.r,60)

     
    bola.x += bola.vx

    if(bola.x > 475 || bola.x < 25){
        bola.vx *= -1
    }



 }



