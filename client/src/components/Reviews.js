import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
    return (
        <div className="row row-cols-3 mb-2 mt-3 d-flex justify-content-around">
            {reviews.length > 0 ? (
                <div className="card text-white bg-primary" style={{ maxWidth: '30%' }}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{reviews[0].name}</span>
                        <span><StarRating rating={reviews[0].rating} /></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{reviews[0].review}</p>
                    </div>
                </div>
            ) : null}

            {reviews.length > 1 ? (
                <div className="card text-white bg-primary" style={{ maxWidth: '30%' }}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{reviews[1].name}</span>
                        <span><StarRating rating={reviews[1].rating} /></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{reviews[1].review}</p>
                    </div>
                </div>
            ) : null}

            {reviews.length > 2 ? (
                <div className="card text-white bg-primary" style={{ maxWidth: '30%' }}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{reviews[2].name}</span>
                        <span><StarRating rating={reviews[2].rating} /></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{reviews[2].review}</p>
                    </div>
                </div>
            ) : null}
        </div>

    )
}

export default Reviews
