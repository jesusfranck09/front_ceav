
// // const http = require('http');

// // const hostname = '127.0.0.1';
// // const port = 3000;
// // // const password :

// // const server = http.createServer((req, res) => {
// //     console.log("req",req)
// //     console.log("res",res)
// //   res.statusCode = 200;
// //   // res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hola Mundo');
// // });

// // server.listen(port, hostname, () => {
// //   console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
// // });


// import React from 'react';
// import { render } from 'react-dom';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql
// } from "@apollo/client";

// const client = new ApolloClient({
//   uri: '127.0.0.1:3000',
//   cache: new InMemoryCache()
// });

// function App() {
//   return (
//     <div>
//       <h2>My first Apollo app 🚀</h2>
//     </div>
//   );
// }

// render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root'),
// );

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end(<input placeholder='algun dato importante'></input>);
// });

// server.listen(port, hostname, () => {
//   console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
// });