import vue from './reactive/index.js'

const { reactive, computed } = vue

export const state = reactive({
    name: '力豪',
    color: 'blue',
    count: 0,
    colors: ['red', 'yellow', 'blue', 'green']
})
let lastAge = computed(() => {
    return state.count + 1
})
const myComponent = {
    setup() {
        return () => ({
            tag: 'div',
            props: {
                style: {
                    color: state.color
                }
            },
            children: '我是组件哦,我的值是一个计算属性,' + lastAge.value
        })
    }
}

export const vnode = () => ({
    tag: 'div',
    props: {
        style: {
            border: '1px solid yellow'
        }
    },
    children: [{
            tag: 'p',
            props: {
                style: {
                    color: state.color
                }
            },
            children: [{
                tag: 'p',
                props: {
                    style: {
                        color: state.color
                    }
                },
                children: state.name
            }]
        },
        {
            tag: 'button',
            props: {
                onClick() {
                    state.count += 1
                }
            },
            children: state.count
        },
        {
            tag: 'div',
            props: {},
            children: '我的年龄是:' + state.count
        },
        {
            tag: myComponent,
            props: {},
            children: ''
        },
        {
            tag: 'h3',
            props: {},
            children: '我是列表'
        },
        {
            tag: 'ul',
            props: {},
            children: state.colors.map((color, index) => ({
                tag: 'li',
                props: {
                    style: {
                        color
                    },
                    key: index
                },
                children: index
            }))
        }
    ]
})

setTimeout(() => {
    state.name = 'huang'
    state.color = 'red'
    state.colors[1] = 'pink'
    state.colors.push('pink')
        // state.colors.pop();
}, 1000)