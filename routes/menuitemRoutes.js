/*
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');

//POST method for add menuitem
router.post('/', async (req, res) => {
    try {
        const newMenuItem = new MenuItem(req.body);
        const response = await newMenuItem.save();

        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

//Get method for get menuitem
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();

        res.status(200).json(menuItems);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get method for get taste
router.get('/:taste', async (req, res) => {
    try {
     const tasteType = req.params.taste;// extract the tastetype from the URL parameter
    if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour'){
        const response = await MenuItem.find({taste : tasteType});
        console.log('rsponse fetched');
        res.status(200).json(response);

    }else{
        res.status(404).json({error: 'Invalid taste type'});
    }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//update method for menu

router.put('/:id', async (req, res) => {
    try{
        const MenuItemID = req.params.id; //extract the id from the parameters 
        const updateMenuItemData = req.body; //updated data from the menuitems

        const response = await MenuItem.findByIdAndUpdate(MenuItemID, updateMenuItemData, {
            new : true, //return the updated document
            runValoidators : true, //run mongoose validation 
        })
         if(!response){
            res.status(404).json({error : 'menuitem not found'});
        }
    

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

//Delete method for delete the dish 

router.delete('/:id', async (req, res) => {
    try{
        const MenuItemID = req.params.id; // extract id from parameter
        
        //assuming you have a menu model
        const response = await MenuItem.findByIdAndDelete(MenuItemID);
        if(!response){
            res.status(404).json({error : 'person not found'});
        }

        console.log('Data Deleted');
        res.status(200).json({message : 'menu deleted succesfuly'});


    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

module.exports = router; 
*/





const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');

// POST: Add a new menu item
router.post('/', async (req, res) => {
    try {
        const newMenuItem = new MenuItem(req.body);
        const response = await newMenuItem.save();

        return res.status(201).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// GET: Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();

        return res.status(200).json(menuItems);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// GET: Get menu items by taste
router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;

        if (!['spicy', 'sweet', 'sour'].includes(tasteType)) {
            return res.status(404).json({
                error: 'Invalid taste type'
            });
        }

        const response = await MenuItem.find({
            taste: tasteType
        });

        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// PUT: Update a menu item by ID
router.put('/:id', async (req, res) => {
    try {
        const menuItemID = req.params.id;
        const updateMenuItemData = req.body;

        if (!mongoose.isValidObjectId(menuItemID)) {
            return res.status(400).json({
                error: 'Invalid menu item ID'
            });
        }

        const response = await MenuItem.findByIdAndUpdate(
            menuItemID,
            updateMenuItemData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({
                error: 'Menu item not found'
            });
        }

        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// DELETE: Delete a menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const menuItemID = req.params.id;

        if (!mongoose.isValidObjectId(menuItemID)) {
            return res.status(400).json({
                error: 'Invalid menu item ID'
            });
        }

        const response = await MenuItem.findByIdAndDelete(menuItemID);

        if (!response) {
            return res.status(404).json({
                error: 'Menu item not found'
            });
        }

        return res.status(200).json({
            message: 'Menu item deleted successfully',
            deletedItem: response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;

  