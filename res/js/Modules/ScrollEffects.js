export default class ScrollEffects{
    static LogReadPoint(Callback){
    
    let read_points = [...document.querySelectorAll("[read-point]")];
    let label_last = "";
    let focused = null;
    let pageHeight = document.body.clientHeight;
    window.onscroll = function(evt){ //works
        if(read_points.length>0){
        read_points.map((read_point, read_pointInd)=>{
            let bbox = read_point.getBoundingClientRect();
            if(focused==null){   
                focused = {elem: read_point, index: read_pointInd};
            }
            else if(bbox.top<pageHeight/2 && bbox.top+bbox.width>0){
                focused = {elem: read_point, index: read_pointInd};
            }
        });//EO map
        
        
        let read_point = read_points[focused.index];
        let label = read_point.getAttribute("read-point");
        if(label != label_last){        //performance block
            Callback(read_point, label, focused.index);
            label_last = label
        }//EO if
        }
    }//EO  onscroll
    if(read_points.length<1){
        console.warn("add read_points attribute to elements.")
    }
    
    }//EO LogReadPoint
    
}//EO class