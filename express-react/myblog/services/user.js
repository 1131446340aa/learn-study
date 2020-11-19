/*
 * @Descripttion: 
 * @Date: 2020-07-18 15:39:43
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-18 18:17:24
 */
const { User } = require("../module/user/User");
const doCrypto = require("../utils/cryp");
async function createUser({ userName, password, nickName, question, answer }) {
    const result = await User.create({
        userName,
        nickName,
        password: doCrypto(password),
        question,
        answer
    });
    return result.dataValues;
}

const getUserInfo = async({ userName, password }) => {
    const whereOption = {
            userName,
            // password
    }
    
        // console.log(userName, password);
    password && (whereOption.password = doCrypto(password))
    const result = await User.findOne({
            attribute: ['userName', 'password', 'nickName', 'question',
                'answer', 'gender', 'picture', 'city', 'id','work','desc',
            'createdAt', 'updatedAt'
            ],
            where: whereOption
        })
        // console.log(result);
    return result
}
const updateUser = async ({ nickName, picture, password, work, desc,id}) => {
    let updateIptions = {}
    nickName && (updateIptions.nickName = nickName)
    picture && (updateIptions.picture = picture)
    password && (updateIptions.password = password)
    work && (updateIptions.work = work)
    desc && (updateIptions.desc = desc)
    // console.log(userName, password);
    password && (whereOption.password = password)
   result= await User.update(updateIptions, {
        where: {
            'userName':id
        }
   })
   
    result = await getUserInfo({ userName: id })  
    // console.log(result);
    return result
}
module.exports = {
    createUser,
    getUserInfo,
    updateUser
};