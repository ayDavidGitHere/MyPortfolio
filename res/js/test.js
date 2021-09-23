
(()=>{
//return ;
var bballDir  =  (3.143/180)*180;
let chang = 1; let yo = 0;

                var dd =(
                ((bballDir>3.14*1/2 && bballDir<3.14*2/2) 
                ||(bballDir>3.14*3/2 && bballDir<3.14*2))?-1:1
                );
                console.log("bballDir: ${"+bballDir+"}: "
                +(bballDir*180/3.143)+"");
                console.log('dd: ${'+dd+'}');
                console.log("");
            bballDir = bballDir
            +(-2*bballDir+6.28)*chang
            +dd*3.143*2/4*yo;
            console.log(bballDir)
            
            
            
            
})();
            
let a = 360+45;
let m = a%360;
console.log(m)