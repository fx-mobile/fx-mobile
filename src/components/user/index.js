import wxHeader from './wxHeader'
import inputCell from './inputCell'
import inputCellReadonly from './inputCellReadonly'
import formTitle from './formTitle'
import checkCodeCell from './checkCodeCell'
import inputCellPick from './inputCellPick'
import cellDatePick from './cellDatePick'
import formAttention from './formAttention'
import button from './button'
import normalBtn from './normalBtn'
import noData from '../common/noData'

const components = {
    wxHeader,
    inputCell,
    inputCellReadonly,
    formTitle,
    checkCodeCell,
    inputCellPick,
    cellDatePick,
    formAttention,
    button,
    normalBtn,
    noData
}

export default components;


/**
 *
 *  <v-form-title title="企业信息"></v-form-title>
 *  <v-input-cell title="纳税人识别号 /<br>社会信用代码" placeholder="请输入纳税人识别号或社会"></v-input-cell>
 *  <v-input-cell-readonly title="纳税人识别号 /<br>社会信用代码" :value=""></v-input-cell-readonly>
 *  <v-check-code-cell title="验证码"></v-check-code-cell>
 *  <v-input-cell-pick title="职务" :pickArr="['财务负责人','办税员','购票人']"></v-input-cell-pick>
 *  <v-cell-date-pick title="代理日期起" placeholder="请选择代理开始日期"></v-cell-date-pick>
 *
 */