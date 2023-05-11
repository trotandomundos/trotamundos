const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    maxlength: 20
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  comment: {
    type: String,
    required: true,
    maxlength: 150
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // GeoJSON: https://www.mongodb.com/docs/manual/reference/geojson/
  location: {
    type: {
      type: String // Point, Line, Polygon...
    },
    coordinates: [Number] // Lng [-180 to 180]  - Lat [-90 to 90]
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;