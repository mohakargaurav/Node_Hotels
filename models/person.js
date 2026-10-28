
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const bcrypt = require('bcrypt');
// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
});

personSchema.pre('save', async function(next){
    const person = this;
    //hash the password only if it has been modefied (or is new)
    if(!person.isModified('password')) return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with the hashed one 
        person.password = hashedPassword;

        next();
    }catch(err){
        //return next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

// Create the person model
const Person = mongoose.model('person', personSchema);
module.exports = Person;

