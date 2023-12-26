let btnFilterAccept = document.querySelector(".btnFilterAccept");
let cartIcon = document.querySelector(".cartIcon");

let checkboxDish;
let checkboxDrink;
let seachValue;
let checkSortAlphabet;

let cart = [];

const instance = axios.create({
    withCredentials: true
});

function setCart() {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        RenderBadgeCart(cart.length);
    }
}

function renderProduct(product, productType)
{
    let menuBox = document.querySelector(".menuBox");

    let menuBoxCategory = null;
    let arrCategoryName = [];
    let isCategoryExist = false;
    for (let i = 0; i < product.length; i++) {
        let CategoryName = document.createElement('p');
        CategoryName.className = "CategoryName";
        let productContent = document.createElement('div');
        productContent.className = "productContent";
        let imgContent = document.createElement('div');
        imgContent.className = "imgContent";
        let NameProduct = document.createElement('p');
        NameProduct.className = "NameProduct";
        let descriptionProduct = document.createElement('p');
        descriptionProduct.className = "descriptionProduct";
        let imgProduct = document.createElement('img');
        imgProduct.className = "imgProduct";
        let priceProduct = document.createElement('p');
        priceProduct.className = "priceProduct";
        let btns_product = document.createElement('div');
        btns_product.className = "btns_product";
        let plusCount = document.createElement('button');
        plusCount.className = "plusCount";
        let minusCount = document.createElement('button');
        minusCount.className = "minusCount";
        let countProduct = document.createElement('p');
        countProduct.className = "countProduct";
        const plus = counter(countProduct);
        plusCount.onclick = () => plus(1);
        minusCount.onclick = () => plus(-1);

        let weightProduct = document.createElement("p");
        weightProduct.className = "weightProduct";

        if (productType == "dishes") {
            weightProduct.textContent = product[i].weight + "гр";
        }
        else weightProduct.textContent = product[i].volume + "мл";

        let addCartButton = document.createElement('button');
        addCartButton.className = "addCart";
        addCartButton.onclick = () => addCart(product[i], productType, +countProduct.textContent);

        for (let j = 0; j < arrCategoryName.length; j++) {
            if (arrCategoryName[j] == product[i].category) {
                isCategoryExist = true;
                break;
            }
        }

        if(!isCategoryExist) {
            arrCategoryName.push(product[i].category);
            CategoryName.innerHTML = product[i].category;
            menuBox.append(CategoryName);

            menuBoxCategory = document.createElement('div');
            menuBoxCategory.className = "menuBoxCategory";
            menuBox.append(menuBoxCategory);
        } else isCategoryExist = false;

        menuBoxCategory.append(productContent);
        productContent.append(imgContent);
        NameProduct.innerHTML = product[i].name;
        imgContent.append(NameProduct);
        descriptionProduct.innerHTML = product[i].description;
        imgContent.append(descriptionProduct);
        imgProduct.src = product[i].img;
        imgProduct.alt = "img";
        imgContent.append(imgProduct);
        priceProduct.innerHTML = `Ціна: ${product[i].price}₴`;
        productContent.append(priceProduct);
        productContent.append(btns_product);
        plusCount.innerHTML = "+";
        btns_product.append(plusCount);
        countProduct.innerHTML = "1";
        btns_product.append(countProduct);
        minusCount.innerHTML = "-";
        btns_product.append(minusCount);
        addCartButton.innerHTML = "Додати";
        btns_product.append(addCartButton);
        productContent.append(weightProduct);
    }
}

async function getDish(categories, priceOrder, seachValueOrder) {
    const response = await instance.get(`http://localhost:3000/api/dish`, {
        params: {
            ...(categories && categories.length > 0 ? { categories : categories.join(',')} : {}),
            ...(priceOrder ? { priceOrder } : {}),
            ...(seachValueOrder ? { seachValueOrder } : {})
        }
    });
    return response.data;
}

async function getDrink(categories, priceOrder, seachValueOrder) {
    const response = await instance.get(`http://localhost:3000/api/drink`, {
        params: {
            ...(categories && categories.length > 0 ? { categories : categories.join(',')} : {}),
            ...(priceOrder ? { priceOrder } : {}),
            ...(seachValueOrder ? { seachValueOrder } : {})
        }
    });
    return response.data;
}

