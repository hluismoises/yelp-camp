const { number } = require("joi")
const Joi = require("joi")

//This is not a mongoose schema, it only validate the information before create the schema
module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    //image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
})

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required(),
  }).required(),
})
