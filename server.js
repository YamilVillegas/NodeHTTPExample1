const http = require('http');
// import of http module
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!</h1></body></html>');
}); // Creates a basic server object
    // The request object gives us access to the header using (req.headers)
    // The req.statusCode = 200; means that everything is ok
    // The 'Content-Type' argument tells the client what kind of data to expect in the response body. We pass the value in the second argument 'text-html'. Everytime that we send HTML in the body this is how we should set the header.
    // To end the response using the res.end method we pass it the string that we want to include in the body.

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); // This is how you START the server
// We call the listen method on the server variable we created. We pass in the port and hostname variables that we created earlier as arguments. As a third argument we pass it a callback function that will be executed when the server starts up. It will let us know that it is running.