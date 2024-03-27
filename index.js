import express from "express";
import bodyParser from "body-parser";
import os from "os";

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
let newitemlist = [];
let wnewitemlist = [];
let newitems;
let newitem;
let wnewitems;
let wnewitem;
let Path;

app.get("/", (req, res) => {
    Path = req.path;
    res.render("index.ejs", {
        Dayname: day,
        newitems: newitemlist
    })
})

app.get("/work", (req, res) => {
    Path = req.path;
    res.render("work.ejs", {
        wnewitems: wnewitemlist
    })
})



app.post("/submit", (req, res) => {
    const userInput = req.body.userInput;


    if (Path === "/") {
        // If the path is "/", do something.
        newitemlist.push(userInput);
        res.redirect("/");
    } else if (Path === "/work") {
        // If the path is "/work", do something else.
        wnewitemlist.push(userInput);
        res.redirect("/work");
    } else {
        // Handle other cases if needed.
        res.status(404).send("Not Found");
    }
});



app.post("/delete", (req, res) => {

    if (Path === "/") {
        const completedTasks = req.body.completedTasks; // Assuming your form sends an array of completed tasks
        if (completedTasks) {
            // Filter out the completed tasks from your newitemlist
            newitemlist = newitemlist.filter(item => !completedTasks.includes(item));
            // newitemlist = newitemlist.style.color = "red";

        }

        res.redirect("/");

    }
    if (Path === "/work") {
        const completedTasks = req.body.completedTasks; // Assuming your form sends an array of completed tasks
        if (completedTasks) {
            // Filter out the completed tasks from your newitemlist
            wnewitemlist = wnewitemlist.filter(item => !completedTasks.includes(item));
        }

        res.redirect("/work");

    }
})


app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`server is running on the port ${port}`);
})



