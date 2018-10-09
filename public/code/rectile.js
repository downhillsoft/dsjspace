
///////////////////////////
///RECTILE CORE 20181008///
///////////////////////////

var Rectile = (function(){
//(function Rectile(){
    return {
            rExer: rExer,
            rPser: rPser,
          eXecute : function(code,place){
                    var o = rPser(code,place);
                    return rExer(o);
                   }
            };




//RECTILE INNER FUNCTIONS  rExer , rPser

function rExer(mot){

var out = [];

var dummyparent = {};
dummyparent.args = [0,0,0,0,0,0,0];
mot.parent[0] = dummyparent; 

innerExer(mot);

function innerExer(mot,cnum){

    //arect(mot.args[1]*1,mot.args[2]*1,mot.args[3]*1,mot);
    //enable clone, a clone can not have children

    //if (mot.args[0]=="B"){
    if (mot.args[0].charAt(0) == "B") {
    arect(mot.args[1]*1,mot.args[2]*1,mot.args[3]*1,mot);
    }else if (mot.args[0].slice(0,2)=="CL"){
        var howmany = mot.args[0].slice(2);
        if (howmany != "0"){
        var cloneParent = mot.parent[0];
        var stop= "stop";
        var myclone = cloneParent.children[cnum];
        myclone.args[0] = "CL" + ( (howmany*1) - 1 );
        var stop = "stop";
        cloneParent.children[cnum]= myclone;
        //console.log("adding child");
        //mot.children.push(cloneParent);
        mot = cloneParent;
        arect(mot.args[1]*1,mot.args[2]*1,mot.args[3]*1,mot);
        }
    }

 for (var c = 0; c < mot.children.length; c++){
    innerExer(mot.children[c],c);
    }

        function arect(w,h,grade,mot){

            lecs = mot.parent[0].args[5];
            lwai = mot.parent[0].args[6];
            lwid = mot.parent[0].args[1] * 1;
            lhei = mot.parent[0].args[2] * 1;

            var cnt = 0;
            myx = [];
            myy = [];
            
            for ( h1 = 0 ; h1 < lhei ; h1++ ){
                myx[cnt] = lecs + lwid;
                myy[cnt] = lwai + h1;
                cnt = cnt + 1;
            }
            for ( h2 = 0 ; h2 < lwid + w ; h2++ ){
                myx[cnt] = lecs + lwid - h2;
                myy[cnt] = lwai + lhei;
                cnt = cnt + 1;
            }
            for ( h3 = 0 ; h3 < lhei + h ; h3++ ){
                myx[cnt] = lecs - w;
                myy[cnt] = lwai + lhei - h3;
                cnt = cnt + 1;
            }
            for ( h4 = 0 ; h4 < lwid + w ; h4++ ){
                myx[cnt] = lecs - w + h4;
                myy[cnt] = lwai - h;
                cnt = cnt + 1;
            }

            //finish the clock
            for ( h5 = 0 ; h5 < h ; h5++ ){
                //myx[cnt] = lecs + w;
                myx[cnt] = lecs + lwid;
                myy[cnt] = lwai - h  + h5;
                cnt = cnt + 1;
            }
            
            //minus values
            if(grade<0){
            var stop = "stop";
            //you dont need the loops below?
            //..I need the loops
                grade = grade + cnt;
            }


            //20180115
            if(myx[grade]==undefined){
                myx[grade]=0;
            }
            if(myy[grade]==undefined){
                myy[grade]=0;
            }



            //cx.fillStyle="black";
            //cx.fillRect(myx[grade],myy[grade],w,h);
            var outstring = myx[grade] + "," + myy[grade] + "," + w + "," + h + "," + mot.args[0];
            //console.log( outstring );
            mot.args.push(myx[grade]);
            mot.args.push(myy[grade]);
            out.push(outstring);
        } 
}

return out;
}






function rPser(code,place){

var onelet =function(string,which)
 {return string.slice(which-1,which);}

var starting = "yes";
var currbuf="";
var obj = {};
var rectcount = 0;
obj.args = [];
obj.children = [];
obj.mylen=0;
obj.parent = [];
var codelen = code.length;
var c = place;
    for(c; c<=codelen; c++){
       
        var let = onelet(code,c);
            if(let==">"){
                obj.args.push(currbuf);
                obj.mylen += 1;
                return obj;
            }
            else if(let == "<" && starting=="no"){
                var child = rPser(code,c);
                child.parent.push(obj);
                c = c + child.mylen - 1 //('<<' => '<')  ;
                obj.mylen = obj.mylen + child.mylen -1;
                obj.children.push(child);
            }
            else{
                starting = "no";
                if(let==","){
                obj.args.push(currbuf);
                currbuf="";
                }

                else{
                  if (let=="<"){rectcount=rectcount+1;}
                      else{    
                      currbuf = currbuf + let;
                      }
                   }
            }
         obj.mylen += 1;
    }
}


//RECTILE
})()


// ///TESTCODE///
// var code = "<BO,20,20,0,<BO,15,15,0,<BO,1,1,0>><BO,10,10,25>>";
// var code = "<BO,20,20,0,<BO,15,15,0,<BO,1,1,0>>>";
// var code = "<BO,20,20,0,<BO,15,15,0,<BO,3,3,0>><BO,10,10,0,<BO,12,12,5>>>";
//var code1 = "<BO,20,20,0>";
//var code2 = "<B,20,20,0,<B,20,20,0>>";
//var code3 = "<BO,20,20,0,<BO,10,10,0,<CL1>><CL1>>";
//var code4 = "<B123,20,20,0,<B99999,10,10,0,<B09,3,3,0>><CL2><CL1>>";
//////////////
// var out = rPser(code2,1);
// var got = rExer(out);
// var stop = "stop";
//20181002
//var code4 = "<B123,20,20,0,<B99999,10,10,0,<B09,3,3,0>><CL2><CL1>>";
//var got = Rectile.eXecute(code4,1);
//var stop = "stop";
// //////////
