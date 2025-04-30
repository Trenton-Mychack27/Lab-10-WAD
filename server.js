let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston S. Churchill'
  },
  {
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    quote: 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    author: 'Albert Einstein'
  },
  {
    quote: 'Perseverance is failing 19 times and succeeding the 20th.',
    author: 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    quote: 'Happiness is not something ready made. It comes from your own actions.',
    author: 'Dalai Lama'
  },
  {
    quote: 'For every minute you are angry you lose sixty seconds of happiness.',
    author: 'Ralph Waldo Emerson'
  }
];

"use strict";

// These are import statements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// ***
// These are the route handlers
// You can add many more here

/**
 * GET /posts
 * Sends a plain text "Hello World" response
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/posts', function (req, res) {
    res.type("text").send("Hello World");
});

/**
 * GET /posts/:id
 * Sends the post ID received in the route parameter
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/posts/:id', function (req, res) {
    res.type("text").send("Post with ID: " + req.params.id);
});

/**
 * GET /hello
 * Sends a simple Hello World response
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/hello', function (req, res) {
    res.type("text");
    res.send('Hello World!');
});

/**
 * GET /math/circle/:r
 * Returns the area and circumference of a circle with the radius size of 'r'
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/math/circle/:r', function (req, res) {
    res.type('JSON');
    let radius = req.params.r;
    let area = Math.PI * (radius * radius);
    let circumference = Math.PI * 2 * radius;
    res.send({ "area": area, "circumference": circumference });
});

/**
 * GET /math/rectangle/:width/:height
 * Returns the area and perimeter of a rectangle
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/math/rectangle/:width/:height', function(req, res) {
    res.type('JSON');
    let width = req.params.width;
    let height = req.params.height;
    let area = width * height;
    let perimeter = (2 * height) + (2 * width);
    res.send({ "area": area, "perimeter": perimeter });
});

/**
 * GET /math/power/:base/:exponent
 * Returns the result of raising an input base to the power of the input exponent
 * Optionally, can include root info
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/math/power/:base/:exponent', function (req, res) {
    res.type('JSON');
    let base = req.params.base;
    let exponent = req.params.exponent;
    let result = Math.pow(base, exponent);
    let root = req.query.root === 'true'; // Check if root is passed as a query parameter and is 'true'
    if (!root) {
        res.send({ "result": result });
    } else {
        res.send({ "result": result, "root": base });
    }
});

app.get('/quotebook/categories', (req, res) => {
    res.status(200).json(categories);
});

app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;
  if (!categories.includes(category)) {
      return res.status(404).json({ error: "Category not found" });
  }
  const quoteArray = eval(category); 
  const randomIndex = Math.floor(Math.random() * quoteArray.length);
  const randomQuote = quoteArray[randomIndex];
  res.status(200).json(randomQuote);
});


app.post('/quotebook/quote/new', (req, res) => {
  const { category, quote, author } = req.body;

  if (!quote || !author) {
    return res.status(400).json({ error: "Quote and author are required" });
  }

  const newQuote = { quote, author };

  if(category === "successQuotes") {
    successQuotes.push(newQuote);
  } else if (category === "perseveranceQuotes") {
    perseveranceQuotes.push(newQuote);
  } else if (category === "happinessQuotes") {
    happinessQuotes.push(newQuote);
    console.log(happinessQuotes);
  } else { 
    return res.status(400).json({ error: "Invalid category" });
  }
  res.status(201).json({ message: "Quote added successfully", newQuote });
});

// *** 

// This is the server listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


