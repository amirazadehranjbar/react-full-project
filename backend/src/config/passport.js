// backend/src/config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

// region local strategy
passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return done(null, false, {message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, {message: "Invalid email or password"});
        }

        return done(null, user);

    } catch (error) {
        return done(error);
    }
}))
// endregion

// region google strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3500/api/users/auth/google/callback", // ✅ Fixed port
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // ✅ Check if user already exists
            let user = await UserModel.findOne({googleId: profile.id});

            if (user) {
                // Update last active
                user.lastActive = Date.now();
                await user.save();
                return done(null, user);
            }

            // ✅ Check if email exists (link accounts)
            user = await UserModel.findOne({email: profile.emails[0].value});

            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.lastActive = Date.now();
                await user.save();
                return done(null, user);
            }

            // ✅ Generate username from displayName
            let userName = profile.displayName.replace(/\s+/g, '_');

            // Ensure username meets requirements (5-20 chars)
            if (userName.length < 5) {
                userName = userName + '_user';
            }
            if (userName.length > 20) {
                userName = userName.substring(0, 20);
            }

            // Make username unique if needed
            let uniqueUserName = userName;
            let counter = 1;
            while (await UserModel.findOne({userName: uniqueUserName})) {
                uniqueUserName = `${userName.substring(0, 15)}_${counter}`;
                counter++;
            }

            // ✅ Create new user with .save() instead of .create()
            const newUser = new UserModel({
                googleId: profile.id,
                userName: uniqueUserName,
                email: profile.emails[0].value,
                profileImg: profile.photos[0]?.value,
                role: "user",
                lastActive: Date.now(),
            });

            await newUser.save(); // ✅ IMPORTANT: Actually save the user!

            return done(null, newUser);

        } catch (err) {
            console.error("❌ Google Strategy Error:", err);
            return done(err, null);
        }
    }
))
// endregion

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);

    } catch (err) {
        return done(err, null);
    }
});

module.exports = passport;