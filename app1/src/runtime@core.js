import effect from './reactive/effect.js'
import { nodeOps } from './runtime.dom.js'

export function render(vnode, container) {
    container = document.getElementById(container)
    patch(container._vnode, vnode, container)
    container._vnode = vnode

}

function patch(n1, n2, container) {
    if (typeof n2.tag === 'string') {
        //标签
        processElement(n1, n2, container)
    } else if (typeof n2.tag === 'object') {
        //组件
        mountComponent(n2, container)
    }
}

function processElement(oldVNode, newVNode, container) {
    if (!oldVNode) {
        mountElement(newVNode, container)
    } else {
        patchElement(oldVNode, newVNode, container)
    }
}

function mountElement(vnode, container) {
    if (!vnode) return
    const { tag, children, props } = vnode
    let el = (vnode.el = nodeOps.createElement(tag))
    if (props) {
        for (let key in props) {
            nodeOps.hostPatchProps(el, key, {}, props[key])
        }
    }

    if (Array.isArray(children)) {
        mountChildren(children, el)
    } else {
        nodeOps.hostSetElement(el, children)
    }

    nodeOps.insert(el, container)
}

function mountChildren(children, el) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i]

        patch(el._vnode, child, el)
    }
}

function mountComponent(vnode, container) {
    const instance = {
        vnode,
        render: null,
        subTree: null
    }
    const component = vnode.tag
    instance.render = component.setup(vnode.props, instance)

    effect(() => {
        let oldSubTree = instance.subTree
        instance.subTree = instance.render && instance.render()
        patch(oldSubTree, instance.subTree, container)
    })
}

function patchElement(n1, n2, container) {
    let el
    if (n1.tag === n2.tag && n1.el) {
        el = n2.el = n1.el
        el._vnode = n1.children
        const oldProps = n1.props
        const newProps = n2.props
        patchProps(el, oldProps, newProps)
    }
    patchChildren(n1, n2, el)

}

function patchChildren(n1, n2, container) {

    const c1 = n1.children
    const c2 = n2.children
    let el = n2.el = n1.el
    if (Array.isArray(c2)) {
        if (typeof c1 === 'string') {
            el && nodeOps.hostSetElement('', c2)
            mountChildren(c2, container)
        } else {
            patchKeyedChildren(c1, c2, container)

        }

    } else {
        if (c1 !== c2) {
            el && nodeOps.hostSetElement(el, c2)
        }

    }

}

function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
        for (let key in newProps) {
            const p = oldProps[key]
            const n = newProps[key]
            if (p !== n) {
                nodeOps.hostPatchProps(el, key, p, n)
            }
        }
        for (const key in oldProps) {
            if (!newProps.hasOwnProperty(key)) {
                nodeOps.hostPatchProps(el, key, oldProps[key], null)
            }
        }
    }
}


function patchKeyedChildren(c1, c2, container) {

    //根据新节点生成一个索引的映射表
    //去老的里面找看有没有对应的，如果有对应的就复用。
    // 看数量，位置。
    let lengthChild = c1.length > c2.length ? c1 : c2
    lengthChild.forEach((vnode, index) => {
        if (c1[index] && c2[index]) {

        }
        // if (c1[index] && !c2[index]) {
        //     nodeOps.remove(container.childNodes[index])
        // }
        // if (!c1[index] && c2[index]) {
        //     mountElement(c2[index], container)
        //     nodeOps.insert(c2[index].el, container)
        // }
    })
    let e1 = c1.length - 1
    let e2 = c2.length - 1
    const keyToNewIndex = new Map()
    for (let i = 0; i <= e2; i++) {

        const currentEl = c2[i];
        currentEl.props.key != undefined && keyToNewIndex.set(currentEl.props.key, i)
    }
    for (let i = 0; i <= e1; i++) {
        const oldVNode = c1[i];
        let newIndex = keyToNewIndex.get(oldVNode.props.key)
        if (oldVNode.props.key == undefined) {
            patchElement(c1[i], c2[i])
        }
        if (newIndex == undefined) {
            oldVNode.props.key && nodeOps.remove(oldVNode.el)
        } else {
            patchElement(oldVNode, c2[newIndex])
        }
        keyToNewIndex.delete(newIndex)
        if (i === e1) {
            keyToNewIndex.forEach(key => {
                mountElement(c2[key], container)
                nodeOps.insert(c2[key].el, container)
            })
        }
    }


}