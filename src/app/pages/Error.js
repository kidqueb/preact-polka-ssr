import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Error extends Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/sports/1">Sports</Link>
      </div>
    )
  }
}

export default Error
