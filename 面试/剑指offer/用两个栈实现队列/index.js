let stack1 = []

let stack2 = []

function push(item) {
    while (stack2.length) {
        stack1.push(stack2.pop())
    }
    stack1.push(item)
}

function pop() {
    while (stack1.length) {
        stack2.push(stack1.pop())
    }
    return stack2.pop()
}

push(1)

push(2)

console.log(pop());
console.log(pop());