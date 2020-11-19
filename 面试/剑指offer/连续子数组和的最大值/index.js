 function NumberOf1Between1AndNSolution2(arr) {

     let res = 0
     let max = 0
     for (let i = arr.length - 1; i >= 0; i--) {
         res += arr[i]
         max = res > max ? res : max
         if (res <= 0) {
             res = 0
         }
     }

     return max
 }

 console.log(NumberOf1Between1AndNSolution2([-6, -3, -2, -7, -15, -1, -2, -2]));