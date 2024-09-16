const csv = require("csvtojson");
const { faker } = require("@faker-js/faker");
const Product = require("../model/Product");
const { default: mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const mongodbUrl =
  "mongodb+srv://tvphuc2k4:tvphuc2k4@cluster0.usqu2x8.mongodb.net/shop";
mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Connected to MongoDB: " + mongodbUrl))
  .catch((e) => console.log(e));

cloudinary.config({
  cloud_name: "dm88fvsss",
  api_key: "862182755269353",
  api_secret: "YuMTNQ96rroZ8J1BxvuqS5pJ_Yo",
});

const createProduct = async () => {
  let data = await csv().fromFile("images.csv");
  data = data.slice(0, 100).map((e) => {
    return { image: e.image };
  });

  console.log("creating...");

  data.forEach(async (e) => {
    const image = await cloudinary.uploader
      .upload(`../images/images_compressed/${e.image}.jpg`)
      .catch((e) => console.log(e));

    const url = cloudinary.url(image.public_id, {
      transformation: [
        { quality: "auto", fetch_format: "auto" },
        { width: 500, height: 600 },
      ],
    });

    await Product.create({
      name: faker.commerce.productName(),
      brand: "Adidas",
      image: `${url}`,
      description: faker.commerce.productDescription(),
      category: "Trousers",
    });
  });

  console.log("done !");
};

createProduct();
