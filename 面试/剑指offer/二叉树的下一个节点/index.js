 function GetNext(pNode) {
     if (!pNode) return null
     if (pNode.right) {
         pNode = pNode.right
         while (pNode.left) {
             pNode = pNode.left
         }
         return pNode
     }
     while (pNode.parent) {
         if (pNode === pNode.parent.left) {
             return pNode.parent
         }
         pNode = pNode.parent
     }
     return null
 }