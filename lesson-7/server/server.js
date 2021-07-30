const express = require('express')
const fs = require('fs')// встроенный мкетод в node
const bodyParser = require('body-parser') // метод непонятный в express
const moment = require('moment')
const dateFormat = moment().format('llll');
const app = express()//Глобальный объект express'a
const port = 3001

app.use(express.static('public'));//Статические файлы фронтенда(html, css, img...)

const jsonParser = bodyParser.json()


app.get('/catalogData', (request, resolve) => {//обработчик запросов
   fs.readFile('./json/catalogData.json', 'utf8', (err, data) => {
      resolve.send(data);
   });
})

app.get('/cart', (request, resolve) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      resolve.send(data);
   });
})

app.post('/cart', jsonParser, (request, resolve) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);

      //   console.log(request.body)
      cart.push(request.body);// body тело request запроса 

      fs.writeFile('./json/cartData.json', JSON.stringify(cart), () => {
         resolve.end();
      })
   });
})

app.delete('/cart', jsonParser, (request, resolve) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);

      // console.log(request.body.id_product)//передаём

      cart.forEach(pr => {
         if(pr.id_product == request.body.id_product) {
            cart.splice(cart.indexOf(pr), 1)
         }
      });

      fs.writeFile('./json/cartData.json', JSON.stringify(cart), () => {
         resolve.end();
      })
   });
})

app.post('/stats', jsonParser, (request, resolve) => {
   fs.readFile('./json/stats.json', 'utf8', (err, data) => {
      const stats = JSON.parse(data);
      request.body.date= dateFormat;
      stats.push(request.body);
   fs.writeFile('./json/stats.json', JSON.stringify(stats), () => {
      resolve.end();
   })
   })
})

app.listen(port, () => {//слушатель
   console.log(`Example app listening at http://localhost:${port}`)
})

