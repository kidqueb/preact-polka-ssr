import { h, Component } from 'preact'
import { connect, bindActions } from '../../shared/store'

import '../styles/other.scss'
import { addSport, deleteSport, setActiveIndex } from '../../shared/store/containers/sports'
import Header from '../components/Header'

class Sports extends Component {
  static async getInitialProps({ params }) {
    console.log('spooorts')
    return {
      title: `Sport ${params.id}`
    }
  }

  static setHead = ({ id }) => ({
    title: `Sport ${id}`
  })

  state = {
    sportVal: ''
  }

  handleAdd = () => {
    this.props.addSport(this.state.sportVal)
    this.setState({ sportVal: '' })
  }

  render({ title, list, activeIndex, ...dispatch }, { sportVal }) {
    return (
      <div>
        <Header title={title} />

        {list.length > 0 && (
          <ul>
            {list.map((item, i) => (
              <li key={item} style={i === activeIndex && { fontWeight: 'bold' }}>
                <button onClick={() => dispatch.deleteSport(item)}>x</button>
                {item}
                <button onClick={() => dispatch.setActiveIndex(i)}>activate</button>
              </li>
            ))}
          </ul>
        )}

        <p>activeIndex: {activeIndex}</p>

        <p>
          <input
            value={sportVal}
            onChange={e => { this.setState({ sportVal: e.target.value }) }}
          />
          <button onClick={this.handleAdd}>Add sport</button>
        </p>
      </div>
    )
  }
}

const mapState = ({ sports }) => ({
  list: sports.list,
  activeIndex: sports.activeIndex
})

const actions = () =>
  bindActions('sports', [addSport, deleteSport, setActiveIndex])

export default connect(mapState, actions)(Sports)
