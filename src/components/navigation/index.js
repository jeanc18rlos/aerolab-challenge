import React, { Component } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import Card from './card.js'
import prev from '../../assets/icons/arrow-left.svg'
import next from '../../assets/icons/arrow-right.svg'
import 'sanitize.css'

class ListExample extends Component {
  constructor(props) {
    super(props)
    this.dataSet = this.props.products.map(
      (a, i) => "Record " + (i + 1)
    );

    this.pageSize = 16;
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

    this.state = {
      currentPage: 0,
      type: 'list',
      sort: 'asc',
      filteredIds: [],
      stagger: 'forward',
      spring: 'noWobble',
    };
  }

  handleClick = (index) => {
    if (index === 'prev') {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
    } else {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
    }



  }
  addToFilteredIds = id => {
    this.setState(prevState => {
      return {
        filteredIds: prevState.filteredIds.concat(id)
      }
    })
  }

  render() {
    const currentPage = this.state.currentPage
    const productsPerPage = 16;
    const numPages = Math.ceil(this.props.products.length / productsPerPage)
    const handleClick = this.handleClick

    return (
      <div className="fm-example">

        <Flipper
          flipKey={`${this.state.type}-${this.state.sort}-${JSON.stringify(
            this.state.filteredIds
          )}-${JSON.stringify(this.state.stagger)}`}
          spring={this.state.spring}
          staggerConfig={{
            default: {
              reverse: this.state.stagger !== 'forward',
              speed: 1
            }
          }}
          decisionData={this.state}
        >
          <ul className="row nav-filters">
            <li className="products-count">{this.state.currentPage * 16} of {this.props.products.length} products</li>
            <li className="filter-label">Sort by:</li>
            <li >
              <button
                className={`${this.state.sort === 'recent' && 'active'}`}
                onClick={() => {
                  this.setState({
                    sort: 'recent'
                  })
                }}
              >
                Most recent
              </button>
            </li>
            <li className="">
              <button
                className={`${this.state.sort === 'desc' && 'active'}`}
                onClick={() => {
                  this.setState({
                    sort: 'desc'
                  })
                }}
              >
                Highest price
              </button>
            </li>
            <li className="">
              <button
                className={`${this.state.sort === 'asc' && 'active'}`}
                onClick={() => {
                  this.setState({
                    sort: 'asc'
                  })
                }}
              >
                Lowest price
              </button>
            </li>

            <li className="pagination">
              {
                [
                  currentPage <= 0
                    ? ''
                    : <img key="prev-1" onClick={() => {
                      handleClick('prev')
                    }} alt="prev" src={prev}></img>,

                  currentPage >= numPages - 1
                    ? ''
                    : <img key="next-1" onClick={() => {
                      handleClick('next')
                    }} alt="next" src={next}></img>]
              }
            </li>
            <hr></hr>
          </ul>

          <Flipped flipId="list">
            <div
              className={
                this.state.type === 'grid  container-fluid'
                  ? 'fm-grid  container-fluid'
                  : 'fm-list  container-fluid'
              }
            >
              <Flipped inverseFlipId="list">
                <ul className="row list-contents">
                  <div className="clearfix"></div>
                  {[...this.props.products]
                    .filter(d => !this.state.filteredIds.includes(d._id))
                    .sort((a, b) => {
                      if (this.state.sort === 'recent') {
                        return a.index - b.index
                      }
                      if (this.state.sort === 'asc') {
                        return a.cost - b.cost
                      } else {
                        return b.cost - a.cost
                      }
                    }).slice(
                      currentPage * this.pageSize,
                      (currentPage + 1) * this.pageSize
                    )
                    .map(({ name, _id, cost, img, category }, index) => (
                      <Card
                        onRedeemProduct={this.props.onRedeemProduct}
                        id={_id}
                        cost={cost}
                        title={name}
                        canAfford={(this.props.user.points - cost) >= 0}
                        user={this.props.user}
                        category={category}
                        image={img.url}
                        stagger={['forward', 'reverse'].includes(
                          this.state.stagger
                        )}
                        type={this.state.type}
                        key={index}
                        addToFilteredIds={this.addToFilteredIds}
                      />
                    ))}
                </ul>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
        <ul className="row nav-filters">
          <li className="products-count">{this.state.currentPage * 16} of {this.props.products.length} products</li>

          <li className="pagination">
            {
              [
                currentPage <= 0
                  ? ''
                  : <img onClick={() => {
                    handleClick('prev')
                  }} alt="prev" key="prev-2" src={prev}></img>,

                currentPage >= numPages - 1
                  ? ''
                  : <img key="next-2" onClick={() => {
                    handleClick('next')
                  }} alt="next" src={next}></img>]
            }
          </li>
          <hr></hr>
        </ul>
      </div>
    )
  }
}

export default ListExample
