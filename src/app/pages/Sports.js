import { h } from "preact";
import { useState } from "preact/hooks";

const Sports = () => {
  const [clicks, setClicks] = useState(0)

  return (
    <div>
      <h1>Sports</h1>
      <p>{clicks}</p>
      <p>
        <button onClick={() => setClicks(clicks + 1)}>Add</button>
      </p>
    </div>
  )
}

Sports.getInitialProps = async params => {
  return ({ title: "LETS GO SPORTS" })
}

export default Sports;
