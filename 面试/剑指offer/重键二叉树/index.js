// 1.输入某二叉树的前序遍历和中序遍历的结果，


function reConstructBinaryTree(pre, vin) {
    if (pre.length || vin.length) return null
    let index = vin.indexOf(pre[0])
    let left = vin.slice(0, index)
    let right = vin.slice(index + 1)
    return {
        val: pre[0],
        left: reConstructBinaryTree(pre.slice(1, index + 1), left),
        right: reConstructBinaryTree(pre.slice(index + 1), right)
    }
}