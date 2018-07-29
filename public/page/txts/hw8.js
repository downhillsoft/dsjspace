var currentcode = {};
//currentcode.workingstring="";
currentcode.executestring = function(){
var temp = currentcode.workingstring.replace(",CHILDREN","");
return temp = temp.replace("CHILDREN","");
}

currentcode.addChild = function(noden,chldstr){

    var onelet =function(string,which)
    {return string.slice(which-1,which);}

var idx = null;
var idx2 = null;

var char = "";
var tarstr = "";
var wrstr =  currentcode.workingstring;

    for (var place = 1 ; place < wrstr.length + 1; place++){
        char = onelet(wrstr,place)
        if (char == "<") {idx = idx + 1; idx2 = idx2 + 1;}
        if (char == ">") {               idx2 = idx2 - 1;}
        if (idx == noden){
                tarstr= tarstr + char;
             }
        if(char == ">" && tarstr != "" && idx2 == 0){
            var temptarstr =  tarstr.replace("CHILDREN",chldstr + "CHILDREN");
            currentcode.workingstring = wrstr.replace(tarstr,temptarstr);
            return;
        }
             
    }
}



var code1 = "<BO,1,1,1,CHILDREN>"
var code2 = "<BO,2,2,2,CHILDREN>"
var code3 = "<BO,3,3,3,CHILDREN>"

currentcode.workingstring = code1;

console.log(currentcode.workingstring);
console.log(currentcode.executestring());

currentcode.addChild(1,code2); //addChild to the root
console.log(currentcode.workingstring);
currentcode.addChild(1,code3);
console.log(currentcode.workingstring);

