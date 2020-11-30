Function.prototype.myBind = function(target,...args){
    let bindFn =function(){}
    let _this = this
    let boundFn = function(...bindArgs){
        return _this.myCall(this instanceof boundFn? this :target,...args.concat(bindArgs) )
    }
    bindFn.prototype = this.prototype
    boundFn.prototype = new bindFn
    return boundFn
}        

Function.prototype.myCall =function(target,...args){
    target.fn = this
    target.fn(...args)
       delete target.fn
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

