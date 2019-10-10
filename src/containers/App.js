import React, {Component} from 'react';
import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import CheckOut from '../containers/Checkout/Checkout';
class App extends Component {
  render() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
        <CheckOut />
      </Layout>
      
    </div>
  );
}
}

export default App;
