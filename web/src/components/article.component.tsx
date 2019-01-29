import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import * as Echarts from 'echarts'
import { Card, message } from 'antd';

import server from '../libs/server'
import { getArticleTypeProportionResponse, getArticleAmountByDateAreaResponse, getArticleAmountByBananaResponse } from '../types/response';
import { PieData } from '../types/modules';
import { getArticleTypeProportionRequest, getArticleAmountByDateAreaRequest, getArticleAmountByBananaRequest } from '../types/request';

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
        <div className="date-area-section">
          <Card 
          title="不同时间段文章发稿数"
          bordered
          hoverable={true}>
            <div id="date-area-line" ref={dom => {this.dateAreaLineDom = dom}}></div>
          </Card>
        </div>
        <div className="banana-section">
          <Card 
          title="不同香蕉数量区间的文章数"
          bordered
          hoverable={true}>
            <div id="banana-bar" ref={dom => {this.bananaBarDom = dom}}></div>
          </Card>
        </div>
      </div>
    )
  }

  proportionPieDom: HTMLDivElement
  dateAreaLineDom: HTMLDivElement
  bananaBarDom: HTMLDivElement

  async componentDidMount() {
    this.generateProportionPie()
    this.generateDateAreaLine()
    this.generateBananaBar()
  }

  async generateProportionPie() {
    let proportionData
    try {
      let resData = await server.request<getArticleTypeProportionResponse, getArticleTypeProportionRequest>({
        url: '/api/article/getArticleTypeProportion',
        data: {
          amount: 20000
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
        proportionData = pieData
      } else {
        message.error(resData.stat, 3)
      }
    }
    catch(e) {
      console.log(e)
    }

    let proportionPie = Echarts.init(this.proportionPieDom, 'light')
    proportionPie.setOption({
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}篇 ({d}%)"
      },
      series : [
        {
          name: '类别占比',
          type: 'pie',
          radius: '55%',
          data: proportionData
        }
      ]
    })
  }
  async generateDateAreaLine() {
    let lineData
    try {
      let resData = await server.request<getArticleAmountByDateAreaResponse, getArticleAmountByDateAreaRequest>({
        url: '/api/article/getArticleAmountByDateArea',
        data: {
          amount: 20000
        }
      })
      if (resData.stat === 'ok') {
        lineData = resData.data
      } else {
        message.error(resData.stat, 3)
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log(lineData)

    let proportionPie = Echarts.init(this.dateAreaLineDom, 'light')
    proportionPie.setOption({
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b}点 : {c} 篇"
      },
      xAxis: {
        type: 'category',
        data: lineData.hourList,
        name: '时间段/小时'
      },
      yAxis: {
        type: 'value',
        name: '文章发稿数量'
      },
      series: [{
        data: lineData.amountList,
        type: 'line'
      }]
    })
  }

  async generateBananaBar() {
    let resultData
    try {
      let resData = await server.request<getArticleAmountByBananaResponse, getArticleAmountByBananaRequest>({
        url: '/api/article/getArticleAmountByBanana',
        data: {
          amount: 20000
        }
      })
      if (resData.stat === 'ok') {
        resultData = {xAxis: resData.data.areaList.map(item => `${item[0]}-${item[1]}`), data: resData.data.amountList}
      } else {
        message.error(resData.stat, 3)
      }
    }
    catch(e) {
      console.log(e)
    }

    let proportionPie = Echarts.init(this.bananaBarDom, 'light', {width: 1000, height: 600})
    proportionPie.setOption({
      tooltip : {
        trigger: 'axis'
      },
      xAxis: [{
        type: 'category',
        data: resultData.xAxis,
        name: '香蕉数量',
      }],
      yAxis: {
        type: 'value',
        name: '文章数量',
      },
      series : [
        {
          type: 'bar',
          data: resultData.data
        }
      ]
    })
  }
}