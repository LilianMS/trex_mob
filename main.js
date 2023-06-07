//variáveis globais
var tRex_mg, tRex, Edges, ground, ground_mg, cloud, pontuacao = 0, tRexC;
var ob1, ob2, ob3, ob4, ob5, ob6;
var grupoOb
var ceu
var gO_mg
var gO
var restart_mg
var restart
//variáveis para guardar os sons
var jump_sound, score_sound, over_sound;
var ground2;

//variáveis contantes
const PLAY = 1;
const END = 0;

var gameState = PLAY;

//carregar os arquivos
function preload(){
   tRex_mg = loadAnimation("trex1.png","trex3.png","trex4.png")
   //ground_mg = loadImage("ground1.png")
   ground_mg = loadImage( "ground2.png")
   cloud = loadImage("cloud.png")
   ob1 = loadImage("obstacle1.png")
   ob2 = loadImage("obstacle2.png")
   ob3 = loadImage("obstacle3.png")
   ob4 = loadImage("obstacle4.png")
   ob5 = loadImage("obstacle5.png")
   ob6 = loadImage("obstacle6.png")
   tRexC = loadAnimation("trex_collided.png")
   gO_mg = loadImage("gameOver.png")
   restart_mg = loadImage("restart.png")
   jump_sound = loadSound("jump.mp3");
   score_sound = loadSound("checkpoint.mp3");
   over_sound = loadSound("die.mp3");
}

//criando sprites e suas propriedades
function setup(){
   createCanvas(windowWidth,windowHeight);
   tRex = createSprite(80,height-100,20,50)
   tRex.addAnimation("run",tRex_mg)
   tRex.scale = 0.5
   Edges = createEdgeSprites();
   ground = createSprite(300,height-50,600,30)
   ground.addImage(ground_mg)
   grupoOb = new Group()
   ceu = new Group()
   tRex.addAnimation("acabou",tRexC)
   //tRex.debug = true
   tRex.setCollider("circle",0,0,50)
   gO = createSprite(width/2,height/2)
   gO.addImage(gO_mg)
   restart = createSprite(width/2,height/2 + 50)
   restart.addImage(restart_mg)
   restart.scale = 0.5

   ground2 = createSprite(300,height-30,600,30);
   ground2.visible = false;
}

function draw(){
   background("white");
   textFont("Arial Black")
   textAlign("center");

   drawSprites();     
   text("PONTUAÇÃO: " +   pontuacao, 500,20);
   
   //tRex.collide(Edges[3])

   if(ground.x < 0){
      ground.x = ground.width/2
   }

   //tRex.collide(Edges[3])
   tRex.collide(ground2);
   
   //estados de jogo
   if(gameState == PLAY){
      if(pontuacao > 0 && pontuacao % 100 === 0){
         score_sound.play();
      }

      gO.visible = false
      restart.visible = false
      pontuacao += Math.round(frameRate()/60)
      ground.velocityX = -2;
      //gravidade
      tRex.velocityY += 0.5 

      if((keyDown("up") || keyDown("space") || touches.length > 0) && tRex.y > height - 100){
         tRex.velocityY = -10
         jump_sound.play();
         touches = []
      }
      if(ground.x < 0){
         ground.x = ground.width/2
      }
      nuvens()
      OBS()
      
      if( tRex.isTouching(grupoOb)){
         gameState = END;
         gO.visible = true
         restart.visible = true
         over_sound.play();
      }

   }else if(gameState == END){
      tRex.changeAnimation("acabou",tRexC);
      ground.velocityX = 0;
      grupoOb.setVelocityXEach(0)
      ceu.setVelocityXEach(0)
      tRex.velocityY = 0
      ceu.setLifetimeEach(-1) 
      grupoOb.setLifetimeEach(-1) 
      //gO.visible = true
      //restart.visible = true
      if(mousePressedOver(restart)){
         reset()
      }

   }
}//fim do draw


function nuvens(){
  if(frameCount %20 == 0){
      var nuvem = createSprite(width,Math.round(random(0,(3*height/4))))
      nuvem.velocityX = -4
      nuvem.addImage(cloud)
      nuvem.scale = 0.8
      nuvem.depth = tRex.depth - 1
      

      nuvem.lifetime = width/4
      ceu.add(nuvem)
   }
}

function OBS(){
   if(frameCount %80 == 0){
      var obstaculo = createSprite(width,height - 70)

      obstaculo.velocityX = -(6 + pontuacao/100)
      obstaculo.addImage(ob1)
      obstaculo.scale = 0.8
      obstaculo.depth = tRex.depth - 1
      obstaculo.lifetime = width/2

      var NumAL = Math.round(random(1,6))
      switch(NumAL){
         case 1:
         obstaculo.addImage(ob1)
         break
         case 2:
         obstaculo.addImage(ob2)
         break
         case 3:
         obstaculo.addImage(ob3)
         break
         case 4:
         obstaculo.addImage(ob4)
         break
         case 5:
         obstaculo.addImage(ob5)
         break
         case 6:
         obstaculo.addImage(ob6)
         obstaculo.debug = 1
         obstaculo.setCollider("rectangle",0,0,width/5,80)

         break
         default:
         break
      }//switch

      grupoOb.add(obstaculo)

   }//if
}//OBS


function reset(){
   gameState = PLAY
   grupoOb.destroyEach()
   ceu.destroyEach()
   tRex.changeAnimation("run")
   pontuacao = 0
}















