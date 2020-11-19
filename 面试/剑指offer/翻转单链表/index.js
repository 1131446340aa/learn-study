function reverseLink(pNode) {
    let pNext = null
    let pPre = null

    while (pNode) {
        pNext = pNode.next
        pNode.next = pPre
        pPre = pNode
        pNode = pNext
    }
    return pNode

}