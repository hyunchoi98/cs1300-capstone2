const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const server = "mongodb+srv://user:user@cluster0.rpy9r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
connect = async () => {
    await mongoose.connect(server, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

};
connect();


const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    cards: [Number],
    savedCards: [Number]
});
const UserModel = mongoose.model('User', User);

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());

app.post("/signup/", (req, res) => {
    console.log("asdf");
    const user = req.body.username;
    const password = req.body.password;
    UserModel.exists({ username: user })
        .then((result) => {
            if (result === true) {
                res.status(400);
                res.send("Error: Username already exists");
            }
            else {
                UserModel.create({ username: user, password: password })
                    .then((response) => {
                        res.status(200);
                        res.send("New user registered");
                    });
            };
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/login/", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    UserModel.findOne({ username: user, password: password })
        .then((result) => {
            if (result === null) {
                res.status(400);
                res.send("Error: User doesn't exist or username and password mismatch");
            }
            else {
                res.status(200);
                res.send("Logging in");
            };
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/addCard/", (req, res) => {
    const user = req.body.username;
    const cardID = parseInt(req.body.cardID);
    UserModel.findOneAndUpdate({ username: user },
        {
            $push: {
                cards: cardID
            }
        },
        { new: true }
    )
        .then((result) => {
            res.status(200);
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/removeCard/", (req, res) => {
    const user = req.body.username;
    const cardID = parseInt(req.body.cardID);
    console.log("asdf");
    UserModel.findOneAndUpdate({ username: user },
        {
            $pull: {
                cards: cardID
            }
        },
        { new: true }
    )
        .then((result) => {
            res.status(200);
            res.send(result);
            console.log("removed")
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/getCards", (req, res) => {
    const user = req.body.username;
    UserModel.findOne({ username: user })
        .then((result) => {
            if (result === null) {
                res.status(400);
                res.send("Username not found");
            } else {
                res.status(200);
                res.json(result.cards);
            }
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/getSavedCards", (req, res) => {
    const user = req.body.username;
    UserModel.findOne({ username: user })
        .then((result) => {
            if (result === null) {
                res.status(400);
                res.send("Username not found");
            } else {
                res.status(200);
                res.json(result.savedCards);
            }
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/addToSaved/", (req, res) => {
    const user = req.body.username;
    const cardID = parseInt(req.body.cardID);
    UserModel.findOneAndUpdate({ username: user },
        {
            $push: {
                savedCards: cardID
            }
        },
        { new: true }
    )
        .then((result) => {
            res.status(200);
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

app.post("/removeSavedCard/", (req, res) => {
    const user = req.body.username;
    const cardID = parseInt(req.body.cardID);
    console.log("asdf22");
    UserModel.findOneAndUpdate({ username: user },
        {
            $pull: {
                savedCards: cardID
            }
        },
        { new: true }
    )
        .then((result) => {
            res.status(200);
            res.send(result);
            console.log("removed saved card")
        }).catch((err) => {
            res.send(err);
        });
});


app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});