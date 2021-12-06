
import { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [pricerange, setPricerange] = useState(0)
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)

    const addRestaurant = async (e) => {
        e.preventDefault()

        const data = {
            name,
            location,
            price_range: pricerange
        }

        try {
            const response = await RestaurantFinder.post('/', data)
            const tmp = [...restaurants, response.data.data.restaurant]
            setRestaurants(tmp)

        } catch (err) {
            console.log(err)
        }



        setName('')
        setLocation('')
        setPricerange(0)
    }

    return (
        <div>
            <form className="d-flex justify-content-center mt-5 bg-warning">
                <input className="m-1" type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
                <input className="m-1" type="text" placeholder="location" value={location} onChange={e => setLocation(e.target.value)} />

                <select className="m-1" value={pricerange} onChange={e => setPricerange(e.target.value)}>
                    <option disabled value="0">Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>

                <button className="btn btn-primary m-1" onClick={addRestaurant}>Add</button>
            </form>

        </div>
    )
}

export default AddRestaurant
