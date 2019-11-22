import { h } from "preact";
import { useState } from "preact/hooks";

const Foods = ({ title }) => {
  const [clicks, setClicks] = useState(0)

  return (
    <div>
      <h1>Foods</h1>
      <p>{clicks}</p>
      <p>
        <button onClick={() => setClicks(clicks + 1)}>Add</button>
      </p>
    </div>
  )
}

Foods.getInitialProps = async params => {
  return ({ title: "LETS GO FOOD" })
}

export default Foods;
