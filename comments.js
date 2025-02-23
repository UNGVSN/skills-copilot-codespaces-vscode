// Create web server
// Create a web server that listens to the port 3000 and returns the comments from the comments.json file. The comments should be returned in the following format:
//
// {
//     "comments": [
//         {
//             "id": 1,
//             "body": "some comment"
//         },
//         {
//             "id": 2,
//             "body": "some other comment"
//         },
//         ...
//     ]
// }
// The comments should be read from the comments.json file and the server should return the comments in the above format when the endpoint /comments is accessed using a GET request.
//
// If the comments.json file does not exist, the server should return the following response:
//
// {
//     "error": "Comments file does not exist"
// }
// If you make a GET request to any other endpoint, the server should return the following response:
//
// {
//     "error": "Resource not found"
// }
// If you make a POST, PUT, PATCH or DELETE request to the /comments endpoint, the server should return the following response:
//
// {
//     "error": "Method not allowed"
// }
// The server should return the appropriate status code for each response. The server should also return the appropriate Content-Type header for each response. The Content-Type header should be application/json for all responses.
//
// The server should be created using the http module.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/comments') {
        fs.readFile('./comments.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Comments file does not exist' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Resource not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Run the server using node comments.js and test it using curl or Postman