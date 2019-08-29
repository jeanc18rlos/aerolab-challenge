import React, { PureComponent } from "react";
import { Flipped, spring } from "react-flip-toolkit";
import coin from '../../assets/icons/coin.svg'
import store from '../../assets/icons/buy-blue.svg'
import storeActive from '../../assets/icons/buy-white.svg'

const onElementAppear = (el, index) =>
  spring({
    onUpdate: val => {
      el.style.opacity = val;
    },
    delay: index * 50
  });

const onExit = type => (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: val => {
      el.style.transform = `opacity 0`;
    },
    delay: index * 50,
    onComplete: removeElement
  });

  return () => {
    el.style.opacity = "";
    removeElement();
  };
};

const onGridExit = onExit("grid");
const onListExit = onExit("list");

class Card extends PureComponent {
  shouldFlip = (prev, current) => {
    if (prev.type !== current.type) {
      return true;
    }
    return false;
  };
  render() {
    const { id, cost, image, title, category, type, stagger } = this.props;
    const flipId = `item-${id}`;
    return (
      <Flipped
        flipId={flipId}
        onAppear={onElementAppear}
        onExit={type === "grid" ? onGridExit : onListExit}
        key={flipId}
        stagger={stagger}
        shouldInvert={this.shouldFlip}
      >
        <li className={`${this.props.canAfford ? '' : 'static-card'} fm-item col-lg-3 col-md-4 col-sm-6 col-xs-12`}>
          <Flipped inverseFlipId={flipId}>
            <div className="card-body">
              <Flipped
                flipId={`${flipId}-content`}
                translate
                shouldFlip={this.shouldFlip}
                delayUntil={flipId}
              >
                <div className="col-md-12">
                  {(this.props.user.points - cost) >= 0
                    ? <div className="card-overlay">
                      <div className="card-header-main" style={{ textAlign: 'right' }}>
                        <img className="buy-button" alt="buy" src={storeActive}></img>
                      </div>
                      <div>
                        <div style={{ fontSize: '36px', color: '#ffffff', letterSpacing: '-0.08px', margin: 'auto', right: 0, height: '30%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>{cost} <img alt="coin" src={coin} style={{ width: '34px', margin: '.25em' }} /></div><span style={{ fontSize: '18px', color: '#616161', letterSpacing: '-0.04px', textAlign: 'center', width: '95%', margin: 'auto', whiteSpace: 'nowrap' }}
                          onClick={() => {
                            this.props.onRedeemProduct({ cost, id })
                          }}

                        >Redeem offer</span>
                      </div>

                    </div>
                    : null
                  }
                  <div className="card-header-main">
                    {
                      (this.props.user.points - cost) >= 0 ?
                        <img alt="buy" className="buy-button active" src={store}></img> :
                        <span className="cant-afford">you need {cost - this.props.user.points} <img alt="coin" src={coin} style={{ width: '20px', margin: '.25em' }} /></span>

                    }

                  </div>
                  <img alt={title} src={image}></img>
                  <hr></hr>
                  <h3>{category}</h3>
                  <p>{title}</p>
                </div>
              </Flipped>
              <Flipped
                flipId={`${flipId}-button`}
                shouldFlip={this.shouldFlip}
                delayUntil={flipId}
              >

              </Flipped>
            </div>
          </Flipped>
        </li>
      </Flipped>
    );
  }
}

export default Card;
