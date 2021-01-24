import { reactive } from './reactive'
import { effect } from './effect'
import { computed } from './computed'
export default {
  reactive, effect, computed
}
const data = reactive({ a: [], b: 4 })

effect(() => {
  console.log(data.b);



})

data.b = 6
