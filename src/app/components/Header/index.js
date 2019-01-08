import { h } from 'preact'
import { Link } from 'preact-router/match'

import './styles.scss'

export default ({ title }) => {
  return (
    <div class="Header">
      <Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>
      <h1>{title}</h1>
    </div>
  )
}
