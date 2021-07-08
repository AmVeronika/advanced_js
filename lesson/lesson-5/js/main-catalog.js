//-------------Создание запроса на сервер-------------
function makeGETRequest(url) {
   return fetch(url) //fetch- функция, которая выполняет ajax запрос и возвращает объект промис 
      .then(text => text.json())// .json() - метод, который парсит строку и возвращает объект промис
      .catch(err => console.log(err));
} // 

//----------------------------------------------------
//--------------К А Т А Л О Г-------------------------
//----------------------------------------------------

//----------------------------------------------------
//-----Класс создания одной карточки в каталоге-------
class GoodsItemCatalog {
   constructor(id, title, price, descp) {
      this.id = id;
      this.title = title;
      this.descp = descp;
      this.price = price;
   }
   //--Метод для формирования вёрстки каждого товара--
   renderProductCatalog() {
      return `<div class="product__card shadow filter-card trans" id="${this.id}-p-catalog">
     <img src="img/catalog/product-card${this.id}.jpg" width="360" height="420" alt="product card trans"
        class="product-card__img">
     <a href="product.html" class="product-card__name">
        <h5 class="product-card__h5">${this.title}</h5>
        <p class="product-card__text">${this.descp}</p>
        <p class="product-card__text-options">$${this.price}</p>
     </a>
     <button class="card-hover button-hover4 trans1" data-btn-cart-add="${this.id}">
        <svg class="card-hover__img trans" width="26" height="24" viewBox="0 0 32 29" fill="none"
           xmlns="http://www.w3.org/2000/svg">
           <path class="trans"
              d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z"
              fill="white" />
        </svg>
        <span class="card-hover__text trans">Add to Cart</span>
     </button>
  </div>`;
   }
}
//----------------------------------------------------
//----------Класс создания каталога карточек----------
class ProductsCatalog {
   constructor() {
      this.products = [];//Массив объектов JSON (карточек продуктов)
   }
   //-------Метод передачи карточек в массив-----------
   fetchProducts() {
      makeGETRequest('json/catalogData.json')// в makeGETRequest передали адресс json, получили промис 
         .then(data => {
            this.products = [...data];
            this.renderPageCatalog();
         })
   }
   //-------Метод рендеринга каталога------------------
   renderPageCatalog() {
      let listProductCatalogHtml = '';
      this.products.forEach(product => {
         const goodItem = new GoodsItemCatalog(product.id_product, product.title, product.price, product.descp,);
         listProductCatalogHtml += goodItem.renderProductCatalog();
      });
      document.querySelector('.product__grid-wrap--catalog').innerHTML = listProductCatalogHtml;
   }
}
const listProductCatalog = new ProductsCatalog();
listProductCatalog.fetchProducts();// 2. Запуск метода Получени данных товаров с сервера


//----------------------------------------------------
//--------------К О Р З И Н А ------------------------
//----------------------------------------------------

//----------------------------------------------------
//-----Класс создания одной карточки в корзине--------
class GoodsItemCart {
   constructor(id, title, price, color, size) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.color = color;
      this.size = size;
   }
   //--Метод для формирования вёрстки каждого товара в корзине--
   renderProductCart() {
      return `<div class="shopping__card shadow" id="${this.id}-p-cart">
         <a href="product.html" class="shopping-card__link">
            <img class="shopping-card__img  scale trans" src="img/catalog/product-card${this.id}.jpg" width="262"
               height="100%" alt="product">
         </a>
         <div class="shopping-card__name">
            <h3 class="shopping-name__h3">${this.title}</h3>
            <p class="shopping-card__text">Price: <span class="shopping-card__text-color">$${this.price}</span></p>
            <p class="shopping-card__text">Color: <span class="shopping-card__text-span">${this.color}</span></p>
            <p class="shopping-card__text">Size: <span class="shopping-card__text-span">${this.size}</span></p>
            <p class="shopping-card__text shopping-card__text-block">Quantity: </p>
            <input class="shopping-card__input input-hover " type="number" name="quantity" required min="0"
               value="1" data-quantity-product="${this.id}" id="${this.id}-quantity-product">
         </div>
         <!-- close button -->
         <button type="submit" class="shopping-card__close" data-btn-cart-close="${this.id}">
            <svg class="shopping-card__close-svg close trans" width="18" height="18" viewBox="0 0 18 18"
               fill="#575757" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
             </svg>
          </button>
       </div>`;
   }
}
//-------Класс создания карточек в корзине-------
class ProductsCart {
   constructor() {
      this.products = [];//Массив объектов JSON (карточек продуктов в корзине)
   }
   //-------Метод передачи карточек в массив-----------
   fetchProducts() {
      makeGETRequest('json/getBasket.json')
         .then(data => {
            this.products = data.contents;
            this.addListProductCart();
         })
   }
   //----Метод рендеринга списка товаров в корзине-----
   renderPageCart(id) {
      let product = this.products[id - 1];
      const goodItem = new GoodsItemCart(product.id_product, product.title, product.price, product.color, product.size);
      document.querySelector('.shopping__grid-wrap').insertAdjacentHTML('beforeend', goodItem.renderProductCart())
   }
   //-----Метод подсчёта общей суммы всех товаров в каталоге----
   sumCount() {
      let zeroPrice = 0;
      this.products.forEach(product => {
         zeroPrice += product.price; //Добавить подсчёт общей суммы с учётом количества каждой единицы товара в корзне
      })
      document.querySelector('.shopping-totalcost__h5-collor').innerHTML = zeroPrice;
   }
   //-----Метод добавления карточки----
   addListProductCart() {
      let addCartCard = document.getElementsByClassName("card-hover");//Кнопки добавить в корзину товар
      for (let add of addCartCard) {
         add.addEventListener('click', () => {
            this.renderPageCart(add.dataset.btnCartAdd);
             this.removeListProductCart();
         })
      }
     
   }
   //-----Метод удаления карточки------
   removeListProductCart() {
      let closeCartCard = document.getElementsByClassName("shopping-card__close");//Кнопки удалееия карточки
      for (let item of closeCartCard) {
         item.onclick = () => {
            console.log(item.dataset.btnCartClose );
            let productCart = document.getElementById(item.dataset.btnCartClose + '-p-cart');
            productCart.remove();
         }
      }
   }
}
const listProductCart = new ProductsCart();
listProductCart.fetchProducts();
listProductCart.sumCount();




