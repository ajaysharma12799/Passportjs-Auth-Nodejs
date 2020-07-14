const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = async (req, res, next) => {

    const Salt = await bcrypt.genSalt(10); // GENERATING SALT
    const hashedPassword = await bcrypt.hash(req.body.password, Salt);

    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    });

    user.save( (error, user) => {
        if(error) {
            return res.status(400).json({
                err: "Cannot Save User In DataBase"
            })
        }
        res.status(200).json({
            msg: "User Successfully Registered"
        })
    } )

}

exports.signin = (req, res, next) => {
    
}