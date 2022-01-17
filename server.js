const http = require('http');
// import of http module
const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');
 

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
     
    if (req.method === 'GET') {
        let fileUrl = req.url; // This pulls the content of the requested file URL
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        } // If the GET REQUEST is TRUE then the server will send the client to /index.html

        const filePath = path.resolve('./public' + fileUrl); // The path.resolve() method turns a relative path to an absolute path & we store that in the variable filePath with the public folder that we created + the fileUrl.
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return; // This return statement stops the code below from executing
                } // This IF STATEMENT is used if you want the request to the server to ONLY be an HTML file. IF IT IS NOT then you will receiver the Error 404 ABOVE. If it IS an HTML then the code BELOW will run.
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res); 
                // This reads the content of the file that it is given in small chunks. We then pipe it and send it to the response object (res). It sends the information from the filepath to the response stream.
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`); // Anything other than a HTML file request will fall into this error block 
        }
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`); // Anything other than a GET request will fall into this error block 
        }
}); 

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); // This is how you START the server
// We call the listen method on the server variable we created. We pass in the port and hostname variables that we created earlier as arguments. As a third argument we pass it a callback function that will be executed when the server starts up. It will let us know that it is running.