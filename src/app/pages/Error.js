import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Error extends Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/discover/1">Discover</Link>
      </div>
    )
  }
}

export default Error
