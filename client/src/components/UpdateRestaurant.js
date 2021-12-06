import { useParams } from "react-router"
import { useEffect, useState } from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import { useNavigate } from 'react-router-dom';


const UpdateRestaurant = () => {

    const [data, setData] = useState({})
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await RestaurantFinder.get('/' + params.id)
                setData(result.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()


    }, [])


    const updateHandler = async (e) => {

        e.preventDefault()
        try {
            const result = await RestaurantFinder.put('/' + params.id, data)
            navigate('/')

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <form className="d-flex justify-content-center mt-5 bg-warning">
                <input className="m-1" type="text" placeholder="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                <input className="m-1" type="text" placeholder="location" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} />

                <select className="m-1" value={data.price_range} onChange={e => setData({ ...data, price_range: e.target.value })}>
                    <option disabled value="0">Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>

                <button className="btn btn-primary m-1" onClick={updateHandler}>Update</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
