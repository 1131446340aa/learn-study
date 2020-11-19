function Merge(head1, head2) {
    let MergeHead = null
    if (!head1) return head2
    if (!head2) return head1
    if (head1.val < head2.val) {
        MergeHead = head1
        MergeHead.next = Merge(head1.next, head2)
    } else {
        MergeHead = head2
        MergeHead.next = Merge(head1, head2.next)
    }
    return MergeHead
}