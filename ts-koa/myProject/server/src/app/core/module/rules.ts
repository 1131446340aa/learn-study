import { seq } from '../seq';
import { STRING, INTEGER, DECIMAL } from 'sequelize'
export const RulesModel = seq.define('rules', {
  cates_lv2: {
    type: INTEGER,
    allowNull: false,
    comment: '财务二级分类'
  },
  contract_sn: {
    type: STRING,
    allowNull: false,
    comment: '合同编号'
  },
  partner_code: {
    type: STRING,
    allowNull: false,
    comment: '商户编码'
  },
  partner_name: {
    type: STRING,
    allowNull: false,
    comment: '商户名称'
  },
  partner_type: {
    type: INTEGER,
    allowNull: false,
    comment: '商户性质'
  },
  price: {
    type: INTEGER,
    allowNull: false,
    comment: '价格'
  },
  res_type: {
    type: INTEGER,
    allowNull: false,
    comment: '物料类型'
  },
  settle_method: {
    type: INTEGER,
    allowNull: false,
    comment: '合作模式'
  },
  status: {
    type: INTEGER,
    allowNull: false,
    comment: '状态'
  },
  teach_type: {
    type: INTEGER,
    allowNull: false,
    comment: '老师类型'
  },
  unit: {
    type: INTEGER,
    allowNull: false,
    comment: '结算单位'
  },
  _id: {
    // primaryKey: true,
    type: STRING,
    defaultValue: String(Date.now())
  }
})