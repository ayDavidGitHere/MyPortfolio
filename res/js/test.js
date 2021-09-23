var bballDir  =  (3.143/180)*15;;
while (bballDir<3.143*2){
                var dd =(
                ((bballDir>3.14*1/2 && bballDir<3.14*2/2) 
                ||(bballDir>3.14*3/2 && bballDir<3.14*2))?-1:1
                );
                console.log("bballDir: ${"+bballDir+"}: "
                +(bballDir*180/3.143)+"");
                console.log('dd: ${'+dd+'}');
                console.log("");
break;
bballDir+= 3.143*2/16;
}