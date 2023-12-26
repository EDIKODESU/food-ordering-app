let bodyCart = document.querySelector("body");
let btn_openCart = document.querySelector(".cartIcon");
let btn_closeCart = document.querySelector(".btmCloseModalWindowCart");
let modal_screenCart = document.querySelector(".modal_screenCart");
let pop_upCart = document.getElementById("modalCart");
let modal_windowCart = document.querySelector(".modal_windowCart");
let modal_body = document.querySelector(".modal_body_nameCart");

let orderTotalPrice = null;

async function getAddress() {
    const response = await instance.get(`http://localhost:3000/api/restaurantAddress`);
    return response.data;
}

async function getInfoToken() {
    const response = await instance.get('http://localhost:3000/api/auth/me');
    return response.status;
}

function renderResultProductCart(Price, addresses) {
    const productBoxCartResult = document.createElement('div');
    productBoxCartResult.classList.add('productBoxCartResult');

    const cartPreciseOrderBox = document.createElement('div');
    cartPreciseOrderBox.classList.add('CartPreciseOrderBox');

    const cartNumberCutleryBox = document.createElement('div');
    cartNumberCutleryBox.classList.add('CartNumberCutleryBox');

    const orderCountCartBox = document.createElement('div');
    orderCountCartBox.classList.add('orderCountCartBox');

    const orderCountCartPlus = document.createElement('button');
    orderCountCartPlus.classList.add('orderCountCartPlus');
    orderCountCartPlus.textContent = '+';

    const orderCountCart = document.createElement('p');
    orderCountCart.classList.add('orderCountCart');
    orderCountCart.textContent = '1';

    const orderCountCartMinus = document.createElement('button');
    orderCountCartMinus.classList.add('orderCountCartMinus');
    orderCountCartMinus.textContent = '-';

    const plus = counter(orderCountCart);
    orderCountCartPlus.onclick = () => plus(1);
    orderCountCartMinus.onclick = () => plus(-1);

    orderCountCartBox.appendChild(orderCountCartPlus);
    orderCountCartBox.appendChild(orderCountCart);
    orderCountCartBox.appendChild(orderCountCartMinus);

    const nameNumberCutlery = document.createElement('p');
    nameNumberCutlery.classList.add('nameNumberCutlery');
    nameNumberCutlery.textContent = 'Кількість приборів';

    cartNumberCutleryBox.appendChild(orderCountCartBox);
    cartNumberCutleryBox.appendChild(nameNumberCutlery);
    

    const addressOrder = document.createElement('div');
    addressOrder.classList.add('addressOrder');

    const chooseAddressName = document.createElement('p');
    chooseAddressName.classList.add('chooseAddressName');
    chooseAddressName.textContent = 'Виберіть адресу';

    const radioBoxCartInputOption = createRadioBoxCart('anotheAddress', 'Інша адреса', true);
    const inputField = createInputField('Напишить адресу');
    const radioBoxCartInputOptionDiv = document.createElement('div');
    radioBoxCartInputOptionDiv.classList.add('radioBoxCart');
    radioBoxCartInputOptionDiv.appendChild(radioBoxCartInputOption);
    radioBoxCartInputOptionDiv.appendChild(inputField);

    const radioBoxCartSelectOption = createRadioBoxCart('restaurantAddress', 'Адреса одного з закладів', false);
    const selectField = createSelectField(addresses);
    const radioBoxCartSelectOptionDiv = document.createElement('div');
    radioBoxCartSelectOptionDiv.classList.add('radioBoxCart');
    radioBoxCartSelectOptionDiv.appendChild(radioBoxCartSelectOption);
    radioBoxCartSelectOptionDiv.appendChild(selectField);

    const radioBoxCartMyAddress = createRadioBoxCart('myAddress', 'Моя адреса', false);
    const radioBoxCartMyAddressDiv = document.createElement('div');
    radioBoxCartMyAddressDiv.classList.add('radioBoxCart');
    radioBoxCartMyAddressDiv.appendChild(radioBoxCartMyAddress);

    addressOrder.appendChild(chooseAddressName);
    addressOrder.appendChild(radioBoxCartInputOptionDiv);
    addressOrder.appendChild(radioBoxCartSelectOptionDiv);
    addressOrder.appendChild(radioBoxCartMyAddressDiv);

    const checkboxCallBackLabel = document.createElement('label');
    checkboxCallBackLabel.classList.add('checkbox-callBack');

    const checkboxCallBack = document.createElement('input');
    checkboxCallBack.type = 'checkbox';
    checkboxCallBack.name = 'CallBack';
    checkboxCallBack.value = 'Передзвонити';

    const checkboxCustom = document.createElement('span');
    checkboxCustom.classList.add('checkbox-custom', 'checkbox-custom-callBack');

    checkboxCallBackLabel.appendChild(checkboxCallBack);
    checkboxCallBackLabel.appendChild(checkboxCustom);
    checkboxCallBackLabel.append('Передзвонити');

    cartPreciseOrderBox.appendChild(addressOrder);
    cartPreciseOrderBox.appendChild(checkboxCallBackLabel);

    const orderPlaceBox = document.createElement('div');
    orderPlaceBox.classList.add('orderPlaceBox');

    orderTotalPrice = document.createElement('p');
    orderTotalPrice.classList.add('orderTotalPrice');
    orderTotalPrice.textContent = `Разом: ${Price}₴`;

    const orderPlaceBtn = document.createElement('button');
    orderPlaceBtn.classList.add('orderPlaceBtn');
    orderPlaceBtn.textContent = 'Оформити замовлення';

    const cartErrText = document.createElement('p');
    cartErrText.classList.add('cartErrText');

    orderPlaceBtn.onclick = () => sendOrder();

    orderPlaceBox.appendChild(orderTotalPrice);
    orderPlaceBox.appendChild(orderPlaceBtn);

    cartPreciseOrderBox.appendChild(cartNumberCutleryBox);
    productBoxCartResult.appendChild(cartPreciseOrderBox);
    productBoxCartResult.appendChild(orderPlaceBox);
    productBoxCartResult.appendChild(cartErrText);

    const paymentBox = document.createElement("div");
    paymentBox.className = "paymentBox";

    const radioContainerPayment1 = document.createElement("div");
    radioContainerPayment1.className = "radio-containerPayment";

    const cardInput = document.createElement("input");
    cardInput.type = "radio";
    cardInput.name = "payment";
    cardInput.id = "card";
    cardInput.checked = true;

    const cardLabel = document.createElement("label");
    cardLabel.htmlFor = "card";
    cardLabel.textContent = "Карта";

    radioContainerPayment1.appendChild(cardInput);
    radioContainerPayment1.appendChild(cardLabel);

    const radioContainerPayment2 = document.createElement("div");
    radioContainerPayment2.className = "radio-containerPayment";

    const cashInput = document.createElement("input");
    cashInput.type = "radio";
    cashInput.name = "payment";
    cashInput.id = "cash";

    const cashLabel = document.createElement("label");
    cashLabel.htmlFor = "cash";
    cashLabel.textContent = "Готівка";

    radioContainerPayment2.appendChild(cashInput);
    radioContainerPayment2.appendChild(cashLabel);

    paymentBox.appendChild(radioContainerPayment1);
    paymentBox.appendChild(radioContainerPayment2);
    orderPlaceBox.appendChild(paymentBox);

    modal_body.appendChild(productBoxCartResult);

}

