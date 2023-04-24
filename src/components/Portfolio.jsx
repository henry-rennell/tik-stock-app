import { users } from "../data/users"
import { Link } from "react-router-dom"
import "./Portfolio.css"
export default function Portfolio({ user, portfolioArr, setPortfolioArr }) {
  let userNameArr = users.map(elem => elem.userName)


  let portfolioIndex
  userNameArr.forEach(elem => {
    if (elem === user) {
      portfolioIndex = userNameArr.indexOf(elem)
    }
  })

  if (portfolioArr.length === 0) {
    setPortfolioArr(users[portfolioIndex]["portfolio"])
  }


  return (
    <div className="portfolio-bar">
      <span>The User's Current Portfolio:</span> 
      {portfolioArr.map(elem => {
        return (
          <span><Link style={{ textDecoration: 'none' }} to={"/stocks/" + elem.toUpperCase()}>{elem.toUpperCase()}&nbsp; &nbsp;</Link></span>
        )
      })}
    </div>
  )
}
