import { users } from "../data/users"

export default function Portfolio({ user, portfolioArr, setPortfolioArr }) {
  let userNameArr = users.map(elem => elem.userName)

  let portfolioIndex
  userNameArr.forEach(elem => {
    if (elem === user) {
      portfolioIndex = userNameArr.indexOf(elem)
      console.log(elem)
    }
  })
  console.log(portfolioIndex)
  if (portfolioArr.length === 0) {
    setPortfolioArr(users[portfolioIndex]["portfolio"])
  }

  //   async function getStocksPrice(stock) {
  //     // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  //     const response = await fetch(
  //       `https://proxy.cors.sh/https://query1.finance.yahoo.com/v8/finance/chart/${stock}`,
  //       {
  //         headers: {
  //           "x-cors-api-key": "temp_9b9b92d25a6b1e8bad76565321cd83c8",
  //         },
  //       }
  //     )
  //       .then(res => res.json())
  //       .then(data => data.chart.result[0].meta.regularMarketPrice.toFixed(2))
  //   }

  //   let outputStr = portfolioArr.map(elem => {})

  return (
    <div>
      The User's Current Portfolio :
      {portfolioArr.map(elem => {
        return (
          <span>
            {elem.toUpperCase()}
            &nbsp; &nbsp; {/* {getStocksPrice(elem)} */}
          </span>
        )
      })}
    </div>
  )
}