function getCheckboxesFields(checkboxList) {
    const checkboxes = checkboxList.querySelectorAll('input[type="checkbox"]');
    const selectedCheckboxes = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedCheckboxes.push(checkbox.value);
        }
    });

    return selectedCheckboxes;
}

function alpabetSort(obj) {
    obj.sort(function(a, b) {
        let nameA = a.category.toLowerCase();
        let nameB = b.category.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return obj;
}

function counter(countElem) {
    let count = 1;
    return (number) => {
        if(count + number < 1) return;
        count += number;
        countElem.textContent = count;
    }
}

function RenderBadgeCart(countProduct) {
    const badgeCart = document.querySelector(".badgeCart");

    if (countProduct !== 0) {
        if (badgeCart) {
            badgeCart.innerHTML = countProduct;
        } else {
            const badge = document.createElement("span");
            badge.className = "badgeCart";
            badge.innerHTML = countProduct;
            cartIcon.appendChild(badge);
        }
    } else if (badgeCart) {
        badgeCart.remove();
    }
}

function addCart(product, productType, count) {
    if (cart.length == 0) cart.push({product, count, type: productType});
    else {
        let productIsExist = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.name == product.name) {
                cart[i].count += count;
                productIsExist = true;
                break; 
            }
        }
        if (!productIsExist) cart.push({product, count, type: productType});
    }
    RenderBadgeCart(cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
}

async function main() {
    let data = await getDish();
    let dish = data.dishes;
    let nameSection = Object.keys(data);
    renderProduct(dish, "dishes");

    data = await getDrink();
    let drink = data.drinks;
    nameSection = Object.keys(data);
    renderProduct(drink, "drinks");

    handleScroll();
}

async function filterPrice(order) {
    let data = await getDish(checkboxDish, order, seachValue);
    let dish = data.dishes;
    let nameSectionDish = Object.keys(data);

    data = await getDrink(checkboxDrink, order, seachValue);
    let drink = data.drinks;
    let nameSectionDrink = Object.keys(data);

    if(checkSortAlphabet) { dish = alpabetSort(dish); drink = alpabetSort(drink); }
    
    const menuBoxContent = document.querySelector('.menuBox');
    menuBoxContent.innerHTML = "";

    renderProduct(dish, nameSectionDish[0]);
    renderProduct(drink, nameSectionDrink[0]);
}

async function seach() {
    seachValue = document.querySelector(".seachField").value
    let data = await getDish(checkboxDish, '', seachValue);
    let dish = data.dishes;
    let nameSectionDish = Object.keys(data);

    data = await getDrink(checkboxDrink, '', seachValue);
    let drink = data.drinks;
    let nameSectionDrink = Object.keys(data);

    if(checkSortAlphabet) { dish = alpabetSort(dish); drink = alpabetSort(drink); }
    
    const menuBoxContent = document.querySelector('.menuBox');
    menuBoxContent.innerHTML = "";

    renderProduct(dish, nameSectionDish[0]);
    renderProduct(drink, nameSectionDrink[0]);
}

btnFilterAccept.addEventListener("click", async () => {
    const checkboxListDish = document.querySelector('.checkbox-list-Dish');
    const checkboxListDrink = document.querySelector('.checkbox-list-Drink');
    checkboxDish = getCheckboxesFields(checkboxListDish);
    checkboxDrink = getCheckboxesFields(checkboxListDrink);

    checkSortAlphabet = document.querySelector(".checkSortAlphabet").checked;

    let dataDish = await getDish(checkboxDish, '', seachValue);
    let nameSectionDish = Object.keys(dataDish);
    dataDish = dataDish.dishes;

    let dataDrink = await getDrink(checkboxDrink, '', seachValue);
    let nameSectionDrinks = Object.keys(dataDrink);
    dataDrink = dataDrink.drinks

    if(checkSortAlphabet) { dataDish = alpabetSort(dataDish); dataDrink = alpabetSort(dataDrink); }
    
    const menuBoxContent = document.querySelector('.menuBox');
    menuBoxContent.innerHTML = "";

    renderProduct(dataDish, nameSectionDish[0]);
    renderProduct(dataDrink, nameSectionDrinks[0]);
});

main();
setCart();