import { init, h, styleModule, eventListenersModule } from 'snabbdom'

const patch = init([styleModule, eventListenersModule])
function eventHandler() {
    console.log('dianji le -- ');
}

let vnode = h('h1#container.cls', [
    h('h3.h3', { style: { backgroundColor: 'red' } }, 'this is h3'),
    h('button', { on: { click: eventHandler } }, '点击')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

// setTimeout(() => {
//     patch(oldVnode, h('!')) // 清空操作
// }, 2000)

