import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import * as Echarts from 'echarts'
import { Card, message } from 'antd';

import server from '../libs/server'
import { getArticleTypeProportionResponse } from '../types/response';
import { PieData } from '../types/modules';
import { getArticleTypeProportionRequest } from '../types/request';

export default class ArticleComponent extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className="article-layout">
        <div className="proportion-section">
          <Card 
          title="类别占比"
          bordered
          hoverable={true}>
            <div id="proportion-pie" ref={dom => {this.proportionPieDom = dom}}></div>
          </Card>
        </div>
      </div>
    )
  }

  proportionPieDom: HTMLDivElement

  async componentWillMount() {
  }

  async componentDidMount() {
    try {
      let resData = await server.request<getArticleTypeProportionResponse, getArticleTypeProportionRequest>({
        url: '/api/article/getArticleTypeProportion',
        data: {
          amount: 10000
        }
      })
      if (resData.stat === 'ok') {
        let pieData: PieData[] = []
        resData.data.forEach(item => {
          let tempItem: PieData = new PieData()
          tempItem.name = item.type
          tempItem.value = item.proportion
          pieData.push(tempItem)
        })
        this.generateProportionPie(pieData)
      } else {
        message.error(resData.stat, 3)
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  generateProportionPie(proportionData: PieData[]) {
    let proportionPie = Echarts.init(this.proportionPieDom, 'light')
    proportionPie.setOption({
      series : [
        {
          name: '类别占比',
          type: 'pie',
          radius: '55%',
          data: proportionData,
          color: ['#FFEBCD', '#87CEFF', '#98F5FF', '#FFD700', '#FFE4E1', '#9AFF9A', '#FF6EB4']
        }
      ]
    })
  }
}