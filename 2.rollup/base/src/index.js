// 导入模块成员
import { log } from './logger'
import messages from './messages'
import { name, version } from '../package.json'
import { camelCase } from "lodash-es"
import cjs from './module.cjs'
// 使用模块成员
const msg = messages.hi

log(msg)
log(name)
log(version)
log(camelCase('hello word'))
log(cjs)

import('./asyncLogger').then(({ log }) => {
    log('async log')
})
