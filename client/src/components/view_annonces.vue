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