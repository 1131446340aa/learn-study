
import { createRules } from '../services/rules';
import { Rules } from '../../../../../common/types/api/rules/rulesReqModel';
import { apiServerInstance } from 'src/app/services';
export const insertRules = async function (options: Rules) {

  try {
    return apiServerInstance.normalResponse.format({ data: await createRules(options) })
  } catch (error) {
    console.log(error.message, error.stack);

    const { cates_lv2, contract_sn, started_at, partner_code, partner_name, partner_type, price, res_type, settle_method, status, teach_type, unit, ended_at } = options
    options = { cates_lv2, contract_sn, started_at, partner_code, partner_name, partner_type, price, res_type, settle_method, status, teach_type, unit, ended_at }
    for (let key of Object.keys(options)) {
      if (options[key as keyof typeof options] === void 0) {
        return apiServerInstance.errorResponse.format({
          error_message: `缺少参数 ${key}`,
          error_no: 10020
        })
      }
    }
    return apiServerInstance.errorResponse.format({
      error_message: `服务端错误`,
      error_no: 10021
    })
  }


}

// const RulesErrorMsg = function (options:Rules){

//   const { cates_lv2, contract_sn, started_at, partner_code, partner_name, partner_type, price, res_type, settle_method, status, teach_type, unit, ended_at } = options
//   const ErrorMsg =[{
//     props:cates_lv2,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:contract_sn,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:started_at,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:partner_code,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:partner_name,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:partner_type,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:cates_lv2,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:contract_sn,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:started_at,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:status,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:res_type,
//     msg:'请输入财务二级分类'
//   },
//   {
//     props:price,
//     msg:'请输入财务二级分类'
//   }]
// }
