import { Suspense } from 'react'
import './App.css'
import Main from './layout/Main'
import Navbar from './layout/Navbar.jsx'
import TopNavbar from './layout/TopNavbar.jsx'
import Loading from './layout/Loading.jsx'


function App() {
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <TopNavbar/>
    <nav>
      <Navbar/>
    </nav>
    <main>
      <Main/>
    </main>  
    </Suspense>
    </>
  )
}

export default App
