const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "conextion error:"))
db.once("open", () => {
  console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  /* const c = new Campground({ title: "purple field" })
  await c.save() */

  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20 + 10)
    const camp = new Campground({
      author: "6321943e640b126a16f1f7b0",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dbxci91ws/image/upload/v1663393070/YelpCamp/htbyrizbnvhuzn7rva9j.jpg",
          filename: "YelpCamp/htbyrizbnvhuzn7rva9j",
        },
        {
          url: "https://res.cloudinary.com/dbxci91ws/image/upload/v1663393071/YelpCamp/cqdvbnw1adrc9rvd0dbq.jpg",
          filename: "YelpCamp/cqdvbnw1adrc9rvd0dbq",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti eaque explicabo repellendus dolore ipsa ab atque autem earum dolores rem.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
