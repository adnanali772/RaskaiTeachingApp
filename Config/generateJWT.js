const express= require( 'express');
const  jwt = require('jsonwebtoken');

const generateToken = (user_id)=>{
   return jwt.sign({user_id}, process.env.SCREAT_KEY, {expiresIn: '30d'});
}

module.exports = generateToken;