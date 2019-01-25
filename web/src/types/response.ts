export interface CommonResponse {
  stat: string
}

export interface getArticleTypeProportionResponse extends CommonResponse {
  data: {
    type: string
    proportion: number
  }[]
}