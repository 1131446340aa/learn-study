/*
 * @Descripttion: 
 * @Date: 2020-07-24 17:44:29
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-25 18:44:49
 */ 
let p1 = new Promise(res=>{
  setTimeout(() => {
          res(3)
  }, 3000);  
})

let p2 = Promise.resolve(2)

function* genera() {
  let x =yield p1
  console.log(x);
  let y = yield 6
  console.log(y);
} 

function asyncToGenerate(genera) {
  let g = genera()
  
  function step(value) {
    let result = g.next(value)
    if (!result.done) {
       Promise.resolve(result.value).then(res => {
                step(res)    
      }) 
  }
   }     
     step()   
}
asyncToGenerate(genera)




function generate(fn){
  let g = fn()
  function step(value){
    let result = g.next(value)
    while(result.done){
      new Promise(resolve=>{
        resolve(result.value)
      }).then(res=>{
          step(res)
      })
    }
  }
  step()
}
generate(genera)