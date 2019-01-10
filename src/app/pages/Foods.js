import { h, Component } from 'preact'
import { connect, bindActionScope } from '../../shared/store'

import foodActions from '../../shared/store/containers/foods'
import Header from '../components/Header'

class Foods extends Component {
  static async getInitialProps() {
    console.log('fooods')

    return {
      title: 'Foods'
    }
  }

  static setHead = () => ({
    title: 'Foods'
  })

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
        <Header title={title} />

        {list.length > 0 && (
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
          <label for="name">Food name:</label>
          <input id="name" value={foodVal} onChange={e => { this.setState({ foodVal: e.target.value }) }} />
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

const actions = () => bindActionScope('foods', foodActions)

export default connect(mapState, actions)(Foods)
