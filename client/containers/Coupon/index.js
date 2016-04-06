import React, { Component } from 'react'
import AV from 'avoscloud-sdk'
import _ from 'lodash'
import { Input } from 'react-bootstrap'

const Coupon = AV.Object.extend('Coupon')

export default React.createClass({
  getInitialState() {
    return {
      coupons: [],
      id: null,
      name: null,
      number: null,
      discount: null,
      isNewCoupon: false
    }
  },
  componentWillMount() {
    const query = new AV.Query('Coupon')
    query.find(coupons => {
      const initCoupon = coupons[0]
      this.setState({
        coupons: coupons,
        id: initCoupon.id,
        name: initCoupon.get('name'),
        number: initCoupon.get('number'),
        discount: initCoupon.get('discount'),
      })
    })
  },
  handleSelectCoupon(e) {
    const coupon = _.find(this.state.coupons, {id: e.target.value})
    this.setState({
      id: coupon.id,
      name: coupon.get('name'),
      number: coupon.get('number'),
      discount: coupon.get('discount'),
    })
  },
  switchMode() {
    const initCoupon = this.state.coupons[0]
    this.setState({
      id: !this.state.isNewCoupon ? null : initCoupon.id,
      name: !this.state.isNewCoupon ? null : initCoupon.get('name'),
      number: !this.state.isNewCoupon ? null : initCoupon.get('number'),
      discount: !this.state.isNewCoupon ? null : initCoupon.get('discount'),
      isNewCoupon: !this.state.isNewCoupon
    })
  },
  handleAddCoupon() {
    let coupon = new Coupon()
    if(!this.state.name || !this.state.number || !this.state.discount) {
      alert('食物名字或价格不能为空')
      return
    }
    coupon.set('name', this.state.name)
    coupon.set('number', this.state.number)
    coupon.set('discount', parseFloat(this.state.discount))
    coupon.save().then(() => {
      alert('添加成功')
      window.location.reload()
    })
  },
  handleUpdateCoupon() {
    let coupon = AV.Object.createWithoutData('Coupon', this.state.id)
    coupon.set('name', this.state.name)
    coupon.set('number', this.state.number)
    coupon.set('discount', parseFloat(this.state.discount))
    coupon.save().then(() => {
      alert('修改成功')
      window.location.reload()
    })
  },
  handleChangeInput(type, e) {

    const value = e.target.value
    switch (type) {
      case 'name':
        this.setState({name: value})
        break
      case 'number':
        this.setState({number: value})
        break
      case 'discount':
        this.setState({discount: value})
        break
    }
  },
  render() {
    return (
      <div>
        {
          !this.state.isNewCoupon ?
            <div>
              <select onChange={this.handleSelectCoupon}>
                {this.state.coupons.map(coupon => {
                  return <option key={coupon.id} value={coupon.id}>{coupon.get('name')}</option>
                })}
              </select>
              <button onClick={this.switchMode}>添加新食物</button>
              <button style={{marginLeft: 20}} onClick={this.handleUpdateCoupon}>确认修改</button>
              <Input type="text" label="Name"  value={this.state.name} onChange={this.handleChangeInput.bind(this, 'name')}/>
              <Input type="text" label="Number"  value={this.state.number} onChange={this.handleChangeInput.bind(this, 'number')}/>
              <Input type="text" label="Discount" value={this.state.discount} onChange={this.handleChangeInput.bind(this, 'discount')}/>

            </div>
            :
            <div>
              <button onClick={this.switchMode}>修改食物</button>
              <button style={{marginLeft: 20}} onClick={this.handleAddCoupon}>确认添加</button>
              <Input type="text" label="Name"  value={this.state.name} onChange={this.handleChangeInput.bind(this, 'name')}/>
              <Input type="text" label="Number"  value={this.state.number} onChange={this.handleChangeInput.bind(this, 'number')}/>
              <Input type="text" label="Discount" value={this.state.discount} onChange={this.handleChangeInput.bind(this, 'discount')}/>
            </div>
        }

      </div>
    )
  }
})