function createRadioBoxCart(id, labelText, isChecked) {
    const radioContainer = document.createElement('div');
    radioContainer.classList.add('radio-container');

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'option';
    radioInput.id = id;
    radioInput.checked = isChecked;

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = id;
    radioLabel.textContent = labelText;

    radioContainer.appendChild(radioInput);
    radioContainer.appendChild(radioLabel);

    return radioContainer;
}

function createInputField(placeholder) {
    const inputField = document.createElement('div');
    inputField.classList.add('input-field');

    const inputAddress = document.createElement('input');
    inputAddress.classList.add('InputAddress');
    inputAddress.type = 'text';
    inputAddress.placeholder = placeholder;

    inputField.appendChild(inputAddress);

    return inputField;
}

function createSelectField(addresses) {
    const selectField = document.createElement('div');
    selectField.classList.add('select-field', 'hidden');

    const selectAddress = document.createElement('select');
    selectAddress.classList.add('selectAddress');

    for (let i = 0; i < addresses.length; i++) {
        let element =  document.createElement('option');
        element.value = addresses[i].id;
        element.textContent = addresses[i].address;
        selectAddress.appendChild(element);
    }
    selectField.appendChild(selectAddress);
    return selectField;
}

async function renderProductsCart(cartProducts, data) {

    if(cartProducts.length == 0) {
        let textEmptyCart = document.createElement('p');
        textEmptyCart.className = 'textEmptyCart';
        textEmptyCart.textContent = "Корзина пуста :("
        modal_body.append(textEmptyCart);
        return;
    }

    let totalPrice = 0; 

    for (let i = 0; i < cartProducts.length; i++) {

        totalPrice += cartProducts[i].product.price * cartProducts[i].count;

        let productBoxCart = document.createElement('div');
        productBoxCart.className = 'productBoxCart';

        let productCartImg = document.createElement('img');
        productCartImg.className = 'productCartImg';
        productCartImg.src = cartProducts[i].product.img;
        productCartImg.alt = 'img';
        productBoxCart.appendChild(productCartImg);

        let productContentCart = document.createElement('div');
        productContentCart.className = 'productContentCart';
        productBoxCart.appendChild(productContentCart);

        let productCartName = document.createElement('p');
        productCartName.className = 'productCartName';
        productCartName.textContent = cartProducts[i].product.name;
        productContentCart.appendChild(productCartName);

        let productCartPrice = document.createElement('p');
        productCartPrice.className = 'productCartPrice';
        productCartPrice.textContent = `${cartProducts[i].product.price * cartProducts[i].count}₴`;
        productContentCart.appendChild(productCartPrice);

        let productInteractionCart = document.createElement('div');
        productInteractionCart.className = 'productInteractionCart';
        productBoxCart.appendChild(productInteractionCart);

        let productDeleteCart = document.createElement('button');
        productDeleteCart.className = 'productDeleteCart';
        productDeleteCart.textContent = 'Видалити';
        productInteractionCart.appendChild(productDeleteCart);

        let productCountCartBox = document.createElement('div');
        productCountCartBox.className = 'productCountCartBox';
        productInteractionCart.appendChild(productCountCartBox);

        let productCountCartPlus = document.createElement('button');
        productCountCartPlus.className = 'productCountCartPlus';
        productCountCartPlus.textContent = '+';
        productCountCartBox.appendChild(productCountCartPlus);

        let productCountCart = document.createElement('p');
        productCountCart.className = 'productCountCart';
        productCountCart.textContent = cartProducts[i].count;
        productCountCartBox.appendChild(productCountCart);

        let productCountCartMinus = document.createElement('button');
        productCountCartMinus.className = 'productCountCartMinus';
        productCountCartMinus.textContent = '-';
        productCountCartBox.appendChild(productCountCartMinus);

        const plus = counterCart(productCountCart, cartProducts[i].count);
        productCountCartPlus.onclick = () => {
            plus(1); 
            cartProducts[i].count = +productCountCart.textContent;
            let totalProductPrice = cartProducts[i].product.price * cartProducts[i].count;
            productCartPrice.textContent = `${totalProductPrice}₴`;
            let totalPrice = orderTotalPrice.textContent.slice(7);
            orderTotalPrice.textContent = "Разом: " + (parseInt(totalPrice) + cartProducts[i].product.price) + '₴';
            localStorage.setItem("cart", JSON.stringify(cart));
        };
        productCountCartMinus.onclick = () => {
            const prevCount = +productCountCart.textContent;
            plus(-1);
            if (+productCountCart.textContent == prevCount) return;
            cartProducts[i].count = +productCountCart.textContent;
            let totalProductPrice = cartProducts[i].product.price * cartProducts[i].count;
            productCartPrice.textContent = `${totalProductPrice}₴`;
            let totalPrice = orderTotalPrice.textContent.slice(7);
            orderTotalPrice.textContent = "Разом: " + (parseInt(totalPrice) - cartProducts[i].product.price) + '₴';
            localStorage.setItem("cart", JSON.stringify(cart));
        };

        productDeleteCart.onclick = () => deleteCart(cartProducts[i]);

        modal_body.appendChild(productBoxCart);
    }

    renderResultProductCart(totalPrice, data.addresses);

    let radioButtonsAddress = document.querySelectorAll('input[name="option"]');
    rdButtonProcessing(radioButtonsAddress);

}

