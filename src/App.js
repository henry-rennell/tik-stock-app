import GetStocks from "./components/GetStocks"
import StockChart from "./components/Chart"
import SearchBar from "./components/SearchBar"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import StockChartDetail from "./components/Chart_detail"

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Routes>
        <Route path="/" element={<GetStocks />} />
        <Route path="/stocks/:ticker" element={<StockChartDetail />} />
      </Routes>
    </div>
  )
}

export default App
