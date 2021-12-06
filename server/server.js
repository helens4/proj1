const express = require('express')
const cors = require('cors')

require('dotenv').config()

const db = require('./db')

const morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/api/v1/restaurants', async (req, res) => {

    try {
        const data = await db.query("select restaurants.id, restaurants.name, location, price_range, avg(reviews.rating) as average, count(reviews.id) as reviews_num from restaurants join reviews on restaurants.id=reviews.restaurant_id group by restaurants.id")

        res.status(200).json({
            status: 'success',
            results: data.rows.length,
            data: {
                restaurants: data.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/v1/restaurants/:id', async (req, res) => {

    const id = req.params.id

    try {
        const restaurant = await db.query('select * from restaurants where id=$1', [id])

        const reviews = await db.query('select * from reviews where restaurant_id=$1 order by random() limit 3', [id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })

    } catch (err) {
        console.log(err)
    }
})

app.post('/api/v1/restaurants/reviews', async (req, res) => {

    const { name, review, rating, restaurant_id } = req.body


    const result = await db.query('insert into reviews (name, review, rating, restaurant_id) values ($1, $2, $3, $4) returning *', [name, review, rating, restaurant_id])


    res.status(201).json({
        status: 'success',
        data: {
            review: result.rows[0]
        }
    })
})

app.post('/api/v1/restaurants', async (req, res) => {
    console.log('dodanie restauracji')
    const { name, location, price_range } = req.body

    try {

        const result = await db.query('insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *', [name, location, price_range])

        res.status(201).json({
            status: 'success',
            data: {
                restaurant: result.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
    }



})


app.put('/api/v1/restaurants/:id', async (req, res) => {

    const { id } = req.params
    const { name, location, price_range } = req.body

    try {

        const result = await db.query('update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *', [name, location, price_range, id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: result.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
    }

})

app.delete('/api/v1/restaurants/:id', async (req, res) => {

    const { id } = req.params

    try {

        db.query('delete from restaurants where id=$1', [id])

        res.status(204).json({
            status: 'success'
        })

    } catch (err) {
        console.log(err)
    }


})

const port = process.env.PORT || 3999
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})