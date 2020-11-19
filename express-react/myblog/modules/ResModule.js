/*
 * @Descripttion: 
 * @Date: 2020-07-18 16:20:51
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-18 17:49:28
 */
class BaseModel {
    constructor({ error, data, message }) {
        this.error = error
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessfulModel extends BaseModel {
    constructor(data = {}) {
        super({
            error: 0,
            data
        })
    }
}

class ErrorModel extends BaseModel {
    constructor({ error, message }) {
        super({
            error,
            message
        })
    }
}
module.exports = {
    SuccessfulModel,
    ErrorModel
}