import { h } from "preact";
import { useState } from "preact/hooks";

import Header from '../components/Header'

const Sports = () => {
  const [clicks, setClicks] = useState(0)

  return (
    <div>
      <Header title="Sports" />
      <p>{clicks}</p>
      <p>
        <button onClick={() => setClicks(clicks + 1)}>Add</button>
      </p>
    </div>
  )
}

export default Sports;
