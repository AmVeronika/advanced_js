//----------------------------------------------------------------------------------------------------
//--------------------Создадие экземпляра класса Vue с привязкойк элементу #app-----------------------
//----------------------------------------------------------------------------------------------------

const app = new Vue({
   el: '#app',
   data: {
      products: [], //Массив объектов JSON (исходный список товаров в каталоге)
      cartProducts: [],// Массив карточек в корзине
      searchLine: '', //содержимое поля поиска
      API_URL: 'https://raw.githubusercontent.com/AmVeronika/JSON-EBT/master/json',//создание адреса сервера, к которому обращается клиент
      showCart: false //Открытие/скрытие корзины
   },
   methods: {
      makeGETRequest() { //Запрос списка товаров
         fetch(`${this.API_URL}/catalogData.json`) //fetch- функция, которая выполняет ajax запрос
            .then(text => text.json())// .json() - метод, который парсит строку и возвращает объект промис
            .catch(err => console.log(err))
            .then(data => {
               this.products = [...data]
            })
      },
      fhfhfh() {
         console.log(this.products)
      },
      addListProductCart() {
         console.log(event.target.dataset)
      }
   },

   mounted() {
      this.makeGETRequest()

   }
});









