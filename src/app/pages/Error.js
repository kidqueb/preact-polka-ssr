import { h } from 'preact';
import Link from 'components/Router/Link';

const Error = () => (
  <div>
    <h1>Error</h1>
    <Link href="/">Dashboard</Link>
    <Link href="/sports/1">Sports</Link>
  </div>
);

export default Error;
