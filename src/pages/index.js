import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax'
import layer2 from '../images/header-x2.png'
import layer3 from '../images/header-x3.png'
import layer4 from '../images/header-x4.png'
import layer5 from '../images/header-x5.png'
import Headphones from '../assets/headphones.png'
import ListExample from '../components/navigation/index'
import { connect } from 'react-redux';
import { fetchUser, fetchProducts, redeemProduct } from '../actions';
import { ToastContainer } from 'react-toastify';

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: user => {
      dispatch(fetchUser(user));
    },
    onFetchProducts: products => {
      dispatch(fetchProducts(products))
    },
    onRedeemProduct: product => {
      dispatch(redeemProduct(product))
    }
  };
};
const layers = [
  {
    amount: 0.20,
    children: <div id="layer-1-parallax-1"><img alt="headphones" src={Headphones}></img></div>
  },
  {
    amount: 0.2,
    image: layer2,
    expanded: false
  },
  {
    amount: 0.2,
    image: layer3,
    expanded: false
  },
  {
    amount: 0.1,
    image: layer4,
    expanded: false
  },
  {
    amount: 0.2,
    image: layer5,
    expanded: false
  }
]


const IndexPage = ({ user, products, onFetchUser, onFetchProducts, onRedeemProduct }) => {
  return <ParallaxProvider>
    {
      (!user.loaded || !products.loaded) && <div className="preloader"> <div data-loader="circle-side"></div></div>
    }
    <Layout user={user}>
      <ToastContainer />
      <ParallaxBanner className="tech-banner" layers={layers}>
        <h1>Electronics</h1>
      </ParallaxBanner>
      <SEO title="Home" />
      <section className="search-results">
        <ListExample onRedeemProduct={onRedeemProduct} user={user} products={products.rows}></ListExample>
      </section>
    </Layout>
  </ParallaxProvider>
}
const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
