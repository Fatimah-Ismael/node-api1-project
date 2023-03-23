// BUILD YOUR SERVER HERE
const express = require('express')
const server = express();
const User = require('./users/model')
server.use(express.json())

server.put('/api/users/:id', async (req, res)=>{
    try{
        const possibleUser = await User.findById(req.params.id)
    if (!possibleUser){
        res.status(404).json({
            message: 'The user with the specified ID does not exist'
        })
    }else{
        const user = req.body
        if(!user.name || !user.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user" 
            })
        }else{
            const updatedUser = await User.update(req.params.id, req.body)
            res.status(200).json(updatedUser)
        }
    }

    }catch(err){
        res.status(500).json({
            message:'error updating user'
        })
    }
    
})

server.delete('/api/users/:id',async(req, res)=>{ const possibleUser = await User.findById(req.params.id)
    if(!possibleUser){
        res.status(404).json({
            message: 'The user with the specified ID does not exist',
        })
    } else{
        const deletedUser = await User.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
   
    })

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
    const user= req.body
    if(!user.name || !user.bio){
        res.status(400).json({
             message: "Please provide name and bio for the user"
        })
    }else{

    
    User.insert(user)
    .then(createdUser=>{
       
        res.status(201).json(createdUser)
    })
    .catch(err=> {
        res.status(500).json({
            message:'Error creating new user',
            err: err.message,
        })
    })
}
})

server.use('*', (req, res)=>{
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
