const database = require("./database");
const uuid = require("uuid");

const fake_listing = {
  UUID: uuid.v4(),
  created_by: "6f853eaa-1647-47e1-9303-0d363b606ccf",
  address: "123 Fake Street",
  price: 100000,
  square_meters: 100,
  description: "This is a fake listing",
  image_url: "https://generatorfun.com/code/uploads/Random-House-image-7.jpg",
};

database
  .getInstance()
  .create_listing(
    fake_listing.UUID,
    fake_listing.created_by,
    fake_listing.address,
    fake_listing.price,
    fake_listing.square_meters,
    fake_listing.description,
    fake_listing.image_url
  );
