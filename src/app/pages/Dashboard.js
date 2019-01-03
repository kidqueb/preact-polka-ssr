import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Dashboard extends Component {
  static async getInitialProps() {
    return {
      title: 'dashboard'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>

        <Link href="/">Dashboard</Link>
        <Link href="/discover/1">Discover</Link>
      </div>
    )
  }
}

export default Dashboard
