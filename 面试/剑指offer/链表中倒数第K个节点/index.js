function FindKthToTail(head, k) {
    let head1 = head
    while (k--) {
        head = head.next
    }
    while (head.next) {
        head = head.next
        head1 = hea1.next
    }
    return head1
}