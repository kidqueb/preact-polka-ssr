import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Home extends Component {
  static async getInitialProps() {
    return {
      pageProps: 'home'
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

export default Home
