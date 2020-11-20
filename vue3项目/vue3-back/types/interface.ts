export interface _obj  {
  [key:string]:any
}

export interface UserInfo{
  question?: string,
  answer?:string,
  userId?:string,
  picture?: string,
  password?: string,
  work?: string,
  desc?: string,
  nickName?: string,
  userName?:string
}

export interface Article{
  content?: string
  artiName?:string
  userId?: string
  isSave?: string
  type?:string
}

export interface FindArticle{
  articleId: string
  userId: string
  targetId?:string
}

export interface FindAllAriticle{
  type?: string,
  isNew?: string,
  limit?: string,
  offset?: string,
  keyWord?: string,
  createdId?: string,
  collections?: string,
  approve? :string
}
 export interface ArticleId{
  articleId:string
 }
 export interface UserId{
  userId:string
 }
export interface UpdateInfo {
  parentId?: string,
  content?: string,
  articleId?: string
  isAdd?: string,
  targetId?: string,
  userId?:string
}