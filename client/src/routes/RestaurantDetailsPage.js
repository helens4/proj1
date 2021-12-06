import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder'
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailsPage = () => {

    const params = useParams()
    const [data, setData] = useState({})
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    const addReview = async (e, name, review, rating) => {

        e.preventDefault()

        const newReview = {
            name,
            review,
            rating,
            restaurant_id: data.id
        }

        try {
            const response = await RestaurantFinder.post('/reviews', newReview)
            const tmp = [...reviews, response.data.data.review]
            setReviews(tmp)
            navigate('/')

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await RestaurantFinder.get('/' + params.id)
                setData(result.data.data.restaurant)
                setReviews(result.data.data.reviews)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()


    }, [])

    return (
        <div>
            <h1 className="mt-4 mb-4 text-center text-primary">{data.name}</h1>
            <Reviews reviews={reviews} />
            <AddReview addReview={addReview} />
        </div>
    )
}

export default RestaurantDetailsPage
