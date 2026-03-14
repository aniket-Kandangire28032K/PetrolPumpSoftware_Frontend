import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="error-page">
        <h1>404</h1>
        <h2>Somthing Went Wrong</h2>
        <p>Error this Page Does not exist or moved to other location</p>
        <p className="link-para"><Link to='/home'>Home</Link> | <Link to='/sales' >Sales</Link></p>
    </div>
  )
}

export default Error