//----------------------------------------------------------------------------------------------------
//--------------------Создадие экземпляра класса Vue с привязкойк элементу #app-----------------------
//----------------------------------------------------------------------------------------------------
const app = new Vue({
   el: '#app',
   data: {
      products: [], //Массив объектов JSON (исходный список товаров в каталоге)
      searchLine: '', //содержимое поля поиска
      API_URL: 'https://raw.githubusercontent.com/AmVeronika/JSON-EBT/master/json'//создание адреса сервера, к которому обращается клиент
   },
   mounted: {
      makeGETRequest() { //Запрос списка товаров
         return fetch(`${this.API_URL}/catalogData.json`) //fetch- функция, которая выполняет ajax запрос и возвращает объект промис 
            .then(text => text.json())// .json() - метод, который парсит строку и возвращает объект промис
            .catch(err => console.log(err))
            .then(data => {
               this.products = [...data];
            })
      }

   }

});









