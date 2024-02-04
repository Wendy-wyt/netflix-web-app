const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY)
                .toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true });
            const { password, ...info } = getUser._doc;
            return res.status(200).json(info);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to update this user!");
    }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted...");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to delete this user!");
    }
});

// GET
router.get("/find/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const getUser = await User.findById(req.params.id);
            const { password, ...info } = getUser._doc;
            return res.status(200).json(info);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to get this user!");
    }
});


// GET ALL
router.get("/", verify, async (req, res) => {
    const limit = req.query.limit;
    if (req.user.isAdmin) {
        try {
            const allUsers = limit ?
                await User.find().sort({ _id: -1 }).limit(limit).select('-password') :
                await User.find().select('-password');
            return res.status(200).json(allUsers);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to get all users!");
    }
});


// GET USER STATS
// get all users created by month 
router.get("/stats", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to get all users!");
    }
});

module.exports = router;