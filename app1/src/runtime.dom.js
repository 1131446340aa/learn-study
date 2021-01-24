export const nodeOps = {
    insert(child, parent, anchor) {
        if (anchor) {
            parent.insertBefore(child.anchor);
        } else {
            parent.appendChild(child);
        }
    },
    remove(child) {

        const parent = child.parentNode;
        parent && parent.removeChild(child);
    },
    createElement(tag) {
        return document.createElement(tag);
    },
    hostSetElement(el, text) {

        el.textContent = text;
    },
    hostPatchProps(el, key, oldValue, value) {

        if (/^on[^a-z]/.test(key)) {
            const event = key.slice(2).toLowerCase()
            oldValue && el.removeEventListener(event, oldValue)
            value && el.addEventListener(event, value)
        } else {
            if (value === null) {
                return el.removeAttribute(key);

            }
            if (key === 'style') {
                for (let key in value) {
                    el.style[key] = value[key]
                }
                for (let key in oldValue) {
                    if (!value.hasOwnProperty(key)) {
                        el.style[key] = null;
                    }
                }
            } else {
                el.setAttribute('key', value)
            }
        }
    }

}