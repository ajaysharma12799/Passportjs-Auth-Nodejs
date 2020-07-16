const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy( { usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({email: email})
            .then( (user) => {
                if( !user ) { // CHECKING IF USER IN NOT PRESENT
                    return done(null, false, {message: 'E-Mail is not Registered'})
                }

                // Match Password
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if(error) throw error

                    if(isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Password InCorrect'})
                    }
                })
            } )
            .catch( (error) => {
                console.log(error);
            } )
        } )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });

}