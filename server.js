const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");

//Data
const { fruits } = require("./models/fruits");
const { veggies } = require("./models/veggies");
const { meats } = require("./models/meats");
const { snacks } = require("./models/snacks");
const { recipes } = require("./models/recipes");
const { coffee } = require("./models/coffee");

//Establish middleware
app.use(methodOverride("_method")); // for method override, put as first one?
app.set("view engine", "ejs");
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
    res.render("home/index");
});

app.get("/fruits", (req, res) => {
    //send index.ejs with array of fruits
    // res.send(fruits);
    res.render("fruits/index", { allFruits: fruits });
});

app.get("/veggies", (req, res) => {
    res.render("veggies/index", { allVeggies: veggies });
});

app.get("/meats", (req, res) => {
    res.render("meats/index", { allMeats: meats });
});

app.get("/recipes", (req, res) => {
    res.render("recipes/index", { allRecipes: recipes });
});

app.get("/snacks", (req, res) => {
    res.render("snacks/index", { allSnacks: snacks });
});

app.get("/about", (req, res) => {
    res.render("about/index");
});

app.get("/coffee", (req, res) => {
    res.render("coffee/index", { allCoffee: coffee });
});

//add /new routes
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

app.get("/veggies/new", (req, res) => {
    res.render("veggies/new.ejs");
});

app.get("/meats/new", (req, res) => {
    res.render("meats/new.ejs");
});

app.get("/coffee/new", (req, res) => {
    res.render("coffee/new.ejs");
});

// app.get("/recipes/new", (req, res) => {
//     res.render("recipes/new.ejs");
// });

app.get("/snacks/new", (req, res) => {
    res.render("snacks/new.ejs");
});

//post routes
app.post("/veggies", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
        // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {
        // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    veggies.push(req.body);
    res.redirect("/veggies");
});

app.post("/fruits", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
        // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {
        // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect("/fruits");
});

app.post("/meats", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
        // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {
        // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    meats.push(req.body);
    res.redirect("/meats");
});

app.post("/coffee", (req, res) => {
    console.log(req.body);
    coffee.push(req.body);
    res.redirect("/coffee");
});

// app.post("/recipes", (req, res) => {
//     console.log(req.body);
//     if (req.body.readyToEat === "on") {
//         // if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true;
//     } else {
//         // if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false;
//     }
//     recipes.push(req.body);
//     res.redirect("/recipes");
// });

app.post("/snacks", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
        // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {
        // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    snacks.push(req.body);
    res.redirect("/snacks");
});

//add show route
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
    let idx = parseInt(req.params.indexOfFruitsArray);

    if (idx >= fruits.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render("404", {});
    } else {
        // res.send(fruits[idx]);
        res.render("fruits/show", { fruit: fruits[idx], id: idx });
    }
});

app.get("/veggies/:indexOfVeggiesArray", (req, res) => {
    let idx = parseInt(req.params.indexOfVeggiesArray);

    if (idx >= veggies.length) {
        res.render("404", {});
    } else {
        res.render("veggies/show", { veggie: veggies[idx], id: idx });
    }
});

app.get("/snacks/:indexOfSnacksArray", (req, res) => {
    let idx = parseInt(req.params.indexOfSnacksArray);

    if (idx >= snacks.length) {
        res.render("404", {});
    } else {
        res.render("snacks/show", { snack: snacks[idx], id: idx });
    }
});

app.get("/meats/:indexOfMeatsArray", (req, res) => {
    let idx = parseInt(req.params.indexOfMeatsArray);

    if (idx >= meats.length) {
        res.render("404", {});
    } else {
        res.render("meats/show", { meat: meats[idx], id: idx });
    }
});

app.get("/recipes/:indexOfRecipesArray", (req, res) => {
    let idx = parseInt(req.params.indexOfRecipesArray);

    if (idx >= recipes.length) {
        res.render("404", {});
    } else {
        res.render("recipes/show", { recipe: recipes[idx], id: idx });
    }
});

app.get("/coffee/:indexOfCoffeeArray", (req, res) => {
    let idx = parseInt(req.params.indexOfCoffeeArray);

    if (idx >= coffee.length) {
        // res.send('There is no fruit at that index.'); // one solution
        // res.send(fruits);
        res.render("404", {});
    } else {
        // res.send(fruits[idx]);
        res.render("coffee/show", { coffee: coffee[idx], id: idx });
    }
});


//add edit route
app.get("/fruits/:id/edit", (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);

    res.render("fruits/edit", { fruit, id }); // === { fruit: fruit, id: id }
});

app.get("/veggies/:id/edit", (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);

    res.render("veggies/edit", { veggie, id });
});

app.get("/meats/:id/edit", (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);

    res.render("meats/edit", { meat, id });
});

app.get("/recipes/:id/edit", (req, res) => {
    const recipe = recipes[req.params.id];
    let id = parseInt(req.params.id);

    res.render("recipes/edit", { recipe, id });
});

app.get("/snacks/:id/edit", (req, res) => {
    const snack = snacks[req.params.id];
    let id = parseInt(req.params.id);

    res.render("snacks/edit", { snack, id });
});

app.get("/coffee/:id/edit", (req, res) => {
    const coffees = coffee[req.params.id];
    let id = parseInt(req.params.id);

    res.render("coffee/edit", { coffees, id }); // === { fruit: fruit, id: id }
});


//add delete route
app.get('/fruits/:id/delete', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    
    res.render('fruits/delete', { fruit, id });
});

app.get('/meats/:id/delete', (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    
    res.render('meats/delete', { meat, id });
});

app.get('/veggies/:id/delete', (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    
    res.render('veggies/delete', { veggie, id });
});

app.get('/coffee/:id/delete', (req, res) => {
    const coffees = coffee[req.params.id];
    let id = parseInt(req.params.id);
    
    res.render('coffee/delete', { coffees, id });
});

//delete item
app.delete('/fruits/:id', (req, res) => {
    // remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id), 1);
    
    res.redirect('/fruits'); // redirect back to index page (/fruits)
});

app.delete('/meats/:id', (req, res) => {
    // remove the meat item from the meats array
    meats.splice(parseInt(req.params.id), 1);
    
    res.redirect('/meats'); // redirect back to index page (/meats)
});

app.delete('/veggies/:id', (req, res) => {
    // remove the veggie item from the veggies array
    veggies.splice(parseInt(req.params.id), 1);
    
    res.redirect('/veggies'); // redirect back to index page (/veggies)
});

app.delete('/coffee/:id', (req, res) => {
    // remove the fruit item from the fruits array
    coffee.splice(parseInt(req.params.id), 1);
    
    res.redirect('/coffee'); // redirect back to index page (/fruits)
});

//add put route
app.put("/fruits/:id", (req, res) => {
    console.log("Update fruit:\n", req.body);
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body;
    res.redirect("/fruits");
});

app.put("/meats/:id", (req, res) => {
    console.log("Update meat:\n", req.body);
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    meats[parseInt(req.params.id)] = req.body;
    res.redirect("/meats");
});

app.put("/veggies/:id", (req, res) => {
    console.log("Update veggie:\n", req.body);
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    veggies[parseInt(req.params.id)] = req.body;
    res.redirect("/veggies");
});

app.put("/coffee/:id", (req, res) => {
    console.log("Update coffee:\n", req.body);
    coffee[parseInt(req.params.id)] = req.body;
    res.redirect("/coffee");
});

//Listen for server
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
