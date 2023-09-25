const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why no name?"]
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//     name: "Papaya",
//     rating: 5,
//     review: "Sweet Fruit!"
// });

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);

const Pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Decent Fruit"
})

const person = new Person({
    name: "Amy",
    age: 16,
    favouriteFruit: Pineapple
});

// Pineapple.save();
// person.save();

const Mango = new Fruit({
    name: "Mango",
    rating: 9,
    review: "Good for Shake"
})


async function update_favourite_fruit_of_Ramesh(){
    const res = await Person.updateOne({name: "Ramesh"}, {favouriteFruit: Mango});
}

Mango.save();
update_favourite_fruit_of_Ramesh();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 10,
//     review: "Great Fruit"
// });

// const orange = new Fruit({
//     name: "Orange",
//     rating: 9,
//     review: "Kinda Sour"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 9,
//     review: "Weird Texture"
// });


// Fruit.insertMany([kiwi, orange, banana]);


async function get_fruits(){

    const fruits = await Fruit.find();
    
    fruits.forEach( fruit =>{
        console.log(fruit.name);
    });

    setTimeout(() => {
        mongoose.connection.close();
    }, 5);

}

get_fruits();


async function update_fruit(){
    const res = await Fruit.updateOne({_id:"651109f8c82d238e804c9f67"}, {name: "Dragon", review:"Rich People Fruit"});

    if(res.acknowledged)
    {
        console.log("Updated the doc successfully");
        // mongoose.connection.close();
    }
    else
    {
        console.log("Something went wrong!");
    }
}

// update_fruit();

async function delete_dragon(){
    const res = await Fruit.deleteOne({name: "Dragon"});
    console.log(res);
}

// delete_dragon();