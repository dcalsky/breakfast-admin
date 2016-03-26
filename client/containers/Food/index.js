import React, { Component } from 'react'
import AV from 'avoscloud-sdk'
import {Panel, Button, Input, Label, FormControls, Row, Col, PageHeader} from 'react-bootstrap';


export default React.createClass({
  getInitialState() {
    return {
      floors: [],
      floor: null
    }
  },
  componentWillMount() {
    const Floor = AV.Object.extend('Floor')
    const query = new AV.Query('Floor')
    query.find(floors => {
      console.log(floors)
      this.setState({
        floors: floors
      })
    })
  },
  handleSelectFloor(e) {
    this.setState({floor: e.target.value})
  },
  handleSearch() {

  },
  render() {
    return (
     <div>
       <span>寝室楼</span>
       <select onChange={this.handleSelectFloor}>
         {this.state.floors.map(floor => {
           return <option key={floor.id} value={floor.id}>{floor.get('name')}</option>
         })}
       </select>
       <button onClick={this.handleSearch}>查询</button>
     </div>
    )
  }
})
