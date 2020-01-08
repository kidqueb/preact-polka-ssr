import { h } from "preact";
import { Link } from "wouter-preact";

import "./styles.scss";

export default () => (
	<div class="Header">
		<Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>
	</div>
);
