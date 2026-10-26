const express = require('express');
const router = express.Router();
const Person = require('../models/person');

//POST route to add a person
router.post('/', async (req,res)=>{
    try{
        const data = req.body //Assuming thr req body contains the person data

        //create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database 
       const response = await newPerson.save();
       console.log('data saved');
       res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});

    }
})

//Get method to get the person
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'}); 

    }  
})

//Get method for person/worktype
router.get('/:workType',async(req, res)=>{
    try{
        const workType = req.params.workType;// extract the worktype from the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('rsponse fetched');
        res.status(200).json(response);

    }else{
        res.status(404).json({error: 'Invalid work type'});
    }

    } catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});

    }
})

//update method for update person 

router.put('/:id', async (req, res) => {
    try {
        const PersonId = req.params.id; //extract the id from the parameters 
        const updatedPersonData = req.body; //updated data from the person 

        const response = await Person.findByIdAndUpdate(PersonId, updatedPersonData,{
            new : true, //return the updated document
            runValoidators : true, //run mongoose validation 
        })

        if(!response){
            res.status(404).json({error : 'person not found'});
        }

        console.log('Data updatede');
        res.status(200).json(response);


    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
}) 

//Delete method for delete record 
router.delete('/:id', async (req, res) => {
    try{
         const personId = req.params.id; //extract the id from the parameters
         
         //assuming you have a person model
         const response = await Person.findByIdAndDelete(personId);
         if(!response){
            res.status(404).json({error : 'person not found'});
        }

        console.log('Data Deleted');
        res.status(200).json({message : 'person deleted succesfuly'});

    } catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

module.exports = router; 