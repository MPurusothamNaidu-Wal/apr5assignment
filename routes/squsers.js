const express = require("express");
const router = express.Router();
const userModel = require("../models").SqUsers;
router.get("/", function (req, res) {
    userModel.findAll().then(
        function (users) {
            res.status(200).json(users);
        },
        function (error) {
            res.status(500).send(error);
        }
    );
});

router.post("/create", function (req, res) {
    console.log(req.body);
    let { username, password } = req.body;
    userModel
        .findOne({
            where: { username: username },
        })
        .then((user) => {
            if (user === null) {
                userModel
                    .create({
                        username: username,
                        password: password,
                        date_of_creation: new Date().toISOString(),
                    })
                    .then(function (user) {
                        res.json({ status: 1, data: "user created" });
                    });
            } else {
                res.json({ status: 0, debug_data: "username already exists" });
            }
        });
})

router.put("/:username", (req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
    userModel
        .update(
            {
                username: username,
                password: password,
            },
            {
                where: { username: req.params.username },
            }
        )
        .then(function (user) {
            res.status(200).json({ status: 1, debug_data: "Updated data" });
        });
})


router.delete("/:username", (req, res) => {
    userModel
        .destroy({
            where: {
                username: req.params.username,
            },
        })
        .then((status) => {
            if (status === 1) {
                res.status(200).json({ status: 1, debug_date: "deleted successfully" });
            } else {
                res.status(404).json({ status: 0, debug_date: "record not found" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get("/checklogin", (req, res) => {
    console.log(req.body);
    userModel
        .findOne({
            where: { username: req.body.username, password: req.body.password },
        })
        .then(function (user) {
            if (user === null) {
                req.session["isLoggedIn"] = 0;
                res.json({ status: 0, data: "incorrect login details" });
            } else {
                req.session["username"] = req.body.username;
                req.session["isLoggedIn"] = 1;
                res.json({ status: 1, data: req.body.username });
            }
        });
});

router.get("/loggeduser", (req, res) => {
    if (req.session.isLoggedIn === 1) {
        userModel
            .findOne({
                where: { username: req.session.username },
            })
            .then(
                function (user) {
                    res.status(200).json(user);
                },
                function (error) {
                    res.status(500).send(error);
                }
            );
    } else {
        res.json({ status: 0, debug_data: "you are not logged in" });
    }
});

module.exports = router;