import './App.css'
import Main from './layout/Main'
import Navbar from './layout/Navbar.jsx'
import TopNavbar from './layout/TopNavbar.jsx'
function App() {
  return (
    <>
    <TopNavbar/>
    <nav>
      <Navbar/>
    </nav>
    <main>
      <Main/>
    </main>  
    </>
  )
}

export default App
