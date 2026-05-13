// routes/wishlistRoutes.js
import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get full wishlist
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching wishlist' });
  }
});

// Add product to wishlist
router.post('/:userId/add/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    const populatedUser = await user.populate('wishlist');
    res.json({ wishlist: populatedUser.wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// Remove product from wishlist
router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    const populatedUser = await user.populate('wishlist');
    res.json({ wishlist: populatedUser.wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

export default router;
