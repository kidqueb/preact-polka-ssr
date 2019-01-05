import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import { connect } from '../../shared/store'

import { addFood, setActiveIndex } from '../../shared/store/containers/foods'

class Foods extends Component {
  static async getInitialProps() {
    return {
      title: 'Foods'
    }
  }

  render(props, state) {
    const { title, foods, ...dispatch } = props

    return (
      <div>
        <h1>{title}</h1>
        <p>list: {foods.list}</p>
        <p>active: {foods.activeIndex}</p>

        <button onClick={() => dispatch.setActiveIndex(foods.activeIndex + 1)}>Up index</button>

        <Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>
      </div>
    )
  }
}

const actions = () => ({ addFood, setActiveIndex })

const connectedComponent = connect(["foods"], actions)(Foods)
connectedComponent.getInitialProps = Foods.getInitialProps

export default connectedComponent
