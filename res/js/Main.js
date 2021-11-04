import ScrollEffects from './Modules/ScrollEffects.js';
import * as Games from './Modules/Games.js';
import * as CanvasAnims from './Modules/CanvasAnims.js';
export function Main(){
    
    let nav_text_main = document.getElementById("nav-text-main");
    let nav_text_sub = document.getElementById("nav-text-sub");
    
    ScrollEffects.LogScrollPoint(function(element, label, index){
        nav_text_sub.innerText = label;
        if(nav_text_sub.className.indexOf("showcase")!=null){
        if(element.style.transform != "rotate(0deg)")
        element.style.transform = "rotate(0deg)";
        }
    });
    

    
    //Load Game.
    Games.LoadStackGame();
    //Load Anim.
    CanvasAnims.LoadIntro();
    
    
    document.documentElement.style.setProperty('themecol_ter', 'dc143c88');
    
}//EO bgCanvas
