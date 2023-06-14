<template>
  <div class="annonce-container">
    <img :src="imageData" alt="Property Image" class="info-image" />
    <div class="info-details">
      <h1 class="info-title">{{ annonces.title }}</h1>
      <h3 class="info-address">{{ annonces.address }}</h3>
      <p class="info-description">{{ annonces.description }}</p>
      <div class="info-price">Price: {{ annonces.price }}</div>
      <div class="info-size">square meters: {{ annonces.square_meters }}</div>
    </div>

    <button class="delete-button" @click="deleteListing()">Delete</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      annonces: {},
      imageData: null,
    };
  },
  methods: {
    deleteListing() {
      axios
        .get("http://localhost:5001/delete_listing/" + this.$route.params.UUID)
        .then((response) => {
          console.log(response);
          this.$router.push("/connecte");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    console.log(this.$route.params.UUID);
    axios
      .get("http://localhost:5001/get_listing/" + this.$route.params.UUID)
      .then((response) => {
        this.annonces = response.data.data[0];
        this.imageData = this.annonces.image_url;
        console.log(this.annonces);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.annonce-container {
  color: black;

  background-color: white;
  width: 50%;
  margin: 0 auto;
}
</style>
