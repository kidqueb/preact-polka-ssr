import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import { connect, bindActions } from '../../shared/store'

import foodActions from '../../shared/store/containers/foods'

class Foods extends Component {
  static async getInitialProps() {
    return {
      title: 'Foods'
    }
  }

  static head = {
    title: 'asd'
  }

  state = {
    foodVal: ''
  }

  handleAdd = () => {
    this.props.addFood(this.state.foodVal)
    this.setState({ foodVal: '' })
  }

  render(props, { foodVal }) {
    const { title, list, activeIndex, ...dispatch } = props

    return (
      <div>
        <Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>

        <h1>{title}</h1>

        {list && (
          <ul>
            {list.map((item, i) => (
              <li key={item} style={i === activeIndex && { fontWeight: 'bold' }}>
                <button onClick={() => dispatch.deleteFood(item)}>x</button>
                {item}
                <button onClick={() => dispatch.setActiveIndex(i)}>activate</button>
              </li>
            ))}
          </ul>
        )}
        <p>activeIndex: {activeIndex}</p>

        <p>
          <input value={foodVal} onChange={e => { this.setState({ foodVal: e.target.value }) }} />
          <button onClick={this.handleAdd}>Add food</button>
        </p>
      </div>
    )
  }
}

const mapState = ({ foods }) => ({
  list: foods.list,
  activeIndex: foods.activeIndex
})

const actions = () =>
  bindActions('foods', foodActions)

export default connect(mapState, actions)(Foods)
