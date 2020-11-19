//树等广度遍历算法即可

function PrintFromTopToBottom(root) {
    let queue = []
    let res = []
    if (!root) {
        return res
    }
    queue.push(root)

    while (queue.length) {
        let pRoot = queue.shift()
        pRoot.left && queue.push(pRoot.left)
        pRoot.right && queue.push(pRoot.right)
        res.push(pRoot.val)
    }
    return res
}