import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";

const createCardFlipId = index => `listItem-${index}`;

const shouldFlip = index => (prev, current) =>
  index === prev || index === current;

const ListItem = ({ index, item, onClick }) => {
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      shouldInvert={shouldFlip(index)}
    >
      <div className="light-border  listItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="listItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              shouldFlip={shouldFlip(index)}
              delayUntil={createCardFlipId(index)}
            >
              <div className="avatar" style={{ background: `url(${item.img.url})` }} />
            </Flipped>
            <div className="description">
              {Object.keys(item).slice(0, 3).map(i => (
                <Flipped
                  flipId={`description-${index}-${i}`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                  <div style={{ wordBreak: 'break-all' }}>
                    <b>{i} : </b>
                    {item[i]}
                  </div>
                </Flipped>
              ))}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

const ExpandedListItem = ({ index, item, onClick }) => {
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("animated-in");
        }, 400);
      }}
    >
      <div className="expandedListItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="expandedListItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              delayUntil={createCardFlipId(index)}
            >
              <div style={{ background: `url(${item.img.url})` }} className="avatar avatarExpanded" />
            </Flipped>
            <div className="description">
              {Object.keys(item).slice(0, 3).map(i => (
                <Flipped
                  flipId={`description-${index}-${i}`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >

                  <div>
                    <b>{i} :  </b>
                    {item[i]}
                  </div>
                </Flipped>

              ))}
            </div>
            <div className="additional-content">
              <div>
                <b>category :  </b>
                {item['category']}
              </div>
              <div>
                <b>created date :  </b>
                {item['createDate']}
              </div>
              <div>
                <b>HD Img :  </b>
                <img style={{ width: '100%' }} src={item['img'].url} />
              </div>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

class AnimatedList extends Component {
  state = { focused: null };
  onClick = index =>
    this.setState({
      focused: this.state.focused === index ? null : index
    });
  render() {
    return (
      <Flipper
        flipKey={this.state.focused}
        className="staggered-list-content"
        spring="gentle"
        staggerConfig={{
          card: {
            reverse: this.state.focused !== null
          }
        }}
        decisionData={this.state.focused}
      >
        <ul className="list">
          {this.props.listData.map((item, index) => {
            return (
              <li key={index}>
                {index === this.state.focused ? (
                  <ExpandedListItem
                    item={item}
                    index={this.state.focused}
                    onClick={this.onClick}
                  />
                ) : (
                    <ListItem item={item} index={index} key={index} onClick={this.onClick} />
                  )}
              </li>
            );
          })}
        </ul>
      </Flipper>
    );
  }
}

export default AnimatedList;
