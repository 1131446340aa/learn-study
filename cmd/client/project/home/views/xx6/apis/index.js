import Api from './api/index'

export default new Api([
  {
    "methods": "post",
    "name": "postApi{petId}UploadImage",
    "headers": {},
    "url": "/pet/{petId}/uploadImage"
  },
  {
    "methods": "post",
    "name": "postApi",
    "headers": {},
    "url": "/pet"
  },
  {
    "methods": "put",
    "name": "putApi",
    "headers": {},
    "url": "/pet"
  },
  {
    "methods": "get",
    "name": "getApiFindByStatus",
    "headers": {},
    "url": "/pet/findByStatus"
  },
  {
    "methods": "get",
    "name": "getApiFindByTags",
    "headers": {},
    "url": "/pet/findByTags"
  },
  {
    "methods": "get",
    "name": "getApi{petId}",
    "headers": {},
    "url": "/pet/{petId}"
  },
  {
    "methods": "post",
    "name": "postApi{petId}",
    "headers": {},
    "url": "/pet/{petId}"
  },
  {
    "methods": "delete",
    "name": "deleteApi{petId}",
    "headers": {},
    "url": "/pet/{petId}"
  }
]).$api
