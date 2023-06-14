<template>
  <h1>profil connecté</h1>
  <h2>Welcome Back {{ username + "!" }}</h2>
  <div class="recommandé">
    <p>mes anonces publiées</p>
    <button class="creer-button">
      <a href="/creer_annonce">Créer annonce</a>
    </button>

    <div
      class="button-container"
      v-for="annonce in annonces"
      :key="annonce.UUID"
      @click="redirect(annonce.UUID)"
    >
      <ul class="button-list">
        <li>
          <button div class="info-content">
            <img class="info-image" :src="annonce.image_url" alt="Ma photo" />
            <div class="info-details">
              <h2 class="info-title">{{ annonce.title }}</h2>
              <div class="info-address">{{ annonce.address }}</div>
              <div class="info-price">€{{ annonce.price }}</div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      annonces: [],
    };
  },
  methods: {
    redirect(uuid) {
      this.$router.push("/annonce/" + uuid);
    },
  },
  created() {
    const user = localStorage.getItem("username");
    this.username = JSON.parse(user);

    const email = localStorage.getItem("email");
    this.email = JSON.parse(email);

    axios({
      method: "post",
      url: "http://localhost:5001/get_listings_by_user",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.data);
        this.annonces = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // get listings
  },
};
</script>

<style>
.creer-button {
  background-color: #008cba; /* Green */
  border: none;
  color: "#ffffff";
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.info-content{
  cursor: pointer;
}
</style>
