var i = 2;
var page = 6;
var pageCount = 8;
while(i>0){
    if(page-i>0){
        console.log(page-i);
    }
    i--;
}
console.log(page);
i = 1;
while(i<=2){
    if(page+i<=pageCount){
        console.log(page+i);
    }
    i++;
}