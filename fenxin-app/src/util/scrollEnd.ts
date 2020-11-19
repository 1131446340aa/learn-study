  export default function ScrollBottom(x:Function ){
    function __getScrollTop(){
  　　    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　    if(document.body){bodyScrollTop = document.body.scrollTop;}
  　　    if(document.documentElement){documentScrollTop = document.documentElement.scrollTop;}
  　　    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　    return scrollTop;
    }
    function __getWindowHeight(){
  　　    var windowHeight = 0;
  　　    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
  　　    }else{
  　　　　    windowHeight = document.body.clientHeight;
  　　    }
  　　    return windowHeight;
    }
    function __getScrollHeight(){
  　　    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　    if(document.body){bodyScrollHeight = document.body.scrollHeight;}
  　　    if(document.documentElement){documentScrollHeight = document.documentElement.scrollHeight;}
  　　    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　    return scrollHeight;
    }
    let handleScroll= function () {
        if(__getScrollTop() + __getWindowHeight() == __getScrollHeight())
        doFun(x)
    }
    window.addEventListener('scroll', handleScroll) 
    return handleScroll
    
  }
  
function doFun(x: Function) { setTimeout(x) }
  