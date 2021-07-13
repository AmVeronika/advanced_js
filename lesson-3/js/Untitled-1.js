
function makeGETRequest(url) { // Создаем запрос на сервер
   //------------ES-5-------------
   // let xhr = new XMLHttpRequest();
   // xhr.open('GET', url, true);// Метод и адрес запроса , а также вид (асинхронный)
   // xhr.onreadystatechange = function () { //Слушатель изменения готовности статуса
   //    if (xhr.readyState === 4) {
   //       callback(xhr.responseText); //callback- функция передаваемая в параметре 
   //    }
   // }
   // xhr.send();// Запускаем передачу запроса

   //------------ES-6-------------
   fetch(url) //fetch- функция, которая выполняет ajax запрос и возвращает объект промис 
   .then(text => text.json())// .json() - метод, который парсит строку и возвращает объект промис
} // 'json/catalogData.json'

class GoodsItem {
   constructor(title, price) {
      this.title = title;
      this.price = price;
   }

   render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
   }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
   constructor() {
      this.goods = [];
   }
   fetchGoods(cb) {
      makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
         this.goods = JSON.parse(goods);
         console.log('Fetch:', this.goods);
         cb();
      })
   }

   render() {
      let listHtml = '';
      console.log("render = ", this.goods);
      this.goods.forEach(good => {
         const goodItem = new GoodsItem(good.product_name, good.price);
         listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
   }
}

const list = new GoodsList();
list.fetchGoods(() => list.render())