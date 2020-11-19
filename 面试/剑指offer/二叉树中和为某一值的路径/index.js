// 回溯法

function FindPath(root, expectNumber) {
    let list = []
    let listAll = []
    findPath(root, expectNumber, list, listAll)
}

function findPath(root, expectNumber, list, listAll) {
    if (!root) return listAll
    let x = expectNumber - root.val
    if (!root.left && !root.right && !x) {
        listAll.push(list)
    }
    findPath(root.left, expectNumber, list, listAll)
    findPath(root.right, expectNumber, list, listAll)
}