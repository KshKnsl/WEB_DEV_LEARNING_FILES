const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/read", async (req, res) => {
    let users = await userModel.find({});
    res.render("read", { users: users });
});

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findByIdAndDelete({_id : req.params.id});
    res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => 
{
    res.render("edit", { user: await userModel.findById(req.params.id) });
    let users = await userModel.findByIdAndDelete({_id : req.params.id});
});

app.post("/create", async (req, res) => 
{
    let createdUser = await userModel.create({
        name  : req.body.name,
        email : req.body.email,
        image : req.body.image,
    });
    res.redirect("/read");
});
            
app.listen(3000, () => { console.log("Server is running on port 3000") });