export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      c_password: "",
      user_exists: false,
    };
  },
  methods: {
    submitForm() {
      console.log(this.password, this.c_password);
      if (this.c_password == this.password) {
        fetch("https://15e1-95-154-22-11.eu.ngrok.io/create_user", {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            email: this.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.data.error == 409) {
              this.user_exists = true;
              console.log(data);
            }
            if (data.data.error != 409) {
              console.log(data);
              this.$router.push("/user_p");
            }
          });
      }
    },
  },
};
