 <!DOCTYPE html>
 <head><head>

 <body>
<div>
<input type="text" style="width:300px"/>
<button onclick="runrect()">run</button>
</div>
 <canvas height="300" width="300" background="grey"></canvas>
 <script>
 var cx = document.querySelector("canvas").getContext('2d');
cx.fillStyle="lightgrey";		
cx.fillRect(0,0,300,300);


function runrect(){
var box = document.querySelector("input");
console.log(box.value);
var code = box.value;
var out = rPser(code,1);
var got = rExer(out);
simpledrawer(got);
}

function simpledrawer(arr){

// 		var cx = document.querySelector("canvas").getContext('2d');		
// 		cx.fillStyle="lightgrey";		
// 		cx.fillRect(0,0,300,300);
//      var somestring = "20,10,1,1";
//      console.log(somestring.split(",")[0]); 

 var cx=document.querySelector("canvas").getContext("2d");

 for (var i = 0; i<arr.length;i++){
    cx.fillRect(
      arr[i].split(",")[0]
     ,arr[i].split(",")[1]
     ,arr[i].split(",")[2]
     ,arr[i].split(",")[3]
    );
 }
}




///////////////
///RECT CORE///
///////////////

///TESTS///
//var code = "<BO,20,20,0,<BO,15,15,0,<BO,1,1,0>><BO,10,10,25>>";
//var code = "<BO,20,20,0,<BO,15,15,0,<BO,1,1,0>>>";
//var code = "<BO,20,20,0,<BO,15,15,0,<BO,3,3,0>><BO,10,10,0,<BO,12,12,5>>>";
//var out = rPser(code,1);
//var got = rExer(out);
//var stop = "stop";
//console.log(stop);
//////////

function rExer(mot){

var out = [];

var dummyparent = {};
dummyparent.args = [0,0,0,0,0,0,0];
mot.parent[0] = dummyparent; 

innerExer(mot);

function innerExer(mot){

    arect(mot.args[1]*1,mot.args[2]*1,mot.args[3]*1,mot);

 for (var c = 0; c < mot.children.length; c++){
    innerExer(mot.children[c]);
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

            //cx.fillStyle="black";
            //cx.fillRect(myx[grade],myy[grade],w,h);
            var outstring = myx[grade] + "," + myy[grade] + "," + w + "," + h ;
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

		

  </script>
  </body>
  </html>