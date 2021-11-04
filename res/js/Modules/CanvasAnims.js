    
    
export function LoadIntro(){
    var introAnimBlock = DOMHelp._("#intro-anim-block");
    introAnimBlock.style = "width: 70%; height: 100px; background: transparent;";
    
    
    var a = document.createElement("canvas");
    var b = a.getContext("2d");
    var container = introAnimBlock;
    /*
    * old and bad backgrounder
    * pro-- good performance
    * con-- picks wrong background
    */
    /*
    container.prepend(a);
    if(canvasStyle.fillContainer){    
        CDraw.setCanvasStyle(a, {
            type: "background", alpha: 0, position: "absolute", pinToTop: true
        });
    }
    */
    
    
    
    /**
     * New backgrounder, uses backgroundImage
     * pro-- correct background
     * con-- bad -performance
     */
    a.width = container.scrollWidth;
    a.height = container.scrollHeight;
    let PlayInContainer = function(){
        container.style.backgroundImage = "url("+a.toDataURL()+")";
        requestAnimationFrame(PlayInContainer);
    }//EO PlayInContainer
    PlayInContainer();
    
    
    
    let CW = a.width;
    let CH = a.height;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_transparent");
    scene.add(bgRect);
    let r1 = new CDraw.rect(CH/2, CH/4, 0, CH, "_transparent");
    let r2 = new CDraw.rect(CW, CW/1.5, CH/1.6, CH/4, "_transparent");
    scene.add(r2); scene.add(r1);
    let tA = 
    new CDraw.text("bold *+40pt headerboldf","A",CW/2, CH/2,"_white",CW/1.1);
    
    let rObjs = [];
    let rKeys = [];
    for(let i=0; CW>i; i=i+CW/20){
        let rObj = new CDraw.rect(i, CW/20+1, CH-0, 0, "_#111112");
        scene.add(rObj);
        rObjs.push(rObj);
        let rSpeedY = 2+(Math.floor(Math.random()*5));
        rKeys.push(
        [200+rSpeedY*2, function(){
            rObj.breadthY += 1*(rSpeedY);
            rObj.y = CH-rObj.breadthY;
            return (rObj.breadthY<CH);
        }]
        );
    };//EO for
    scene.add(tA);
    
    
    
    
    
    let keyIndex = 0;
    let keyFrames =
    [
        [0, function(){
            tA.color = "black";
            tA.value = "AY";
        }],
        [20, function(){
            r2.autoStyle.set("_crimson");
            if(r2.x>CW/2-r2.lengthX/2) r2.x -= 1*6;
            if(r2.y>CH/2-r2.breadthY/2) r2.y -= 1*30;
            r2.lengthX -= 1*6/3;
            return (r2.lengthX>r2.breadthY);
        }],
        [30, function(){
            r1.autoStyle.set("1_white");
            r1.x = CW/2-r1.lengthX/2;
            if(r1.y<CH/2-r1.breadthY/2) r1.y += 1*6;
            r1.breadthY -= 1*6/6;
            
            return (r1.breadthY>r1.lengthX);
        }],
        [20, function(){
            tA.value = "DAVID";
        }],
        [40, function(){
            tA.value = "AYDAVID"
        }],
        [50, function(){
            tA.color = "white";
        }],
        [60, function(){
            tA.autoStyle.set("1_white");
        }],
        [70, function(){
            tA.autoStyle.set("1_black");
        }],
        [80, function(){
            tA.autoStyle.set("_black");
        }],
        [100, function(){
            r1.rotation.rad += 0.2;
            r1.rotation.about = r1.center;
            r2.rotation.rad += 0.1;
            r2.rotation.about = r2.center;
            
            return true
        }],
        [120, function(){
            tA.color = "crimson";
            r2.autoStyle.set("1_white");
            r1.autoStyle.set("_black");
        }],
        [150, function(){
            r1.color = "crimson"
            r1.lengthX += 1*6; r1.x -= 1*6/2
            r1.breadthY += 1*6; r1.y -= 1*6/2
            return (r1.lengthX<CW*5);
        }],
        
        
        
        
        ...rKeys,
        /*
        // Loop
        [100, function(){
        for(let i=0; keyFrames.length>i; i++){
            var keyArg = keyFrames[i];
            keyArg[0] += 100;
            
        }//EO for
        }],
        */
        
        
        
    ];
        
        
    let count = 0;
    let loopV = 0;
    let Animate = function(){
        
        for(let i=0; keyFrames.length>i; i++){
            var keyArg = keyFrames[i];
            
            if(count>=keyArg[0]){
            if(keyArg[2]===undefined || keyArg[2]===null){
                var cont = keyArg[1]();
                if(cont!=undefined && cont!=null) keyArg[2] = cont;
                else keyArg[2] = false;
            }
            if(keyArg[2]){ 
                keyArg[2] = keyArg[1]();
            }
            }
            
        }//EO for
        
        
        
        count++;
        requestAnimationFrame(Animate);
    }
    Animate();
    
    
    
    
    
}