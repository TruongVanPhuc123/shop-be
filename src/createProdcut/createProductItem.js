const { default: mongoose } = require("mongoose");
const ProductItem = require("../model/ProductItem");
const Product = require("../model/Product");
const { faker } = require("@faker-js/faker");

const mongodbUrl =
  "mongodb+srv://tvphuc2k4:tvphuc2k4@cluster0.usqu2x8.mongodb.net/shop";
mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Connected to MongoDB: " + mongodbUrl))
  .catch((e) => console.log(e));

const createProductItem = async () => {
  const products = await Product.find({});

  const productIds = products.map((e) => {
    return { id: e._id };
  });

  console.log("creating...");

  productIds.forEach(async (e) => {
    await ProductItem.create({
      productId: e.id,
      color: faker.color.human(),
      size: "XL",
      price: Math.floor(Math.random() * 500) + 1,
      quantity: Math.floor(Math.random() * 100) + 10,
    });
  });

  console.log("done !");
};

createProductItem();
