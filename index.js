import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();

const port = 3000;

// Allow you to reference assets in public folder, using ejs files relative to public folder
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [{
    title: "Title for first blog",
    dateCreated: new Date(),
    description: "This is my first blog and it's super fun writing blogs.",
}, {
    title: "Title for second blog",
    dateCreated: new Date(),
    description: "This is my second blog and it's super fun writing blogs.",

}, {
    title: "Title for third blog",
    dateCreated: new Date(),
    description: "This is my third blog and it's super fun writing blogs.",

},
{
    title: "Title for fourth blog",
    dateCreated: new Date(),
    description: "This is my third blog and it's super fun writing blogs.",

}
];

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
})

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
})

app.post("/", (req, res) => {
    const post = {
        id: "",
        title: req.body.title,
        dateCreated: new Date(),
        description: req.body.description,
    }
    posts.push(post);
    res.render("index.ejs", {posts: posts})
})


app.get('/posts/:postName', (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(post => {
        const postTitle = _.lowerCase(post.title);
        if (requestedTitle===postTitle) {
            console.log('Match found')
            res.render('post.ejs', {post: post})
        } else {
            console.log('Match not found')
        }
    })
})

app.post('/delete-post', (req, res) => {
    const postTitle = req.body.postTitle;
    posts = posts.filter((post) => _.lowerCase(post.title)!==_.lowerCase(postTitle));
    res.redirect('/');
})

app.post('/edit-post', (req, res) => {
    const postTitle = req.body.postTitle;
    const post = posts.find(post => _.lowerCase(post.title)===_.lowerCase(postTitle));
    res.render('edit-post.ejs', {post: post})
})

app.post('/update-post', (req, res) => {
    const originalTitle = req.body.originalTitle;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;

    posts = posts.map(post => {
        if (_.lowerCase(originalTitle)===_.lowerCase(post.title)) {
            post.title = updatedTitle;
            post.description = updatedDescription;
        }
        return post;
    })
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})