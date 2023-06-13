<template>
  <h1>Créer une annonce</h1>

  <div class="form-container">
    <form class="form" @submit.prevent="submitForm">
      <label>
        Title
        <input v-model="title" type="text" required />
      </label>
      <label>
        Address
        <input v-model="address" type="text" required />
      </label>

      <label>
        Price
        <input v-model="price" type="number" required />
      </label>

      <label>
        Square Meters
        <input v-model="square_meters" type="number" required />
      </label>

      <label>
        Description
        <textarea v-model="description" required></textarea>
      </label>

      <label>
        Image URL
        <input v-model="image_url" type="text" required />
      </label>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      address: "",
      price: "",
      square_meters: "",
      description: "",
      image_url: "",
    };
  },
  methods: {
    submitForm() {
      const data = {
        title: this.title,
        address: this.address,
        price: this.price,
        square_meters: this.square_meters,
        description: this.description,
        image_url: this.image_url,
      };

      axios({
        method: "post",
        url: "http://localhost:5001/create_listing",
        data: data,
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data.data.uuid);
          this.$router.push(`/annonce/${response.data.data.uuid}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.form-container {
  background-color: #f0f0f0; /* gray background */
  width: 500px;
  margin: 0 auto; /* center the form horizontally */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
  display: grid; /* use grid layout for form */
  gap: 10px; /* space between rows */
}

.form label {
  display: flex; /* make label and input align horizontally */
  justify-content: space-between; /* make label and input use all available space */
}

.form label input,
.form label textarea {
  flex-grow: 1; /* make input and textarea grow to use all available space */
  margin-left: 10px; /* space between label text and input/textarea */
}

.form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form button:hover {
  background-color: #0056b3;
}
</style>
