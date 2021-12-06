import { useState } from 'react'

const AddReview = (props) => {

    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")

    return (
        <div>
            <form>
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="name"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label> <br />
                        <select
                            id="rating"
                            className="custom-select"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        id="review"
                        className="form-control"
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={(e) => props.addReview(e, name, reviewText, rating)}
                >Zapisz
                </button>
            </form>

        </div>
    )
}

export default AddReview
