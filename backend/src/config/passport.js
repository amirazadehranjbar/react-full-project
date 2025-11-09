const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const UserModel =require("../models/userModel");

passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done) => {

    try {

        const user = await UserModel.findOne({email});

        if (!user) {
            done(null, false, {message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, {message: "Invalid email or password"});
        }

        return done(null, user);

    } catch (error) {
        done(error);
    }

}))

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser( async (userId, done) => {
    try {

        const user = await UserModel.findOne({_id:userId});

        if (!user) {
            return done(null, false, {message: "Invalid user"});
        }

        return done(null, user);

    } catch (err) {
        done(err);
    }
});

module.exports = passport;
