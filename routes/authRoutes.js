// this is not the local passport.js, it's the original npm module
const passport = require("passport");

// exports these two methods from this module
// app will be an instance of express() passed to this arrow function later
module.exports = app => {
  // use google strategy to handle this route and authenticate
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // auto attached by passport, auto deletes cookie and destructs the user
    res.redirect("/");
  });

  // is auth-ed, will get its id back
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
