const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = async (req, res, next) => {

    const { name, email, password } = req.body;
    let errors = [];

    // CHECK FOR REQUIRED FIELDS
    if( !name || !email || !password ) {
        errors.push({message: 'Please Fill all Fields'})
    }

    // // CHECK PASSWORD MATCH
    // if(password !== confirmPassword) {
    //     errors.push({message: 'Password Do not Match'});
    // }

    // CHECK PASSWORD LENGTH
    if(password.length < 6) {
        errors.push({message: 'Password Should be atleast 6 Character'});
    }

    if(errors.length > 0) {
        res.render('register', {
            pageTitle: 'User Authencation',
            errors,
            name,
            email,
            password
        })
    }
    else { // VALIDATION PASSED
        User.findOne({ email: email }) // CHECKING IF USER ALREADY EXISTS
        .then( (user) => {
            if(user) {
                errors.push({message: 'Email is already Registered'})
                res.render('register', {
                    pageTitle: 'User Authencation',
                    errors,
                    name,
                    email,
                    password
                })
            }
            else {
                const newUser = new User({
                    name: name,
                    password: password,
                    email: email
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
                        if(error) throw error
                        newUser.password = hashedPassword; // SETTING USER PASSWORD TO HASHED PASSWORD
                        newUser.save()
                        .then( () => {
                            req.flash('success_msg', 'You are now Registered and Can Login');
                            res.redirect('/user/login');
                        } )
                        .catch( (error) => {
                            console.log(error);
                        } )
                    })
                })
            }
        } )
    }
}

exports.signin = (req, res, next) => {
    
}