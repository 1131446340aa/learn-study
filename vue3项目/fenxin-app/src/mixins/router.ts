// import { reactive, } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
// import controllMessage from './controllMessage'

// export default function controllRoute() {
//   const routeState = reactive({
//     router: useRouter(),
//     route: useRoute(),
//     userInfo: JSON.parse(localStorage.blogUserInfo),
//   })
//   const toWrite = () => {
//     toLogin()
//     if (routeState.userInfo.error === 0) {
//       routeState.router.push('/write')
//     } 
//   }
//   const toLogin = (isShowMessage=true) => { 
//     if (routeState.userInfo.error === 10005) {
//          isShowMessage || controllMessage.changeVisible("请先登陆", 1000)
//           routeState.router.push("/login")
//           return
//         }
//   }
//   const toSearch = (inputValue:string,searchRef) => {
//            if (inputValue) {
//           routeState.router.push({
//             path: "/search",
//             query: { keyWord: inputValue },
//           })
//           if (location.pathname === "/search") {
//             setTimeout(() => {
//               location.reload()
//             })
//           }
//           inputValue = ""
//           searchRef.value.setNativeInputValue("")
//         } else {
//           controllMessage.changeVisible("请输入搜索内容", 1000)
//         }
//   }
//   return {
//     routeState,toWrite,toLogin,toSearch
//   }
// }



