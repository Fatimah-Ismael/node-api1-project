// BUILD YOUR SERVER HERE
const express = require('express')
const server = express();
const User = require('./users/model')

server.get('/api/users', async(req, res)=>{
    User.find()
    .then( users => {
       // throw new Error('OMG!!')
       res.status(200).json(users)
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Error accessing users',
            err: err.message,
        })
    })
})
server.get('/api/users/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user=>{
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
        res.json(user)
    }).catch(err=>{
        res.status(500).json({
            message:'error getting user ID',
            err: err.message,
        })
    })
})
server.post('/api/users', (req, res)=>{
    User.update()
    const {name, bio}= req.body
    .then(users=>{
        if(!name || !bio){
            res.status(400).json({
                 message: "Please provide name and bio for the user"
            })
        }
        res.status(201).json(users)
    })
    .catch(err=> {
        res.status(500).json({
            message:'Error creating new user',
            err: err.message,
        })
    })
})

server.use('*', (req, res)=>{
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
