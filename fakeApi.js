window.API = {
  fetchFriends() {
    return new Promise((resolve, reject) => {
      const PEOPLE = {
        activeFriends: ["Abid", "Adil", "Asim"],
        inactiveFriends: ["Shiraz"]
      };
      setTimeout(() => resolve(PEOPLE), 2000);
    });
  }
};
