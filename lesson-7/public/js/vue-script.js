//----------------------------------------------------------------------------------------------------
//--------------------Создадие экземпляра класса Vue с привязкой к элементу #app----------------------
//----------------------------------------------------------------------------------------------------

const app = new Vue({
   el: '#app',
   data: {
      products: [], //Массив объектов JSON (исходный список товаров в каталоге)
      cartProducts: [],// Массив карточек в корзине
      searchLine: '', //содержимое поля поиска
      showCart: false, //Открытие/скрытие корзины
      counterCart: 0, // Счетчик товаров в корзине в шапке
   },
   computed: {
      CounterCart: function () { // Метод по увеличению значения счетчика при нажатии кнопки - добавить
         return this.counterCart = this.cartProducts.length
      },
      cartProductPrice() {// Общая цена корзины
         return 900
      },
      commonPrice() {
         return this.cartProduct
      },
   },
   methods: {
      makeGETRequest() { //Запрос списка товаров
         fetch(`/catalogData`) //fetch- функция, которая выполняет ajax запрос
            .then(data => data.json())// .json() - метод, который парсит строку и возвращает объект промис
            .catch(err => console.log(err))
            .then(data => {
               this.products = [...data]
            })
         fetch(`/cart`) //fetch- функция, которая выполняет ajax запрос
            .then(data => data.json())// .json() - метод, который парсит строку и возвращает объект промис
            .catch(err => console.log(err))
            .then(data => {
               this.cartProducts = [...data]
            })
      },
      statisticsActions(good, action) {// Статистика действий
         const infoStatistics = {actions: action,
                                 name: good.title,}
         fetch(`/stats`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(infoStatistics)
         })
      },
      addListProductCart(product) {//Добавление карточек в корзину 
         if (this.cartProducts.includes(product)) {
            product.currentQuantity++ // Если нажали на кнопку повторно, то в карточке меняется значение value

         } else {
            this.cartProducts.push(product)// при вызове метода сразу передали нужную карточку
            this.statisticsActions(product, 'Товар добавлен')
            fetch('/cart', {
               method: 'POST',
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(product) //  product.json()
            })
         }
      },
      removeListProductCart(cartProduct) { //Удаление карточки из корзины
         cartProduct.currentQuantity = 1 //Обнуление количества товаров при удалении карточки
         this.statisticsActions(cartProduct, 'Товар удалён');
         this.cartProducts.splice(this.cartProducts.indexOf(cartProduct), 1)
         fetch('/cart', {
            method: 'DELETE',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(cartProduct)
         })
      },
      
      cartBlockClose() {// закрытие модального окна при нажатии на серое поле (после открытия, срабатывает нажатие пробела и кнопка enter)
         if (event.target.classList.contains("cart")) {
            this.showCart = !this.showCart
         }
      }
   },

   mounted() {
      this.makeGETRequest()
   }
});