function rdButtonProcessing(rdButtns) {
    let InputAddress = document.querySelector(".InputAddress");
    let selectField = document.querySelector(".select-field");
    rdButtns.forEach(function(rdButtn) {
        rdButtn.addEventListener('change', function() {
          if (this.checked) {
            if(this.id == "anotheAddress"){
                InputAddress.classList.remove('hidden');
                selectField.classList.add('hidden');
            }
            else if (this.id == "restaurantAddress") {
                InputAddress.classList.add('hidden');
                selectField.classList.remove('hidden');
            }
            else {
                InputAddress.classList.add('hidden');
                selectField.classList.add('hidden');
            }
          }
        });
    });
}

function counterCart(countElem, count) {
    return (number) => {
        if(count + number < 1) return;
        count += number;
        countElem.textContent = count;

    }
}

async function deleteCart(cartProduct) {
    cart = cart.filter((val) => val.product.id != cartProduct.product.id);
    modal_body.innerHTML = "";
    localStorage.setItem("cart", JSON.stringify(cart));
    let data = await getAddress();
    renderProductsCart(cart, data);
    RenderBadgeCart(cart.length);
}

btn_openCart.addEventListener("click", async function()
{
    let data = await getAddress();
    renderProductsCart(cart, data);
    pop_upCart.classList.add("modal_activeCart");
    modal_windowCart.scrollTop = 0;
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
    modal_screenCart.classList.add("mscreen_activeCart");
});

function  deleteCartWindow() {
    pop_upCart.classList.remove("modal_activeCart");
    setTimeout(DeleteModalCart, 560);
}

let DeleteModalCart = () =>
{
    modal_screenCart.classList.remove("mscreen_activeCart");
    window.onscroll = function(){};
    modal_body.innerHTML = "";
}

