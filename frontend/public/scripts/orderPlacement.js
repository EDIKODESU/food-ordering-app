function renderListOrder(dataOrder){
    let modal_body_nameList = document.querySelector(".modal_body_nameList")

    if (!dataOrder || dataOrder.length == 0) {
        const textEmptyList = document.createElement("p")
        textEmptyList.className = "textEmptyList";
        textEmptyList.textContent = "Список заказів пустий";
        modal_body_nameList.append(textEmptyList);
        return;
    }

    for (let i = 0; i < dataOrder.length; i++) {
        let totalPrice = 0;
        const listInfoBox = document.createElement('div');
        listInfoBox.classList.add('listInfoBox');

        const listInfoAddress = document.createElement('p');
        listInfoAddress.classList.add('listInfoAddress');
        if(!dataOrder[i].isDelivery) listInfoAddress.textContent = `Helthy&Tasty (${dataOrder[i].restaurantAddress.address})`;
        else listInfoAddress.textContent = `Helthy&Tasty (${dataOrder[i].deliveryAddress})`;

        listInfoBox.appendChild(listInfoAddress);
        
        if (dataOrder[i].dishes.length != 0) {
            for (let j = 0; j < dataOrder[i].dishes.length; j++) {
            const listInfoProduct = document.createElement('div');
            listInfoProduct.classList.add('listInfoProduct');

            const listProductName = document.createElement('p');
            listProductName.classList.add('listProductName');
            listProductName.textContent = dataOrder[i].dishes[j].orderDish.count + " x " + dataOrder[i].dishes[j].name;
            console.log( dataOrder[i]);
    
            const listProductPrise = document.createElement('p');
            listProductPrise.classList.add('listProductPrise');
            listProductPrise.textContent = `${(dataOrder[i].dishes[j].price * dataOrder[i].dishes[j].orderDish.count)}₴`;
            totalPrice += dataOrder[i].dishes[j].price * dataOrder[i].dishes[j].orderDish.count;

            listInfoProduct.appendChild(listProductName);
            listInfoProduct.appendChild(listProductPrise);
            listInfoBox.appendChild(listInfoProduct);
        }}
        
        if (dataOrder[i].drinks.length != 0) {
            for (let j = 0; j < dataOrder[i].drinks.length; j++) {
                const listInfoProduct = document.createElement('div');
                listInfoProduct.classList.add('listInfoProduct');

                const listProductName = document.createElement('p');
                listProductName.classList.add('listProductName');
                listProductName.textContent = dataOrder[i].drinks[j].orderDrink.count + " x " + dataOrder[i].drinks[j].name;
        
                const listProductPrise = document.createElement('p');
                listProductPrise.classList.add('listProductPrise');
                listProductPrise.textContent = `${(dataOrder[i].drinks[j].price * dataOrder[i].drinks[j].orderDrink.count)}₴`;
                totalPrice += dataOrder[i].drinks[j].price * dataOrder[i].drinks[j].orderDrink.count;
    
                listInfoProduct.appendChild(listProductName);
                listInfoProduct.appendChild(listProductPrise);
                listInfoBox.appendChild(listInfoProduct);
            }
        }
        
        const listInfoBoxDetail = document.createElement('div');
        listInfoBoxDetail.classList.add('listInfoBoxDetail');

        const listInfoCutlery = document.createElement('p');
        listInfoCutlery.classList.add('listInfoCutlery');
        listInfoCutlery.textContent = `Кількість приборів: ${dataOrder[i].cutlery}`;

        const listInfoPaument = document.createElement('p');
        listInfoPaument.classList.add('listInfoPaument');
        listInfoPaument.textContent = `Оплата: ${dataOrder[i].payment}`;

        const listInfoStatus = document.createElement('p');
        listInfoStatus.classList.add('listInfoStatus');
        listInfoStatus.textContent = `Статус заказу: ${dataOrder[i].status}`;

        const listInfoBoxTotalPrice = document.createElement('div');
        listInfoBoxTotalPrice.classList.add('listInfoBoxTotalPrice');

        const listInfoTotalPrice = document.createElement('p');
        listInfoTotalPrice.classList.add('listInfoTotalPrice');
        listInfoTotalPrice.textContent = `Total: ${totalPrice}₴`;

        const listInfoData = document.createElement('p');
        listInfoData.classList.add('listInfoData');
        listInfoData.textContent = dataOrder[i].timestamp;

        listInfoBoxDetail.appendChild(listInfoCutlery);
        listInfoBoxDetail.appendChild(listInfoPaument);
        listInfoBoxDetail.appendChild(listInfoStatus);

        listInfoBoxTotalPrice.appendChild(listInfoTotalPrice);
        listInfoBoxTotalPrice.appendChild(listInfoData);

        listInfoBox.appendChild(listInfoBoxDetail);
        listInfoBox.appendChild(listInfoBoxTotalPrice);

        modal_body_nameList.appendChild(listInfoBox);
    }

}

function renderSuccessfull() {
    let modal_body_nameCart = document.querySelector(".modal_body_nameCart");
    modal_body_nameCart.innerHTML = "";
    let successfullOrder = document.createElement("p");
    successfullOrder.className = "successfullOrder";
    successfullOrder.textContent = "Успішне оформлення заказу";
    modal_body_nameCart.append(successfullOrder);
    cart.length = 0;
    RenderBadgeCart(cart.length);
    setTimeout(deleteCartWindow, 400);
    localStorage.setItem("cart", JSON.stringify(cart));
}

async function sendOrder() {
    let cartErrText = document.querySelector(".cartErrText");

    if (!token) {
        if (cartErrText.textContent == "") cartErrText.textContent = "Будь ласка, авторизуйтесь, щоб оформити замовлення";
        return;
    }

    let cutlery = +document.querySelector(".orderCountCart").textContent;
    let price = +document.querySelector(".orderTotalPrice").textContent.slice(7, -1);
    let clarificationByPhone = document.querySelector('input[name="CallBack"]').checked;
    let payment = document.querySelector('input[name="payment"]:checked').nextElementSibling.textContent;
    let isDelivery = false;
    let address = null;
    restaurantAddressId = null;

    let radioButtonsAddress = document.querySelector('input[name="option"]:checked');
    let fieldAddress = document.querySelector(".InputAddress").value;

    let selectAddress = document.querySelector(".selectAddress");
    let fieldSelect = selectAddress.options[selectAddress.selectedIndex];
    if(radioButtonsAddress.id == "anotheAddress"){
        isDelivery = true;
        if (fieldAddress == "") {
            if (cartErrText.textContent == "") cartErrText.textContent = "Адресса не може бути пустою";
            return;
        }
        address = fieldAddress;
        console.log("address:", address);
    }
    else if (radioButtonsAddress.id == "restaurantAddress") {
        restaurantAddressId = fieldSelect.value;
    }
    else {
        isDelivery = true;
        address = document.querySelector(".addressLog").textContent.slice(9);
    }
    const dishes = cart.filter((val) => val.type == "dishes").map((val) => {
        return {id: val.product.id, count: val.count};
    });
    const drinks = cart.filter((val) => val.type == "drinks").map((val) => {
        return {id: val.product.id, count: val.count};
    });
    let data = {
        isDelivery,
        address,
        restaurantAddressId,
        cutlery,
        clarificationByPhone,
        payment,
        price,
        dishes,
        drinks
    }
    
    await instance.post(`http://localhost:3000/api/order`, data);
    renderSuccessfull();
}