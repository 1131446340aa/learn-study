function IsPopOrder(pushV, popV) {
    let flag = false
    let helpStack = []
    while (pushV.length || helpStack.length) {
        while (helpStack[helpStack.length - 1] === popV[0]) {
            helpStack.pop()
            popV.shift()
        }
        if (!popV.length) flag = true
        if (!pushV.length) break
        helpStack.push(pushV.shift())
    }
}