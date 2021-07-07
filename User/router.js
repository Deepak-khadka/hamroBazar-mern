import argon from "argon2";
import express from "express";
import User from "./model.js";
import { userValidation, loginValidation } from "./validation.js";

const router = express.Router();

router.get('/', async (req, res) => {
        const user = await User.find();
        res.send(user);
});

router.post('/create', async (request, response) => {
    const data = request.body;
    const { error } = userValidation.validate(data)
    if ( error ) return response.status(404).send(error.message);

    data.password = await argon.hash(request.body.password);
    const user = new User(data);
    await user.save();
    response.send("User Created Successfully");
});

router.put('/update/:id', async (request, response) => {
    const id = request.params.id;
    
    const { error } = userValidation.validate(request.body);
    if( error ) return response.send(error.message);
    
    const user = await User.findOneAndUpdate({ _id : id}, { $set : request.body }, { new : true });
    console.log(user)
    response.send("Update Successfully");
});

router.post('/login', async (request, response) => {
    const data = request.body;

    const { error } = loginValidation.validate(request.body);
    if( error ) return response.send(error.message);

    const user = await User.findOne({ email : data.email });
    if(!user) return response.send("Unable to find email");

    const isValid = await argon.verify(user.password, data.password);
    if(!isValid) return response.send("Unable to match password")
    
});

export default router;