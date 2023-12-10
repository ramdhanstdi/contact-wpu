const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require ('./utils/contacts');
//const morgan = require('morgan');
const app = express();
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

//third-part middleware
app.use(expressLayouts);
//app.use(morgan('dev'));

//built-in middleware
app.use(express.static('public'));

// //application level middleware
// app.use((req, res, next) =>{
//   console.log('Time', Date.now());
//   next();
// });

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Diviandini Azzahra',
      email: 'dvndnazhr20@gmail.com',
    },
    {
      nama: 'Gusmiadi Prakoso',
      email: 'gusmiadi7@gmail.com',
    },
  ];

  res.render('index', {
    nama: 'Andin',
    title: 'Halaman Home', // Tambahkan koma di sini
    mahasiswa,
    layout:'layouts/main-layout',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    layout: 'layouts/main-layout', 
    title: 'Halaman About',
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', { 
    layout: 'layouts/main-layout', 
    title: 'Halaman Contact',
    contacts,
  });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', { 
    layout: 'layouts/main-layout', 
    title: 'Halaman Contact',
    contact,
  });
});


// app.get('/product/:id/category/:idCat', (req, res) => {
//   res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);
// });

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// const http = require('http');
// const fs = require('fs');

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: file not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });

//     const url = req.url;

// switch(url) {
//     case'/about':
//     renderHTML('./about.html', res);
//     break;
//     case'/contact':
//     renderHTML('./contact.html', res);
//     break;
//     default:
//     renderHTML('./index.html', res);
//     break;     
// }

//     // if (url === '/about') {
//     //     renderHTML('./about.html', res);
//     // } else if (url === '/contact') {
//     //     renderHTML('./contact.html', res); // tambahkan parameter 'res'
//     // } else {
//     //     renderHTML('./index.html', res);
//     // }
// }).listen(3000, () => {
//     console.log('Server is listening on port 3000..');
// });

