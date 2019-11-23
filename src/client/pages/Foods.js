import { h } from "preact";
import { useState } from "preact/hooks";
import useStoreon from "storeon/preact"

const Foods = ({ title }) => {
  const [clicks, setClicks] = useState(0)
  const { dispatch, foods } = useStoreon('foods')

  return (
    <div>
      <h1>{ title }</h1>
      
      <div>
        {foods.list.map(food => <p>{food}</p>)}
      </div>

      <p>{clicks}</p>
      <p>
        <button onClick={() => setClicks(clicks + 1)}>Add</button>
      </p>
    </div>
  )
}

Foods.getInitialProps = async ({ params, store }) => {
  store.dispatch('foods/SET_LIST', ["apple", "orange", "banana", "meatloaf"])
  return ({ title: "LETS GO FOOD" })
}

export default Foods;
