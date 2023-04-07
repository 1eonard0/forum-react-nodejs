const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const users = []; //holds all users
const threadList = []; //holds all the posts created
//random string ID
const generatedID = () => Math.random().toString(36).substring(2,10);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world"
    });
});

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generatedID();

    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: []
    });

    res.json({
        message: "Thread created seccessfully!",
        threads: threadList
    });
});

app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threadList
    });
});

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    const id = generatedID();

    //validate if existing user has same email and password
    const result = users.filter(
        (user) => user.email == email && user.password == password
    );

    if(result.length === 0){
        const newUser = { id, email, password, username };

        //add the usr to the array
        users.push(newUser);

        return res.json({
            message : "Account created successfully!"
        });
    }
    
    //there is a user with same email and password
    res.json({
        error_message : "User already exists"
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    //search for a user with the given credentials
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );

    //if no result then return the message incorrect cred..
    if(result.length !== 1){
        return res.json({
            error_message : "Incorrect credentials"
        });
    }

    //if there's an existing user then return the id
    res.json({
        message : "Login successfully",
        id : result[0].id
    });
});

app.listen(PORT, () => {
    console.log(`Server listing on ${PORT}`);
});