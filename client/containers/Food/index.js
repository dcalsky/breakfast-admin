import React, { Component } from 'react'
import AV from 'avoscloud-sdk'
import _ from 'lodash'
import { Input } from 'react-bootstrap'

const Food = AV.Object.extend('Food')

export default React.createClass({
  getInitialState() {
    return {
      foods: [],
      id: null,
      name: null,
      desc: null,
      price: null,
      image: null,
      isNewFood: false
    }
  },
  componentWillMount() {
    const query = new AV.Query('Food')
    query.find(foods => {
      const initFood = foods[0]
      this.setState({
        foods: foods,
        id: initFood.id,
        name: initFood.get('name'),
        desc: initFood.get('desc'),
        price: initFood.get('price'),
        image: initFood.get('image')
      })
    })
  },
  handleSelectFood(e) {
    const food = _.find(this.state.foods, {id: e.target.value})
    this.setState({
      id: food.id,
      name: food.get('name'),
      desc: food.get('desc'),
      price: food.get('price'),
      image: food.get('image')
    })
  },
  switchMode() {
    const initFood = this.state.foods[0]
    this.setState({
      id: !this.state.isNewFood ? null : initFood.id,
      name: !this.state.isNewFood ? null : initFood.get('name'),
      desc: !this.state.isNewFood ? null : initFood.get('desc'),
      price: !this.state.isNewFood ? null : initFood.get('price'),
      image: !this.state.isNewFood ? null : initFood.get('image'),
      isNewFood: !this.state.isNewFood
    })
  },
  handleAddFood() {
    let food = new Food()
    if(!this.state.name || !this.state.price) {
      alert('食物名字或价格不能为空')
      return
    }
    food.set('name', this.state.name)
    food.set('desc', this.state.desc)
    food.set('price', parseFloat(this.state.price))
    if(this.state.image) {
      food.set('image', this.state.image)
    }
    food.save().then(result => {
      alert('添加成功')
      window.location.reload()
    })
  },
  handleUpdateFood() {
    let food = AV.Object.createWithoutData('Food', this.state.id)
    food.set('name', this.state.name)
    food.set('desc', this.state.desc)
    food.set('price', parseFloat(this.state.price))
    if(this.state.image) {
      food.set('image', this.state.image)
    }
    food.save().then(result => {
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
      case 'desc':
        this.setState({desc: value})
        break
      case 'price':
        this.setState({price: value})
        break
      case 'image':
        this.setState({image: value})
        break
    }
  },
  render() {
    console.log(this.state)
    return (
      <div>
        {
          !this.state.isNewFood ?
            <div>
              <select onChange={this.handleSelectFood}>
                {this.state.foods.map(food => {
                  return <option key={food.id} value={food.id}>{food.get('name')}</option>
                })}
              </select>
              <button onClick={this.switchMode}>添加新食物</button>
              <button style={{marginLeft: 20}} onClick={this.handleUpdateFood}>确认修改</button>
              <Input type="text" label="Name"  value={this.state.name} onChange={this.handleChangeInput.bind(this, 'name')}/>
              <Input type="text" label="Desc"  value={this.state.desc} onChange={this.handleChangeInput.bind(this, 'desc')}/>
              <Input type="text" label="price" value={this.state.price} onChange={this.handleChangeInput.bind(this, 'price')}/>
              <Input type="text" label="image" value={this.state.image} onChange={this.handleChangeInput.bind(this, 'image')}/>
              <img style={{width: 120}} src={this.state.image} alt=""/>

            </div>
              :
            <div>
              <button onClick={this.switchMode}>修改食物</button>
              <button style={{marginLeft: 20}} onClick={this.handleAddFood}>确认添加</button>
              <Input type="text" label="Name"  value={this.state.name} onChange={this.handleChangeInput.bind(this, 'name')}/>
              <Input type="text" label="Desc"  value={this.state.desc} onChange={this.handleChangeInput.bind(this, 'desc')}/>
              <Input type="text" label="price" value={this.state.price} onChange={this.handleChangeInput.bind(this, 'price')}/>
              <Input type="text" label="image" value={this.state.image} onChange={this.handleChangeInput.bind(this, 'image')}/>

            </div>
        }

      </div>
    )
  }
})
