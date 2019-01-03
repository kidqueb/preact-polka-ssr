import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Error extends Component {
  static async getInitialProps() {
    return {
      title: 'Error'
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

export default Error
