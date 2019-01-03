import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Discover extends Component {
  static async getInitialProps({ params }) {
    return {
      id: params.id
    }
  }

  render({ id }) {
    return (
      <div>
        <h1>ID: {id}</h1>

        <Link href="/">Dashboard</Link>
        <Link href="/discover/1">Discover</Link>
      </div>
    )
  }
}

export default Discover
