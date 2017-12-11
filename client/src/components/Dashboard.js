import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../fakeAuth';
import { 
  Segment, 
  Header,
  Dimmer, 
  Loader,
  List } from 'semantic-ui-react';
import axios from 'axios';



class Dashboard extends Component {
  state = { products: [] };
  componentDidMount() {
    axios.get('/api/products')
    .then( res => {
      this.setState({ products: res.data })
    })
    .catch( err => {
      //handle client errors better with flash message
      console.log(err)
    })
  }

  //need to bind, have access to state
  displayProducts = () => {
    // manual map way
    // let productsArray = [];
    // this.state.products.forEach( product => {
    //   productsArray.push(<div> {product.name} </div>)
    // })
    // return productsArray;
    return this.state.products.map( product => {
      return( 
      <List.Item>
        <Link to={`/products/${product.id}`}>
      {product.name}
        </Link> 
      </List.Item> )
    });
  }

  //doesn't need to be bound, doesn't use this.something
  productsLoader(){
    return(
      <Dimmer active style={styles.dimmer} >
        <Loader> Loading Products...</Loader>
      </Dimmer>
    )
  }

  render() {
  if(isAuthenticated())
    return(
      <Segment basic>
        <Header as='h3'> You are logged in! </Header>
        {this.state.products.length > 0 ? 
        <List> 
          {this.displayProducts()}
        </List> : 
        this.productsLoader() }
      </Segment>
    )
    else 
      return(<Redirect to='/login' />)
  }
}

const styles = {
  dimmer: {
    height: '100vh',
  },
}
export default Dashboard;