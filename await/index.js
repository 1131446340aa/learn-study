/*
 * @Descripttion: 
 * @Date: 2020-07-24 17:44:29
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-25 18:44:49
 */ 
let p1 = Promise.resolve(1)

let p2 = Promise.resolve(2)

function* genera() {
  let x =yield 3
  console.log(x);
  let y = yield 6
  console.log(y);
} 

function asyncToGenerate(genera) {
  let g = genera()
  
  function step(value) {
    let result = g.next(value)
    if (!result.done) {
      new Promise(reslove => {
        reslove(result.value)
      }).then(res => {
        step(res)
      })
  }
   }
  step()
}
asyncToGenerate(genera)

