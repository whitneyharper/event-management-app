const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'THISisAsecret';
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    //FETCH USER DETAILS FROM REQ.BODY
    //CHECK IF USER EXIST
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) {
            return res.status(500).json({err});
        }
        if (existingUser) {
            return res.status(400).json({message: `username already exist`});
        }
    })
    //CREATE NEW USER
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email
    }, (err, newUser) => {
        if (err) {
            return res.status(500).json({err});
        }
        //HASH USER PASSWORD
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({err});
            } 
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({err});
                }
                //SAVE PASSWORD TO DATABASE   
                newUser.password = hashedPassword,
                newUser.save((err, savedUser) => {
                    if (err) {
                        return res.status(500).json({err});
                    }  
                    //CREATE JWT 
                    jwt.sign({
                        id: newUser._id,
                        username: newUser.username,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                    }, secret, {expiresIn: expiry}, (err, token) => {
                        if (err) {
                            return res.status(500).json({err});
                        } else {
                            //SEND TOKEN TO USER
                            return res.status(200).json({message: `user registration successful`,
                            token
                        })
                        }     

                    })
                    
                })
            })
        })
  
    })
   
}

exports.loginUser = (req, res) => {
	// check if user exists
	User.findOne({email: req.body.email}, (err, foundUser) => {
		if(err) {
			return res.status(500).json({err});
		}
		if (!foundUser) {
			return res.status(401).json({message: "incorrect email"});
		}
		// check if password is correct
		let match = bcrypt.compareSync(req.body.password, foundUser.password);
		if(!match) {
			return res.status(401).json({message: "incorrect password"});
		}
		// create a token
		jwt.sign({
			id: foundUser._id,
			username: foundUser.username,
			email: foundUser.email
		}, secret, {
			expiresIn: expiry
		}, (err, token) => {
			if (err) {
				return res.status(500).json({err});
			}
			// send token to user
			return res.status(200).json({
				message: "user logged in",
				token
			})
		})
	})
}
