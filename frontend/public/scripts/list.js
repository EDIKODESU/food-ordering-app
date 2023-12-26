let btn_openList = document.querySelector(".listIcon");
let modal_screenList = document.querySelector(".modal_screenList");
let pop_upList = document.getElementById("modalList");
let modal_windowList = document.querySelector(".modal_windowList");
let modal_bodyList = document.querySelector(".modal_body_nameList");

async function openList() {
    if (token) {
        let responce = await instance.get(`http://localhost:3000/api/order/all`);
        renderListOrder(responce.data.order);
    }
    else renderListOrder();
    
    pop_upList.classList.add("modal_activeList");
    modal_windowList.scrollTop = 0;
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
    modal_screenList.classList.add("mscreen_activeList");
}

function closeList() {
    pop_upList.classList.remove("modal_activeList");
    setTimeout(DeleteModalList, 560);
}

let DeleteModalList = () =>
{
    modal_screenList.classList.remove("mscreen_activeList");
    window.onscroll = function(){};
    modal_bodyList.innerHTML = "";
}