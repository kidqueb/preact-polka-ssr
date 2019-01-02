import { h, Component } from 'preact'

class Home extends Component {
  static async getInitialProps() {
    return {
      pageProps: 'home'
    }
  }

  render() {
    return (
      <button onClick={() => console.log('asd')}>{this.props.pageProps}</button>
    )
  }
}

export default Home
