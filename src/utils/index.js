import isEmpty from './isEmpty'
import { toBigMoney } from './moneyFormat'
import { formatMoney } from './moneyFormat'
import { formatMillion } from './moneyFormat'
import { toDate } from './toDatetime'
import toDatetime from './toDatetime'
import localStorageUtil from './localStorageUtil'
import sessionStorageUtil from './sessionStorageUtil'
import getPlatformType from './getPlatformType'
import { areaDataHandler } from './handler'
import moment from './moment/index'
import { Base64 } from './base64'



// 统一输出utils下的工具
export default {
    isEmpty,
    toBigMoney,
    formatMoney,
    toDatetime,
    localStorageUtil,
    sessionStorageUtil,
    getPlatformType,
    toDate,
    moment,
    Base64
}