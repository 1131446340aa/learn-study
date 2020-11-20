import { reactive } from 'vue'
let store = reactive({
  isShowUserSelect:false
})
function hiddenSelect() {
  store.isShowUserSelect = false
}
function showSelect() {
  store.isShowUserSelect = true
}
export default {
store,hiddenSelect,showSelect
}