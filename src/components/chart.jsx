import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

export default function StockChart(props) {
  const [price, setPrice] = useState(0)
  const [priceTime, setPriceTime] = useState("")
  const [stockInfo, setStockInfo] = useState([])
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ])

  async function getStocks() {
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const response = await fetch(
      `https://proxy.cors.sh/https://query1.finance.yahoo.com/v8/finance/chart/${props.name}`,
      {
        headers: {
          "x-cors-api-key": "temp_9b9b92d25a6b1e8bad76565321cd83c8",
        },
      }
    ).then(res => res.json())
    return response
  }

  const chart = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        logBase: 0.1,
        // min: price * 0.97,
        // max: price * 1.02,
        min: price * 0.97,
        max:
          (Math.max.apply(
            null,
            series["0"].data.map(elem => Math.floor(Number(elem.y[0]) * 100))
          ) /
            100) *
          1.01,

        tooltip: {
          enabled: false,
        },
      },
    },
  }

  useEffect(() => {
    // let timeoutId
    // function getPrice() {
    getStocks().then(data => {
      console.log(data["chart"])
      setStockInfo(data["chart"]["result"][0]["meta"])
      setPrice(data.chart.result[0].meta.regularMarketPrice.toFixed(2))
      setPriceTime(
        new Date(
          data.chart.result[0].meta.regularMarketTime * 1000
        ).toLocaleTimeString()
      )
      const prices = data.chart.result[0].timestamp.map((time, index) => {
        return {
          x: new Date(time * 1000),
          y: [
            Number(
              data.chart.result[0].indicators.quote[0].open[index]
            ).toFixed(2),
            Number(
              data.chart.result[0].indicators.quote[0].high[index]
            ).toFixed(2),
            Number(data.chart.result[0].indicators.quote[0].low[index]).toFixed(
              2
            ),
            Number(
              data.chart.result[0].indicators.quote[0].close[index]
            ).toFixed(2),
          ],
        }
      })
      setSeries([
        {
          data: prices,
        },
      ])
      // chart.series = series

      // console.log(data["Weekly Time Series"]["2023-04-19"]["4. close"])
      //

      // timeoutId = setTimeout(() => {
      //   getPrice()
      // }, 10000)
    })
    // }

    // timeoutId = setTimeout(() => {
    //   getPrice()
    // }, 10000)

    // return () => {
    //   clearTimeout(timeoutId)
    // }
  }, [])
  // console.log(stockInfo)
  console.log(
    Math.min.apply(
      null,
      series["0"].data.map(elem => {
        if (elem.y[0] !== null && elem.y[0] !== 0) {
          return Math.floor(Number(elem.y[0]) * 100)
        }
      })
    )
  )
  // console.log(Number(price) - Number(stockInfo["chartPreviousClose"]))
  return (
    <div className="App">
      <Chart
        options={chart.options}
        // series={chart.series}
        series={series}
        type="candlestick"
        width={500}
        height={220}
      />
      <footer>
        <span className="price">Price: {price}</span>
        <span
          className={
            Number(price) - Number(stockInfo["chartPreviousClose"]) > 0
              ? "green"
              : "red"
          }
        >
          Change: ${" "}
          {(Number(price) - Number(stockInfo["chartPreviousClose"])).toFixed(
            2
          ) !== "NaN"
            ? (Number(price) - Number(stockInfo["chartPreviousClose"])).toFixed(
                2
              )
            : "Trading Halt"}
        </span>
      </footer>
      {/* <p>Stock Trading Symbol:{stockInfo["symbol"]}</p>
      <p>Stock Exchange: {stockInfo["exchangeName"]}</p>
      <p>Instrument Type: {stockInfo["instrumentType"]}</p>
      <p>Current Price:{price}</p>
      <p>Stock Trading Time :{priceTime}</p>
      <p>Previous Closing Price :{stockInfo["chartPreviousClose"]}</p> */}
    </div>
  )
}
