<template>
  <h1>profil connecté</h1>
  <h2>Welcome Back {{ username + "!" }}</h2>
  <div class="recommandé">
    <p>mes anonces publiées</p>
    <div class="button-container">
      <ul class="button-list">
        <li>
          <button div class="info-content">
            <img
              class="info-image"
              src="../photos/annonces/image1.jpg"
              alt="Ma photo"
            />
            <div class="info-details">
              <h2 class="info-title">Mon titre</h2>
              <div class="info-address">Mon adresse</div>
              <div class="info-price">Mon prix</div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// vue export default

export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  created() {
    const user = localStorage.getItem("username");
    this.username = JSON.parse(user);

    const email = localStorage.getItem("email");
    this.email = JSON.parse(email);
  },
};
</script>
