import { h } from "preact";
import { useState } from "preact/hooks";
import { Link } from "wouter-preact";

import NestedRouter from "../components/NestedRouter"
import SportsNested from "./SportsNested"

const Sports = ({ req, params }) => {
  const [clicks, setClicks] = useState(0);

	return (
		<div>
			<h1>Sports</h1>
			<code>
				ID: {params.id}<br />
				Segment: {params.segment}
			</code>
			<p>{clicks}</p>
			<p>
				<button onClick={() => setClicks(clicks + 1)}>Add</button>
			</p>

      <Link href="asd">asd</Link>
      
			<NestedRouter base="/sports" req={req}>
				<SportsNested path="/asd/:what?" />
			</NestedRouter>
		</div>
	);
};

Sports.getInitialProps = async params => {
	return { title: "LETS GO SPORTS" };
};

export default Sports;
