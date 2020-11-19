import { createRenderer,nextTick } from '@vue/runtime-core'
let canvas, ctx
const dza = (n) => {
  // console.log(890);
  return n * Math.PI / 180
}
function drawCircle(start, end, color, cx, cy, r) {
  let x = cx + Math.cos(dza(start)) * r
  let y = cy + Math.sin(dza(start)) * r
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(x, y)
  ctx.arc(cx, cy, r, dza(start), dza(end))
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}
function drawRect(x, y, start, end, height, color) {
  ctx.beginPath()
  ctx.rect(x + start, y, end - start, height)
  ctx.stroke()
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}
function draw(el) {
  
  if (el?.tag === 'circle') {
    let { data, x, y, r } = el
    let total = data.reduce((memo, current) => memo + current.count, 0)
    let start = 0, end = 0
    data.forEach(item => {
      end += item.count / total * 360
      drawCircle(start, end, item.color, x, y, r)
      start = end
    })
  }
  if (el?.tag === 'rect') {
    
    let { data, x, y, width, height } = el
    let total = data.reduce((memo, current) => memo + current.count, 0)
    let start = 0, end = 0
    data.forEach(item => {
      end += item.count / total * width
      // console.log(x);
      drawRect(x, y, start, end, height, item.color)
      start = end
    })
  }
  el?.childs && el.childs.forEach(child => {
    draw(child)
  })
}
const options = {
  insert: (child, parent, anchor) => {
    child.parent = parent
    if (!parent.childs) {
      parent.childs = [child]
    } else {
      parent.childs.push(child)
    }
    if (parent.nodeType === 1) {
      draw(child)
      if (child.onClick) {
        canvas.addEventListener('click', () => {
          child.onClick()
          
          // setTimeout(() => { console.log(child);},3000)
        })
        
      }
    }
    // console.log(child);
    // console.log(parent);
  },
  remove: child => {

  },
  createElement: (tag, isSVG, is) => {
    return { tag }
  },
  createText: text => { },
  createComment: text => { },
  setText: (node, text) => { },
  setElementText: (el, text) => { },
  parentNode: node => { },
  nextSibling: node => { },
  querySelector: selector => { },
  setScopeId(el, id) {

  },
  cloneNode(el) {

  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG) {

  },
  patchProp(el, key, prevValue, nextValue) {
    console.log(789);
    el[key] = nextValue
    
  },
  forcePatchProp() {
    console.log(123456);
  }
};
export const createCanvas = (...args) => {
  let app = createRenderer(options).createApp(...args)
  let { mount } = app
  app.mount = function (selector) {
    let el = document.querySelector(selector)
    canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    el.appendChild(canvas)
    ctx = canvas.getContext('2d')
    mount(canvas)
  }
  return app
}