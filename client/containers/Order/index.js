import React from 'react'
import AV from 'avoscloud-sdk'
import moment from 'moment'
import {Table} from 'react-bootstrap';

const Order = AV.Object.extend('Order')

export default React.createClass({
  getInitialState() {
    return {
      floors: [],
      floor: null,
      orders: [],
      today: true
    }
  },
  componentWillMount() {
    const Floor = AV.Object.extend('Floor')
    const query = new AV.Query('Floor')
    query.find(floors => {
      this.setState({
        floor: floors[0].get('name'),
        floors: floors
      })
    })
  },
  handleSelectFloor(e) {
    this.setState({
      floor: e.target.value
    })
  },
  handleSearch() {
    this.setState({orders: []})
    const query_order = new AV.Query('Order')
    const query_foods = new AV.Query('OrderDetail')
    query_order.equalTo('floor', this.state.floor)
    query_order.descending('startDate')
    if(this.state.today) {
      const firstTime = moment().hour(0).minute(0).second(0).toDate()
      const lastTime = moment().hour(24).minute(0).second(0).toDate()
      query_order.greaterThan('startDate', firstTime)
      query_order.lessThan('startDate', lastTime)
    }
    query_order.find(orders => {
      orders.map(order => {
        query_foods.equalTo('order', order)
        query_foods.find(foods => {
          order.foods = foods
          this.setState({
            orders: orders
          })
        })
      })
    })
  },
  render() {
    return (
     <div>
       <span>寝室楼</span>
       <select onChange={this.handleSelectFloor}>
         {this.state.floors.map(floor => {
           return <option key={floor.id} value={floor.get('name')}>{floor.get('name')}</option>
         })}
       </select>
       <input type="checkbox" name="today" checked={this.state.today}  onChange={() => {this.setState({today: !this.state.today})}}/> 今日
       <button onClick={this.handleSearch}>查询</button>
       <br/>
       <Table striped bordered condensed hover>
         <thead>
         <tr>
           <th>name</th>
           <th>phone</th>
           <th>date</th>
           <th>floor</th>
           <th>room</th>
           <th>foods</th>
         </tr>
         </thead>
         <tbody>
           {
              this.state.orders.map(order => {
                return (
                  <tr key={order.id}>
                    <td>{order.get('name')}</td>
                    <td>{order.get('phone')}</td>
                    <td>{moment(order.get('startDate')).format("YYYY/MM/DD HH:mm")}</td>
                    <td>{order.get('floor')}</td>
                    <td>{order.get('room')}</td>
                    <td>
                      {order.foods.map((detail, i) => {
                        return (
                          <div key={`detail-${i}`}>
                            <p>{detail.get('name')} {detail.get('ingredientArray').map((ingredientName, i) => {
                              return (
                              <span key={`ingredient-${i}`}>+{ingredientName}</span>
                              )
                            })} *  {detail.get('count')}</p>
                          </div>)
                      })}
                    </td>
                  </tr>)
              })
           }
         </tbody>
       </Table>
     </div>
    )
  }
})
