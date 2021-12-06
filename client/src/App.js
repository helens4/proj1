import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RestaurantDetailsPage from './routes/RestaurantDetailsPage'
import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

const App = () => {

    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/restaurants/:id/update" element={<UpdatePage />} />
                        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App

