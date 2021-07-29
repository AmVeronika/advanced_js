const express = require('express')
const fs = require('fs')// встроенный мкетод в node
const bodyParser = require('body-parser') // метод непонятный в express

const app = express()//Глобальный объект express'a
const port = 3001

app.use(express.static('public'));//Статические файлы фронтенда(html, css, img...)

const jsonParser = bodyParser.json()


app.get('/catalogData', (req, res) => {//обработчик запросов
   fs.readFile('./json/catalogData.json', 'utf8', (err, data) => {
      res.send(data);
   });
})

app.get('/cart', (req, res) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      res.send(data);
   });
})

app.post('/cart', jsonParser, (req, res) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);

      //   console.log(req.body)
      cart.push(req.body)

      fs.writeFile('./json/cartData.json', JSON.stringify(cart), () => {
         res.end();
      })
   });
})
app.delete('/cart', jsonParser, (req, res) => {
   fs.readFile('./json/cartData.json', 'utf8', (err, data) => {
      const cart = JSON.parse(data);

      // console.log(req.body.id_product)//передаём

      cart.forEach(pr => {
         if(pr.id_product == req.body.id_product) {
            cart.splice(cart.indexOf(pr), 1)
         }
      });

      fs.writeFile('./json/cartData.json', JSON.stringify(cart), () => {
         res.end();
      })
   });
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})

