import { h, Component } from 'preact';
import { connect, bindActionScope } from '../../shared/store';

import '../styles/other.scss';
import {
  addSport,
  deleteSport,
  setActiveIndex
} from '../../shared/store/containers/sports';
import Header from '../components/Header';

class Sports extends Component {
  static async getInitialProps({ params }) {
    return {
      title: `Sport ${params.id}`
    };
  }

  static setHead = ({ id }) => ({
    title: `Sport ${id}`
  });

  state = {
    sportVal: ''
  };

  handleAdd = () => {
    this.props.addSport(this.state.sportVal);
    this.setState({ sportVal: '' });
  };

  render({ title, list, activeIndex, ...dispatch }, { sportVal }) {

    return (
      <div>
        <Header title={title} />

        {list.length > 0 && (
          <ul>
            {list.map((item, i) => (
              <li
                key={item}
                style={{ fontWeight: i === activeIndex ? 'bold' : 'normal' }}
              >
                <button onClick={() => dispatch.deleteSport(item)}>x</button>
                {item}
                <button onClick={() => dispatch.setActiveIndex(i)}>
                  activate
                </button>
              </li>
            ))}
          </ul>
        )}

        <p>activeIndex: {activeIndex}</p>

        <p>
          <label for="name">Sport name:</label>
          <input
            id="name"
            value={sportVal}
            onChange={e => {
              this.setState({ sportVal: e.target.value });
            }}
          />
          <button onClick={this.handleAdd}>Add sport</button>
        </p>
      </div>
    );
  }
}

const mapState = ({ sports }) => ({
  list: sports.list,
  activeIndex: sports.activeIndex
});

const actions = () =>
  bindActionScope('sports', [addSport, deleteSport, setActiveIndex]);

export default connect(
  mapState,
  actions
)(Sports);
