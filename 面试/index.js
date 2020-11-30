Function.prototype.bind1 = function(context,...args){
    
    var self = this;
  
    let fNop = function(){};
    let fBound =  function(...bindArgs){ 
       
        return self.apply(this instanceof fBound ? this:context ,args.concat(bindArgs)); 
    }
    fNop.prototpye = this.prototype; 
    fBound.prototype = new fNop();
    return fBound;
}

function test(){
    console.log(this.a)
}
let obj1 ={
    a:4
}

let obj2 ={
    a:3
}
test.bind1(obj1).bind1(obj2)()