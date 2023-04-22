import { useState, useEffect } from "react"
import "./SearchBar.css"
export default function SearchBar() {
  const [input, setInput] = useState("")
  const [loadStock, setLoadStock] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  const handleChange = e => {
    setInput(e.target.value)
    setError(false) // sets error message to false if you change edit the input box
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
        setData(resData)
        setError(false)
        return resData // return is used to ensure resData will be synchronous
      })
      .then(res => console.log(res["Meta Data"]["2. Symbol"]))
      .catch(e => {
        if (input !== "") {
          // prevents showing the message when the inputbox is empty
          setError(true)
        } else {
          setError(false)
        }
      })
  }, [loadStock])

  return (
    <header className="header-wrapper">
      <img src="/tikstock_logo.png" alt="" />
      <form className="search-form" onSubmit={handleSubmit} action="">
        <label htmlFor=""></label>
        <input
          className="inputbox"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <button className="search-btn">Search</button>
        <p className="error-msg">
          {error ? `${input} isn't a valid ticker symbol` : ""}
        </p>
      </form>
    </header>
  )
}
