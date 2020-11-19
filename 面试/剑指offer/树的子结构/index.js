function HasSubtree(tree1, tree2) {
    let res = false
    if (!tree2 || !tree1) return false
    if (tree2.val === tree1.val) {
        res = doesTree1HasTree2(tree1, tree2)
    }
    if (!res) {
        res = HasSubtree(tree1.left, tree2)
    }
    res || (res = HasSubtree(tree1.right, tree2))
    return res

}

function doesTree1HasTree2(tree1, tree2) {
    if (!tree2) return true
    if (!tree1) return false
    if (tree2.val !== tree1.val) return false
    return doesTree1HasTree2(tree1.left, tree2.left) && doesTree1HasTree2(tree1.right, tree2.right)

}