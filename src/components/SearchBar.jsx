import { useState, useEffect } from "react"
import "./SearchBar.css"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [typeBox, setTypeBox] = useState("")
  const [loadStock, setLoadStock] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setTypeBox(e.target.value)
    if(error && typeBox !== '') {
      setError(false)
    }
  }

  const handleBackHome = () => {
    navigate(`/`)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoadStock(typeBox)
  }

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${typeBox}&apikey=RWCORGXLMZDUAKMW`
    )
      .then(res => res.json())
      .then(resData => {
        setError(false)
        setTypeBox(resData["Meta Data"]["2. Symbol"])
        // return resData // return is used to ensure resData will be synchronous
      })
      .then(res => {
        navigate(`/stocks/${typeBox}`)
      })
      .catch(e => {
        if (typeBox !== "") {
          // prevents showing the message when the inputbox is empty
          setError(true)
        } else {
          setError(false)
        }
      })
  }, [loadStock])

  return (
    <div>
      <header className="header-wrapper">
        <img src="/tikstock_logo.png" alt="" onClick={handleBackHome} />
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor=""></label>
          <input
            className="inputbox"
            value={typeBox}
            onChange={handleChange}
            type="text"
          />
          <button className="search-btn">Search</button>

          <p className="error-msg">
            {error ? `${typeBox} isn't a valid ticker symbol` : ""}
          </p>
        </form>
      </header>
    </div>
  )
}
