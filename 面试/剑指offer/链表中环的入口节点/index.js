function EntryNodeOfLoop(pNode) {
    let slow = pNode.next
    let fast = slow.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (fast === slow) {
            let head = pNode
            while (head !== fast) {
                head = head.next
                fast = fast.next.next
            }
            return head
        }
    }
    return null
}