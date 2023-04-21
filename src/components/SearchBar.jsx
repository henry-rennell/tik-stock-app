import { useState, useEffect } from "react"
import "./SearchBar.css"
export default function SearchBar() {
  const [input, setInput] = useState("tsla")
  const [loadStock, setLoadStock] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setInput(e["target"]["0"]["value"])
    setLoadStock(input)
  }

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      setLoadStock(input)
    }
  }

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${input}&apikey=${process.env.REACT_APP_VANTAGE_KEY}`
    )
      .then(res => res.json())
      .then(resData => {
        console.log(resData)
        setData(resData)
        setError(false)
        return resData
      })
      .then(res => console.log(res["Meta Data"]["2. Symbol"]))
      .catch(e => {
        setError(true)
      })
  }, [loadStock])

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor=""></label>
        <input
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <button>Search</button>
      </form>
      <p className="error-msg">
        {error ? `${input} isn't a valid ticker symbol, please try again` : ""}
      </p>
    </div>
  )
}
