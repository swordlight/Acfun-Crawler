export interface CommonResponse {
  stat: string
}

export interface getArticleTypeProportionResponse extends CommonResponse {
  data: {
    type: string
    proportion: number
  }[]
}

export interface getCommentAmountAreaProportionResponse extends CommonResponse {
  data: {
    areaList: number[][]
    amountList: number[]
  }
}

export interface getArticleAmountByDateAreaResponse extends CommonResponse {
  data: {
    hourList: number[][]
    amountList: number[]
  }
}