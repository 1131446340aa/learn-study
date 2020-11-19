function IsBalancedSolution(root) {
    return treeDeep(root) !== -1
}

function treeDeep(root) {
    let leftDeep = treeDeep(root.left)
    if (leftDeep === -1) return false
    let rightDeep = treeDeep(root.right)
    if (rightDeep === -1) return false
    return Math.abs(leftDeep - rightDeep) > 1 ? -1 : Math.max(leftDeep, rightDeep) + 1
}