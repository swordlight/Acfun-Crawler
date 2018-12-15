import * as React from 'react'
import {RouteComponentProps, Route, Switch, Redirect} from 'react-router-dom'
import * as Echarts from 'echarts'
import { Card } from 'antd';

import server from '../libs/server'

export default class UserComponent extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className="user-layout">
        <div className="sex-section">
          <Card 
          title="性别占比"
          bordered
          hoverable={true}>
            <div id="sex-pie" ref={dom => {this.sexPieDom = dom}}></div>
          </Card>
        </div>
      </div>
    )
  }

  sexPieDom: HTMLDivElement

  async componentWillMount() {
  }

  async componentDidMount() {
    let resData
    let sexData = []
    let option = {
      url: '/api/user/getSexInfo'
    }
    try {
      resData = await server.request(option)
    }
    catch(e) {
      console.log(e)
    }

    let sexPie = Echarts.init(this.sexPieDom, 'light')

    for (let i in resData) {
      sexData.push({value: resData[i], name: i})
    }
    
    sexPie.setOption({
      series : [
        {
          name: '性别占比',
          type: 'pie',
          radius: '55%',
          data: sexData,
          color: ['#dd6b66','#759aa0']
        }
      ]
    })
  }

}