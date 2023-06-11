// Dans votre fonction ou méthode où vous avez la condition

export default {
  data() {
    return {
      username: "",
      password: "",
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
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.status) {
            this.$router.push("/home");
          } else {
            this.$router.push("/error");
          }
        });
    },
  },
};
