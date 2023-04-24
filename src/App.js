import GetStocks from "./components/GetStocks"
import StockChart from "./components/Chart"
import SearchBar from "./components/SearchBar"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import StockChartDetail from "./components/Chart_detail"
import { useState } from "react"
import LoginIn from "./components/LoginIn"
import { users } from "./data/users"
import Portfolio from "./components/Portfolio"

function App() {
  const [user, setUser] = useState(null)
  const [portfolioArr, setPortfolioArr] = useState([])

  return (
    <div className="App">
      {user === null ? (
        <div>
          <LoginIn setUser={setUser} />
        </div>
      ) : (
        <div>
          {/* <p>Login as: {user}</p> */}
          <SearchBar />
          <Portfolio
            user={user}
            portfolioArr={portfolioArr}
            setPortfolioArr={setPortfolioArr}
          />
          <Routes>
            <Route
              path="/"
              element={
                <GetStocks
                  portfolioArr={portfolioArr}
                  setPortfolioArr={setPortfolioArr}
                />
              }
            />
            <Route path="/stocks/:ticker" element={<StockChartDetail />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
