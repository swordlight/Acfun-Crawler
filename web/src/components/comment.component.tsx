import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import * as Echarts from 'echarts'
import { Card, message } from 'antd';

import server from '../libs/server'
import { getCommentAmountAreaProportionResponse } from '../types/response';
import { PieData, BarData } from '../types/modules';
import { getCommentAmountAreaProportionRequest } from '../types/request';

export default class CommentComponent extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className="comment-layout">
        <div className="proportion-section">
          <Card 
          title="评论数量区间占比"
          bordered
          hoverable={true}>
            <div id="proportion-bar" ref={dom => {this.proportionBarDom = dom}}></div>
          </Card>
        </div>
      </div>
    )
  }

  proportionBarDom: HTMLDivElement

  async componentDidMount() {
    try {
      let resData = await server.request<getCommentAmountAreaProportionResponse, getCommentAmountAreaProportionRequest>({
        url: '/api/comment/getCommentAmountAreaProportion',
        data: {
          amount: 20000
        }
      })
      if (resData.stat === 'ok') {
        this.generateProportionPie({xAxis: resData.data.areaList.map(item => `${item[0]}-${item[1]}`), data: resData.data.amountList})
      } else {
        message.error(resData.stat, 3)
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  generateProportionPie(proportionData: BarData) {
    let proportionPie = Echarts.init(this.proportionBarDom, 'light', {width: 1000, height: 600})
    proportionPie.setOption({
      tooltip : {
        trigger: 'axis'
      },
      xAxis: [{
        type: 'category',
        data: proportionData.xAxis,
        name: '评论数量',
      }],
      yAxis: {
        type: 'value',
        name: '文章数量',
      },
      series : [
        {
          type: 'bar',
          data: proportionData.data
        }
      ]
    })
  }
}