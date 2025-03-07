import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import dotenv from 'dotenv';
dotenv.config();

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication logic
    console.log('Google Profile:', profile);
    return done(null, profile);
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Export passport
export default passport;