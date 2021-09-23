import ScrollEffects from './Modules/ScrollEffects.js';
export function Main(){
    
    let nav_text_main = document.getElementById("nav-text-main");
    let nav_text_sub = document.getElementById("nav-text-sub");
    
    ScrollEffects.LogReadPoint(function(element, label, index){
        nav_text_sub.innerText = label;
        if(nav_text_sub.className.indexOf("showcase")!=null){
        if(element.style.transform != "rotate(0deg)")
        element.style.transform = "rotate(0deg)";
        }
    });
    
    
    
    let play_but = document.createElement("div");
    play_but.innerHTML = "<div id='play-but-circle'></div>"
    
    let inline_game_text = 
    [...document.getElementsByTagName("inline-game-text")][0];
    inline_game_text.style.textTransform = "uppercase";
    
    

    function LoadStackGame(){
        let container = DOMHelp._("#techstacks-container");
        let playButton = document.createElement("div");
        playButton.setAttribute("id", "stacks-playbut");
        playButton.style.color = "white";
        container.append(playButton);
        playButton.onclick = ()=>{
            if(!GAME.active) Play();
            else Reset();
        }
        
        
        
        let stacks = null;
        let stacksContainer = DOMHelp._("story-block showcase stacks");
        let gameContainer = DOMHelp._("game-container");
        let gameContainerUnPlay = 
        {HTML: gameContainer.innerHTML, style: gameContainer.style}
        let bboard = null; let bball = null;
        var N = (v)=>{return Number(v.replace("px", ""));}
        var Bound = (x, a, b)=>{ return(x>a && x<b);}
        var GAME = {active: false, }
        
        function Reset(){
            GAME.active = false;
            gameContainer.innerHTML = gameContainerUnPlay.HTML;
            gameContainer.style = gameContainerUnPlay.style;
            document.body.style.overflow = "scroll";
        }
        function Play(){
            Reset();
            GAME.active = true;
            document.body.style.overflow = "hidden";
            gameContainer.innerHTML 
            += ""
            +"<bball > </bball>"
            +"<bboard> </bboard>";
            gameContainer.style.height = "200px";
            gameContainer.style.backgroundColor = "white";
            
            
            
            stacks = DOMHelp._(".story-block.showcase li", "this");
            [... stacks].map((stack, ind)=>{
                stack.style.position = "absolute";
                stack.style.top = "0px";
                stack.style.left = "0px";
                let lastStack = stacks[ind-1];
                if(lastStack!=undefined){
                    stack.style.left = 
                    (N(lastStack.style.left)+lastStack.clientWidth)+"px";
                    stack.style.top =
                    (N(lastStack.style.top))+"px";
                    if(N(stack.style.left)+stack.clientWidth
                    >gameContainer.clientWidth){
                        stack.style.left = "0px";
                        stack.style.top = 
                        N(stack.style.top)+lastStack.clientHeight+"px";
                    }
                    
                }
                console.log(stack.innerText, stack.clientWidth,", ",stack.clientHeight)
            });
            
            
            bboard = DOMHelp._("bboard");
            bball = DOMHelp._("bball");
            
            bboard.style.top = 
            (gameContainer.clientHeight-bboard.clientHeight-bball.clientWidth*2)+"px"
            bboard.style.left = 
            (gameContainer.clientWidth/2- bboard.clientWidth/2)+"px";
            
            bball.style.top = gameContainer.clientHeight/2+"px";
            (N(bboard.style.top)-bboard.clientHeight*1.1)+"px";
            bball.style.left = 
            (gameContainer.clientWidth/2-bball.clientWidth/2)+"px";
            console.log(bboard.style.top, bball.style.top);
            
                
            let posList 
            = [{x: window.clientWidth, y: window.clientHeight,},];
            let add = 0;
            window.ontouchmove = function(e){
            if(
            N(bboard.style.left)+bboard.clientWidth<gameContainer.clientWidth
            &&
            N(bboard.style.left)>gameContainer.clientLeft
            ){
                posList.push({x:e.touches[0].pageX, y:e.touches[0].pageY});
                let plLength = posList.length;
                add = (posList[plLength-1].x>=posList[plLength-2].x?1:-1);
                bboard.style.left = (N(bboard.style.left)+add*5)+"px";
            }
            else{bboard.style.left = (N(bboard.style.left)-add*7)+"px";}
            }//EO ontouchmove
            
            
            
            
            let time = 0;
            let bballSpeed = 2; 
            let bballDir = (3.143/180)*(23);//Math.floor(Math.random()*180);
            function getBound(obs){
                let ang = 
                (N(bball.style.left)+bball.clientWidth- N(obs.style.left))
                /(obs.clientWidth+bball.clientWidth);
                let bog = 
                (N(bball.style.top )+bball.clientHeight- N(obs.style.top ))
                /(obs.clientHeight+bball.clientHeight);
                let inX = false; let inY = false;
                if(ang>=0 && ang<=1){
                    inX = true;
                    //console.log( "ang", ang);
                }
                if(bog>=0 && bog<=1){
                    inY = true
                    //console.log("bog", bog)
                }
                if(inX&&inY){
                    bballDir = ang*3.143;
                    /*ang = 2-ang*2;
                    bballDir *= (0+ang);//+1.57);
                    */
                    bballDir += 3.143;
                    //console.log(ang, bog)
                }
                //console.log(obs.innerText, "w", obs.clientWidth, "h", obs.clientHeight, "$");
            }
            function contain(l, t, w, h){
                let chang = 0; let yo = 0;
                if(l<=0) { chang = 0;  yo = 1; }
                if(t<=0) { chang = 1;  yo = 0; }
                if(l>=w) { chang = 0;  yo = 1; }
                if(t>=h) { chang = 1;  yo = 0; }
                
                
                
                if(yo == 1 && false)
                console.log("At Time: "+time+"; bballDir: "+bballDir);
                var dd =(
                ((bballDir>3.143*1/2 && bballDir<3.143*2/2) 
                ||(bballDir>3.143*3/2 && bballDir<3.143*2))?-1:1
                )
                bballDir = bballDir
                +(-2*bballDir+6.28)*chang
                +dd*3.143*2/4*yo;
                
                
                if(yo == 1 && Bound(bballDir,1.83-0.05,1.83+0.05))
                console.log("At Time: "+time+"; bballDir: "+dd+"' "+bballDir);
                /*
                 * Some Degs are not enough for displacement e.g 
                 * "(10-24)  (170-190) (-)"
                 */
            }
            
            
            
            function animate(){
                time++;
                playButton.innerText = (bballDir*180/3.143)+""
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
                    //getBound(stack);
                });
                
                
                
                requestAnimationFrame(animate);
            }
            animate();
            
        };
        
        
        
    }
    LoadStackGame();
    
    
    
document.documentElement.style.setProperty('themecol_ter', 'dc143c88');
    
}//EO bgCanvas
