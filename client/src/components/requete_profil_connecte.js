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
