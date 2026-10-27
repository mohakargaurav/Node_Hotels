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

  