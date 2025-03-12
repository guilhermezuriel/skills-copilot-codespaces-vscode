// Create web server
// Setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the path to the comments file
const commentsPath = path.join(__dirname, 'comments.json');

// Get all comments
app.get('/comments', (req, res) => {
  // Read the comments file
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
      return;
    }

    // Parse the JSON data
    const comments = JSON.parse(data);

    // Send the comments back as JSON
    res.json(comments);
  });
});

// Create a new comment
app.post('/comments', (req, res) => {
  // Read the comments file
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
      return;
    }

    // Parse the JSON data
    const comments = JSON.parse(data);

    // Create a new comment
    const newComment = {
      id: comments.length + 1,
      text: req.body.text,
    };

    // Add the new comment to the list
    comments.push(newComment);

    // Write the updated list back to the file
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
        return;
      }

      // Send the new comment back as JSON
      res.json(newComment);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});