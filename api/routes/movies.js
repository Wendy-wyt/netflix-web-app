const router = require("express").Router();
const Movie = require("../models/Movie");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// ADD
router.post("/add", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const addedMovie = await newMovie.save();
            return res.status(200).json(addedMovie);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not authenticated to add movies");
    }
})

// UPDATE
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            return res.status(200).json(updatedMovie);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not authenticated to update movies");
    }
})

// DELETE
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            return res.status(200).json("Movie is deleted successfully!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not authenticated to delete movies");
    }
})

// GET
router.get("/get/:id", verify, async (req, res) => {
    try {
        const foundMovie = await Movie.findById(req.params.id);
        return res.status(200).json(foundMovie);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET RANDOM
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not authenticated to get all movies");
    }
});

module.exports = router;