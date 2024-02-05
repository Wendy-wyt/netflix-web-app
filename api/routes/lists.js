const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            return res.status(200).json(savedList);
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You are not allowed!");
    }
})

// DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            return res.status(200).json("List was deleted successfully!");
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You are not allowed!");
    }
})

// GET WITH QUERY
router.get("/", verify, async (req, res) => {
    let lists = [];
    const type = req.query.type;
    const genre = req.query.genre;
    try {
        if (type) {
            if (genre) {
                lists = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: type, genre: genre } },
                    {
                        $project: {
                            title: 1,
                            type: 1,
                            genre: 1,
                            content: { $slice: ['$content', 10] }
                        }
                    }
                ])
            } else {
                lists = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: type } },
                    {
                        $project: {
                            title: 1,
                            type: 1,
                            genre: 1,
                            content: { $slice: ['$content', 10] }
                        }
                    }
                ])
            }
        } else {
            lists = await List.aggregate([
                { $sample: { size: 10 } },
                {
                    $project: {
                        title: 1,
                        type: 1,
                        genre: 1,
                        content: { $slice: ['$content', 10] }
                    }
                }
            ])
        }
        return res.status(200).json(lists);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;