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
