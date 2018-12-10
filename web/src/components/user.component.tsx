import * as React from 'react'
import {RouteComponentProps, Route, Switch, Redirect} from 'react-router-dom'
import * as Echarts from 'echarts'
import { Card } from 'antd';

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

  componentDidMount() {
    let sexPie = Echarts.init(this.sexPieDom, 'light')

    sexPie.setOption({
      series : [
        {
          name: '性别占比',
          type: 'pie',
          radius: '55%',
          data:[
            {value:50, name:'男'},
            {value:50, name:'女'}
          ],
          color: ['#dd6b66','#759aa0']
        }
      ]
    })
  }

}