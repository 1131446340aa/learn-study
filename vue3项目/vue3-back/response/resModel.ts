
class BaseModel {
  error: number
  data?: object
  message?: string
  constructor({ error, data, message }: { error: number, data?: object, message?: string }) {
    this.error = error
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

export class SuccessfulModel extends BaseModel {
  constructor(data = {}) {
    super({
      error: 0,
      data
    })
  }
}

export class ErrorModel extends BaseModel {
  constructor({ error, message }: { error: number, message: string }) {
    super({
      error,
      message
    })
  }
}
