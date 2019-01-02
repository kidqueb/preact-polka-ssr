import { h, Component } from 'preact'

class Discover extends Component {
  static async setHead() {
    return {
      title: "Discover"
    }
  }

  static async getInitialProps() {
    return {
      pageProps: 'discover'
    }
  }

  render() {
    return (
      <p>{this.props.pageProps}</p>
    )
  }
}

export default Discover
