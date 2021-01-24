import { render } from './runtime@core.js'

import { vnode } from './vnode.js'
import './util/extendsType'

import vue from './reactive/index.js'
const { effect } = vue
effect(() => {
  render(vnode(), 'app')
})
