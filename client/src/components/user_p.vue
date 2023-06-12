<template>
  <div class="login">
    <h1>Se connecter</h1>

    <form @submit.prevent="submitForm">
      <label for="username">Nom d'utilisateur :</label>
      <input
        type="text"
        id="username"
        name="username"
        v-model="username"
        required
      />
      <label for="password">Mot de passe :</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        required
      />
      <p id="user_exists" class="user_error" v-if="user_error">
        Incorrect username/password
      </p>
      <input type="submit" value="Se connecter" />
    </form>
    <h1>{{ this.$myVariable }}</h1>

    <p>
      pas de compte?
      <router-link to="/creer_compte">Créer un compte</router-link>.
    </p>
  </div>
</template>

<script>
// Dans votre fonction ou méthode où vous avez la condition

export default {
  data() {
    return {
      username: "",
      password: "",
      user_error: false,
    };
  },

  methods: {
    submitForm() {
      console.log(this.username + this.password);
      fetch("http://localhost:5001/login", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.data.status) {
            // set local storage
            localStorage.setItem(
              "username",
              JSON.stringify(data.data.username)
            );
            localStorage.setItem("email", JSON.stringify(data.data.email));
            this.$router.push("/connecte");
          } else {
            this.user_error = true;
          }
        });
    },
  },
};
</script>

<style>
body {
  background-color: #4caf50;
}

.login {
  margin: 100px auto;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #ffffffcf;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user_error {
  color: red;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"],
input[type="submit"] {
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
}

input[type="submit"] {
  background-color: #ffffff;
  color: #379a37be;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>
