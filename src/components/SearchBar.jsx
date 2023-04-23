import { useState, useEffect } from "react"
import "./SearchBar.css"
import StockChartDetail from "./chart_detail"
import GetStocks from "./GetStocks"

export default function SearchBar() {
  const [typeBox, setTypeBox] = useState("")
  let [input, setInput] = useState("")
  const [loadStock, setLoadStock] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [searchResult, setSearchResult] = useState("")
  const [isStockDetail, setIsStockDetail] = useState(false)

  const handleChange = e => {
    setTypeBox(e.target.value)
    // setError(false) // sets error message to false if you change edit the input box
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(e["target"]["0"]["value"])

    setLoadStock(e["target"]["0"]["value"])
    setIsStockDetail(true)
    setInput(e["target"]["0"]["value"])
  }

  const handleBackHome = e => {
    setIsStockDetail(false)
  }

  // const handleKeyDown = event => {
  //   if (event.key === "Enter") {
  //     setLoadStock(input)
  //   }
  // }

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${input}&apikey=RWCORGXLMZDUAKMW`
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
        <img src="/tikstock_logo.png" alt="" />
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
        <button
          className="return-home"
          style={
            isStockDetail ? { display: "inline-block" } : { display: "none" }
          }
          onClick={handleBackHome}
        >
          return homepage
        </button>
      </header>
      {isStockDetail ? (
        <div>
          <StockChartDetail name={input} setSearchResult={setSearchResult} />
        </div>
      ) : (
        <div>
          <GetStocks />
        </div>
      )}
    </div>
  )
}
