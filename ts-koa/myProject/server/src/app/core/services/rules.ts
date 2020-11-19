import { Rules } from '../../../../../common/types/api/rules/rulesReqModel';
import { RulesModel } from '../module/rules';

export const createRules = async (options: Rules) => {
  const res = await RulesModel.create({ ...options })
  return res
}