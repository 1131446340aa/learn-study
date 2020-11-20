
import { SuccessfulModel, ErrorModel } from "../response/resModel.ts";
import ErrorInfo from "../response/errorInfo.ts";
const { registerFailInfo, changeInfoFailInfo ,registerUserNameExistInfo,loginFailInfo} = ErrorInfo
import { createUser, updateUser,getUserInfo }  from "../services/user.ts";
import { UserInfo } from "../types/interface.ts";

export async function register({ userName, password, question, answer, nickName }:UserInfo) {
    const userInfo = await getUserInfo({userName})
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo);
    } else {
        try {
            await createUser({ userName, password, question, answer, nickName });
            return new SuccessfulModel();
        } catch (e) {
            console.error(e.message, e.stack);
            return new ErrorModel(registerFailInfo);
        }
    }
}
export async function login({ userName, password }:UserInfo) {
    try {
        let res = await getUserInfo({ userName, password });
        return res ? new SuccessfulModel(res) : new ErrorModel(loginFailInfo);
    } catch (e) {
        console.error(e.message, e.stack);

    }
}
export async function updateUserInfo({ nickName, picture, password, work, desc,userId } :UserInfo) {

  try {
      if(!userId){return new ErrorModel(changeInfoFailInfo)}
      let res = await updateUser({ nickName, picture, password, work, desc, userId });
        return  new SuccessfulModel() 
    } catch (e) {
        console.error(e.message, e.stack);
    }
}

