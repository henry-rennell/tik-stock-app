import { useState, useEffect } from "react"
import "./SearchBar.css"
import StockChartDetail from "./Chart_detail"
import GetStocks from "./GetStocks"
import { Link, useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [typeBox, setTypeBox] = useState("")
  let [input, setInput] = useState("")
  const [loadStock, setLoadStock] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [searchResult, setSearchResult] = useState("")
  const [isStockDetail, setIsStockDetail] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setTypeBox(e.target.value)
  }

  const handleBackHome = () => {
    navigate(`/`)
  }

  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/stocks/${typeBox}`)
    setLoadStock(typeBox)
    setTypeBox("")
  }

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${typeBox}&apikey=RWCORGXLMZDUAKMW`
    )
      .then(res => res.json())
      .then(resData => {
        // console.log(resData)
        // setData(resData)

        setError(false)
        setInput(resData["Meta Data"]["2. Symbol"])
        // return resData // return is used to ensure resData will be synchronous
      })
      // .then(res => )
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
    <div>
      <header className="header-wrapper">
        <img src="/tikstock_logo.png" alt="" onClick={handleBackHome} />
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor=""></label>
          <input
            className="inputbox"
            value={typeBox}
            onChange={handleChange}
            // onKeyDown={handleKeyDown}
            type="text"
          />
          <button className="search-btn">Search</button>

          <p className="error-msg">
            {error ? `${input} isn't a valid ticker symbol` : ""}
          </p>
        </form>
      </header>
    </div>
  )
}
