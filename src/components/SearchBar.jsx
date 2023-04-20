import { useState } from "react"

export default function SearchBar() {
  const [search, setSearch] = useState("")

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const getStock = () => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${search}&apikey=${process.env.REACT_APP_VANTAGE_KEY}`
    )
      .then(res => res.json())
      .then(res => console.log(res))
  }

  return (
    <div>
      <form action="">
        <label htmlFor=""></label>
        <input type="text" onChange={handleChange} />
        <button onClick={getStock}>Search</button>
      </form>
      <p></p>
    </div>
  )
}
