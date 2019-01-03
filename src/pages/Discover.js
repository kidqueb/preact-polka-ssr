import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Discover extends Component {
  static async getInitialProps() {
    return {
      pageProps: 'discover'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.pageProps}</h1>

        <Link href="/">Dashboard</Link>
        <Link href="/discover">Discover</Link>
      </div>
    )
  }
}

export default Discover
