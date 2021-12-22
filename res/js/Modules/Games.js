    
    
export function LoadStackGame(){
    if(window.screen.width>700){console.log(":( Game is not yet available for desktop screens!"); return; }
    let play_but = document.createElement("div");
    play_but.innerHTML = "<div id='play-but-circle'></div>"
    let container = DOMHelp._("#techstacks-container");
    
    
    let contrMenu = document.createElement("div");
    contrMenu.setAttribute("id", "game-contrmenu");
    contrMenu.innerHTML = ""
    +"<div class='roundbut' id='stacksbreaker-playbut'>"
    +"  <img src='res/img/pause.png'/>"
    +"</div>"
    +"<div class='roundbut' id='contrmenu-cancelbut' hidden>"
    +"  <img src='res/img/cancel.png'/>"
    +"</div>"
    ;
    container.append(contrMenu);
    let contrMenuProps = {style: contrMenu.style,}
    
    
    let cancelButton = DOMHelp._("#contrmenu-cancelbut");
    cancelButton.onclick = ()=>{
        GAME.Reset();
    }
    var startObj = null;
    let playButton = DOMHelp._("#stacksbreaker-playbut");
    playButton.onclick = ()=>{
        if(!GAME.active) startObj = new GAME.Start();
        else{
            if(!GAME.PLAYING){
                GAME.PLAYING = true; 
                startObj.animate();
            }
            else if(GAME.PLAYING){GAME.PLAYING = false;}
        }//EO else.
    }
    
    
    
    
    let stacks = null;
    let stacksContainer = DOMHelp._("story-block showcase stacks");
    let gameContainer = DOMHelp._("game-container");
    let gameContainerUnPlay = 
    {HTML: gameContainer.innerHTML, style: gameContainer.style};
    let bboard = null; let bball = null; let doom = null;
    var N = (v)=>{return Number(v.replace("px", ""));}
    var ToRad = (v)=>{return (Math.PI/180)*v; };
    var ToDeg = (v)=>{return v/(Math.PI/180); };
    var Bound = (x, a, b)=>{ return(x>a && x<b);}
    var GAME = 
    {
    active: false, 
    PLAYING: false,
    Reset: ()=>{
        GAME.active = false;
        GAME.PLAYING = false;
        document.body.style.overflow = "scroll";
        contrMenu.style = contrMenuProps.style;
        cancelButton.setAttribute("hidden", "")
        gameContainer.innerHTML = gameContainerUnPlay.HTML;
        gameContainer.style = gameContainerUnPlay.style;
    },
    Start: function(){
        GAME.Reset();
        GAME.active = true;
        GAME.PLAYING = true;
        document.body.style.overflow = "hidden";
        contrMenu.style.bottom = "1rem";
        contrMenu.style.position = "fixed";
        cancelButton.removeAttribute("hidden", "")
        gameContainer.innerHTML 
        += ""
        +"<bball > </bball>"
        +"<bboard> </bboard>"
        +"<doom  > </doom>";
        gameContainer.style.height = "300px";
        gameContainer.style.borderStyle = "solid";
        
        
        stacks = DOMHelp._(".story-block.showcase li", "this");
        [... stacks].map((stack, ind)=>{
            stack.name = "stack_"+stack.innerText;
            stack.type = "stack";
            stack.strength = 4-stack.getAttribute("str");//MHelp.randOpt(1,2,3);
            stack.style.backgroundColor = "black";
            stack.style.borderStyle = "solid";
            stack.style.boxSizing = "content-box";
            stack.style.borderWidth = "0.6px";
            stack.style.borderColor = 
            ["#338844", "#883344", "#334488"][stack.strength-1]; 
            stack.style.color = "white";
            stack.style.position = "absolute";
            stack.style.display = "inline-block";
            stack.style.opacity = 1;
            stack.style.top = "0px";
            stack.style.left = (30+Math.random()*30)+"px";
            stack.style.fontSize = "10px";
            stack.style.padding = "0.1rem";
            stack.style.paddingInline = "0rem"
            stack.style.marginLeft = "0px";
            stack.style.marginRight = (30+Math.random()*30)+"px"
            stack.spaceW = 
            N(stack.style.left)+stack.clientWidth+N(stack.style.marginRight);
            
            let lastStack = stacks[ind-1];
            if(lastStack!=undefined){
                stack.style.marginRight = (30+Math.random()*30)+"px"
                stack.style.left = lastStack.spaceW+"px";
                stack.style.top = (N(lastStack.style.top))+"px";
                stack.spaceW = 
                N(stack.style.left)+stack.clientWidth
                +N(stack.style.marginRight);
                if(stack.spaceW>gameContainer.clientWidth){
                    stack.style.left = (30+Math.random()*30)+"px";
                    stack.style.top = 
                    N(stack.style.top)+lastStack.clientHeight+"px";
                    stack.spaceW = 
                    N(stack.style.left)+stack.clientWidth
                    +N(stack.style.marginRight);
                }
                
            }
            //console.log(stack.innerText, stack.clientWidth,", ",stack.clientHeight, stack.spaceW)
        });
        
        
        bboard = DOMHelp._("bboard");
        bball = DOMHelp._("bball");
        doom = DOMHelp._("doom");
        
        bboard.name = "bboard";
        bboard.type = "bboard";
        bboard.style.top = 
        //(gameContainer.clientHeight/2)+"px";
        (gameContainer.clientHeight
        -bboard.clientHeight-bball.clientWidth*2)+"px";
        bboard.style.left = 
        (gameContainer.clientWidth/2- bboard.clientWidth/2)+"px";
        
        bball.style.top = 
        //(gameContainer.clientHeight-bball.clientHeight*2)+"px";
        gameContainer.clientHeight/2+"px";
        (N(bboard.style.top)-bboard.clientHeight*1.5)+"px";
        bball.style.left = 
        (gameContainer.clientWidth/2-bball.clientWidth/2)+"px";
        

        doom.style.top = (gameContainer.clientHeight-doom.clientHeight)+"px";
        doom.style.left = "0px";
        doom.name = "doom";
        doom.type = "doom"
        
        
        
        
        //Cont
        let posList 
        = [{x: window.clientWidth, y: window.clientHeight,},];
        let add = 0;
        window.ontouchmove = function(e){
        if(N(bboard.style.left)+bboard.clientWidth<gameContainer.clientWidth
        &&N(bboard.style.left)>gameContainer.clientLeft){
            posList.push({x:e.touches[0].pageX, y:e.touches[0].pageY});
            let plLength = posList.length;
            add = (posList[plLength-1].x>=posList[plLength-2].x?1:-1);
            bboard.style.left = (N(bboard.style.left)+add*5)+"px";
        }
        else{bboard.style.left = (N(bboard.style.left)-add*5)+"px";}
        }//EO ontouchmove
        
        
        
        
        
        
        let Console = {
        KillingStack: function(obs){
            //killingStack;
            if(obs.type==="stack"){
                obs.style.opacity = 
                (Number(obs.style.opacity)-obs.strength/10);
            }
        },
        EndBall: function(obs){
            if(obs.name==="doom"){
                console.log("dooom")
                GAME.active = false;
            }
        },
        }
        
        
        
        let time = 0;
        let bballSpeed = 5; 
        let bballDir = (Math.PI/180)*Math.floor(Math.random()*180);
        function getBound(obs){
            let std = (obs.type==="stack"?8:0);
            //For some reason stacks needs 16px padding.
            let ang = 
            (N(bball.style.left)+bball.clientWidth- (N(obs.style.left)+std*2))
            /(obs.clientWidth+bball.clientWidth);
            let bog = 
            (N(bball.style.top )+bball.clientHeight- N(obs.style.top))
            /(obs.clientHeight+bball.clientHeight);
            let inX = false; let inY = false;
            if(ang>=0 && ang<=1){
                inX = true;
                //console.log( "ang", ang);
            }
            if(bog>=0 && bog<=1){
                inY = true;
                //console.log("bog", bog)
            } 
            if(inX&&inY){
                bballDir = (bog>1/2?3.143-ang*3.143:ang*3.143);
                bballDir += 3.143*(bog<1/2?1:0);
                Console.KillingStack(obs);
                Console.EndBall(obs)
            }
        }
        function contain(l, t, w, h){
            let chang = 0; let yo = 0;
            if(l<=0) { chang = 0;  yo = 1; }
            if(t<=0) { chang = 1;  yo = 0; }
            if(l>=w) { chang = 0;  yo = 1; }
            if(t>=h) { chang = 1;  yo = 0; }
            
            bballDir = ToDeg(bballDir);
            let del = Math.floor(bballDir/180)*2;
            if(chang==1||yo==1){
            bballDir =
             (180+180*(del)- bballDir)*yo
            +(360- bballDir)*chang;
            }
            bballDir = ToRad(bballDir);
            
        }
        
        
        let animate = ()=>{
            time++;
            //playButton.innerText = (bballDir*180/3.143)+""
            let bballSpeedX = Math.cos(bballDir)*bballSpeed;
            let bballSpeedY = Math.sin(bballDir)*bballSpeed;
            
            bball.style.top = (N(bball.style.top)+bballSpeedY)+"px";
            bball.style.left = (N(bball.style.left)+bballSpeedX)+"px";
            
            contain(
                N(bball.style.left),
                N(bball.style.top),
                gameContainer.clientWidth-bball.clientWidth,
                gameContainer.clientHeight-bball.clientHeight,
            )
            getBound(bboard);
            [...stacks].map((stack)=>{
                //console.log(stack.innerText, stack.clientWidth)
                if(Number(stack.style.opacity)>=0.01) getBound(stack);
            });
            getBound(doom);
            
            
            
            
            
            
            if(GAME.PLAYING && GAME.active) requestAnimationFrame(animate);
        }
        animate();
        this.animate = animate;
        
    },
    }//EO GAME;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
