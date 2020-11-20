export default function message(state= { message: "", visible: false },duratime:number) {
  state.message ="两次密码不一致！！"
  state.visible = true
  setTimeout(() => {
    state.visible = false
    state.message=""
  }, duratime)
}