import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Coin from '../assets/icons/coin.svg'
import { connect } from 'react-redux';
import { fetchUser, addPoints } from '../actions';
import { ToastContainer } from 'react-toastify';
import AnimatedList from '../components/redeemHistory'
const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: user => {
      dispatch(fetchUser(user));
    },
    onAddPoints: points => {
      dispatch(addPoints(points));
    }
  };
};

const SecondPage = ({ user, onFetchUser, onAddPoints }) => {
  const listData = user.redeemHistory
  return <>
    {
      (!user.loaded) && <div className="preloader"> <div data-loader="circle-side"></div></div>
    }
    <Layout user={user}>
      <ToastContainer />
      <SEO title="Dashboard" />
      <section className=" container row dashboard">
        <div className='col-md-6 col-sm-12'>
          <div className=" light-border col-md-12">
            <h3>My profile</h3>
            <ul>
              <li>
                <b>ID :</b>&nbsp;{user._id}
              </li>
              <li>
                <b>Name :</b>&nbsp;{user.name}
              </li>
              <li>
                <b>Points :</b>&nbsp;{user.points}
              </li>
              <li>
                <b>Created :</b>&nbsp;{user.createDate}
              </li>
            </ul>
          </div>
          <div className="light-border col-md-12">
            <h3> Add  points</h3>
            <button onClick={(e) => {
              onAddPoints(1000)
            }} className="addPoints" > 1000 <img alt="coin" src={Coin} /></button>
            <button onClick={(e) => {
              onAddPoints(5000)
            }} className="addPoints"> 5000 <img alt="coin" src={Coin} /></button>
            <button onClick={(e) => {
              onAddPoints(7500)
            }} className="addPoints"> 7500 <img alt="coin" src={Coin} /></button>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className=' col-md-6 col-sm-12'>
          <div style={{ color: '#616161' }} className="col-md-12">
            <h3> Redeem history</h3>
            {
              (listData && listData[0]) ? <AnimatedList listData={listData} /> : 'No redeem products yet...'
            }

          </div>
        </div>
      </section>
    </Layout>
  </>
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondPage);
