// // src/config/passport-setup.js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
// const User = require("../models/userModel");
//
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "/auth/google/redirect",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 // Check if user already exists
//                 const existingUser = await User.findOne({ googleId: profile.id });
//
//                 if (existingUser) {
//                     // Update last active
//                     existingUser.lastActive = Date.now();
//                     existingUser.isLoggedIn = true;
//                     await existingUser.save();
//                     return done(null, existingUser);
//                 }
//
//                 // Check if email already exists (from regular registration)
//                 const emailUser = await User.findOne({ email: profile.emails[0].value });
//
//                 if (emailUser) {
//                     // Link Google account to existing user
//                     emailUser.googleId = profile.id;
//                     emailUser.displayName = profile.displayName;
//                     emailUser.profileImg = profile.photos[0]?.value;
//                     emailUser.isLoggedIn = true;
//                     emailUser.lastActive = Date.now();
//                     await emailUser.save();
//                     return done(null, emailUser);
//                 }
//
//                 // Create new user for Google auth
//                 // Generate a username from displayName or email
//                 let userName = profile.displayName?.replace(/\s+/g, '_') ||
//                     profile.emails[0].value.split('@')[0];
//
//                 // Ensure username meets minimum length (5 chars)
//                 if (userName.length < 5) {
//                     userName = userName + '_user';
//                 }
//
//                 // Ensure username doesn't exceed 20 chars
//                 if (userName.length > 20) {
//                     userName = userName.substring(0, 20);
//                 }
//
//                 // Check if username already exists and make it unique
//                 let uniqueUserName = userName;
//                 let counter = 1;
//                 while (await User.findOne({ userName: uniqueUserName })) {
//                     uniqueUserName = `${userName.substring(0, 15)}_${counter}`;
//                     counter++;
//                 }
//
//                 const newUser = await User.create({
//                     googleId: profile.id,
//                     userName: uniqueUserName,
//                     displayName: profile.displayName,
//                     email: profile.emails[0].value,
//                     profileImg: profile.photos[0]?.value,
//                     role: "user",
//                     isLoggedIn: true,
//                     isRegistered: true,
//                     lastActive: Date.now(),
//                     // ✅ No password for Google auth users
//                 });
//
//                 return done(null, newUser);
//             } catch (err) {
//                 console.error("Google auth error:", err);
//                 return done(err, null);
//             }
//         }
//     )
// );
//
// //region✅  Serialize user
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });
// // endregion
//
// //region ✅ Deserialize user
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });
// // endregion
//
// module.exports = passport;