import { Link } from "gatsby"
import PropTypes from "prop-types"
import React,{ useState, useEffect } from "react"
import AerolabLogo from '../assets/aerolab-logo.svg'
import Coin from '../assets/icons/coin.svg'
import {Navbar, NavItem} from 'reactstrap'
import { of, fromEvent, animationFrameScheduler } from 'rxjs'
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  switchMap,
  throttleTime,
} from 'rxjs/operators'

import { useObservable } from 'rxjs-hooks'

const watchScroll = () =>
  of(typeof window === 'undefined').pipe(
    filter(bool => !bool),
    switchMap(() => fromEvent(window, 'scroll', { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([previous, current]) => (current < previous ? 'Up' : 'Down')),
    distinctUntilChanged()
  )

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const Header = ({ user, siteTitle }) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(
    () => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", debounce(handleScroll));
      return () => window.removeEventListener("scroll", debounce(handleScroll));
    },
    [debounce]
  );

  const scrollDirection = useObservable(watchScroll, 'Up')
  return <header className={`container-fluid ${scrollY > 80 && scrollDirection === 'Down' && 'hidden'}`}>
    
  <Navbar className="container-fluid">
    <NavItem>
      <Link to="/">
        <img className="logo" alt="logo" src={AerolabLogo}/>
      </Link>
    </NavItem>
    <NavItem>
      <div className="user-info">
        <span className="user-name">{user && user.name }</span>
        <span className="user-credits">
        {user && user.points }
          <img alt="coin" src={Coin}/>
        </span>
    </div>
    </NavItem>
  </Navbar>
</header>

}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
