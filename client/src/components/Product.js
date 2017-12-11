import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Dimmer, Loader, Header, List, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class Product extends Component {
  state = { producs: {}, loaded: false};

  componentDidMount() {
    const productId = this.props.match.params.id;
    axios.get(`/api/products/${productId}`)
      .then(res => {
        this.setState({ product: res.data, loaded: true})
      })
      .catch( err => {
        console.log( err)
      })
  }

  deleteProduct = () => {
    window.confirm('Delete Product?')
    axios.delete(`/api/products/${this.state.product.id}`) 
      .then(res => {
        this.props.history.push('/dashboard')
      })
      .catch( err => {
        console.log(err)
      }) 
  }

  displayProduct = () => {
    const { name, description, price, department } = this.state.product
    return(
    <Segment basic>
      <Header as='h1'> {name}</Header>
      <List>
        <List.Item> 
          {description}
        </List.Item>
        <List.Item> 
          {price}
        </List.Item>
        <List.Item> 
          {department}
        </List.Item>
      </List>
      <Button  color='orange'> Edit </Button>
      <Button color='red' onClick={this.deleteProduct}> Delete </Button>
      <Button as={Link} to='/dashboard'> All Products </Button>
    </Segment> 
    )
  }

  render() {
    if(this.state.loaded)
      return(
        <Segment> 
          { this.displayProduct() }
        </Segment>
      )
    else
      return(
        <Dimmer active style={styles.dimmer}>
          <Loader> Loading Product...</Loader>
        </Dimmer>
      )
  }
}

const styles = {
  dimmer: {
    height: '100vh',
  },
}

export default Product;