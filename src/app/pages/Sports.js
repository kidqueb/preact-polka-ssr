import { h, Component } from 'preact'
import { Link } from 'preact-router/match'

class Sports extends Component {
  static async getInitialProps({ params }) {
    return {
      id: params.id
    }
  }

  render({ id }) {
    return (
      <div>
        <h1>ID: {id}</h1>

        <Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>
      </div>
    )
  }
}

export default Sports
