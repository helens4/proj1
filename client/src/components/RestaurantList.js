import { useEffect, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';


const RestaurantList = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
                console.log(response.data.data.restaurants)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()

    }, [])

    const deleteHandler = async (e, id) => {
        e.stopPropagation()
        try {
            await RestaurantFinder.delete('/' + id)
        } catch (err) {
            console.log(err)
        }

        const tmp = [...restaurants].filter(restaurant => restaurant.id !== id)
        setRestaurants(tmp)

    }

    const updateHandler = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        navigate('/restaurants/' + id)
    }


    return (
        <div>
            <table className="table table-hover mt-5">
                <thead className="bg-primary text-warning">
                    <tr>
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Price Range</th>
                        <th>Ratings</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => (
                        <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{'$'.repeat(restaurant.price_range)}</td>
                            <td><StarRating rating={restaurant.average} num={restaurant.reviews_num} /></td>
                            <td><button className="btn btn-warning" onClick={(e) => updateHandler(e, restaurant.id)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => deleteHandler(e, restaurant.id)}>Delete</button></td>

                        </tr>
                    )
                    )}


                </tbody>
            </table>

        </div>
    )
}

export default RestaurantList
