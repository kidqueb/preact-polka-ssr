import { h } from "preact";
import { Link } from "wouter-preact";

import "./styles.scss";

export default ({ title }) => (
	<div class="Header">
		<Link href="/">Foods</Link> | <Link href="/sports/1">Sports</Link>
		<h1>{title}</h1>
	</div>
);
