import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/index.jsx'
import routes from './routes'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          {
            routes.map((route) => (
              <Route key={route.path} path={route.path} element={<RouteElement route={route} />} />


            ))
          }
        </Routes>
      </BrowserRouter>


    </div>
  )
}

const RouteElement = ({ route }) => {
  return route.isProtected ? (<ProtectedRoute>{route.element}</ProtectedRoute>) : route.element
}

export default App
