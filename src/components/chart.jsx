import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

export default function StockChart() {
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
        logBase: 0.5,
        min: 165,
        max: 170,
        function(min) {
          return 150
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  }

  async function getStocks() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const response = await fetch(
      `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/aapl`
    ).then(res => res.json())
    return response
  }

  const [price, setPrice] = useState(0)
  const [priceTime, setPriceTime] = useState("")
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ])
  useEffect(() => {
    let timeoutId
    // function getPrice() {
    getStocks().then(data => {
      // console.log(data["chart"]["result"][0]["meta"]["regularMarketPrice"])

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
            ).toFixed(4),
            Number(
              data.chart.result[0].indicators.quote[0].high[index]
            ).toFixed(4),
            Number(data.chart.result[0].indicators.quote[0].low[index]).toFixed(
              4
            ),
            Number(
              data.chart.result[0].indicators.quote[0].close[index]
            ).toFixed(4),
          ],
        }
      })
      setSeries([
        {
          data: prices,
        },
      ])
      // chart.series = series
      console.log(
        typeof new Date(data.chart.result[0].meta.regularMarketTime * 1000)
      )
      // console.log(data["Weekly Time Series"]["2023-04-19"]["4. close"])
      //

      // timeoutId = setTimeout(() => {
      //   getPrice()
      // }, 10000)
    })
    // }
    console.log(priceTime)
    // timeoutId = setTimeout(() => {
    //   getPrice()
    // }, 10000)

    // return () => {
    //   clearTimeout(timeoutId)
    // }
  }, [])
  return (
    <div className="App">
      <Chart
        options={chart.options}
        // series={chart.series}
        series={series}
        type="candlestick"
        width={500}
        height={320}
      />
      {price}
      <p>{priceTime}</p>
    </div>
  )
}
