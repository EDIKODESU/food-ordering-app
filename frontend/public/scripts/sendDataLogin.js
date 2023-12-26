let btn_login = document.querySelector(".btn_send");
let errText = document.querySelector(".logErrText");

const loginRegex = /^.{4,20}$/;
const passwordRegex = /^.{8,25}$/;

token = true;
let arrRegex = [];
arrRegex.push(loginRegex);
arrRegex.push(passwordRegex);

function getLogData() {
  let logData = {};
  logData.login = document.querySelector(".login").value;
  logData.password = document.querySelector(".pswrd").value;
  return logData;
}

btn_login.addEventListener("click", () => {
  let fields = document.querySelectorAll(".inputField");
  let valueFields = document.querySelectorAll(".inputValue");

  for(let i = 0; i < fields.length; i++)
  {
    if(!valid(valueFields[i].value, arrRegex[i], fields[i])) 
    {
      errText.textContent = "Пусте або неправильно заповнене поле";
      return;
    } else errText.textContent = ""; 
  }
  let data = getLogData();
  instance.post('http://localhost:3000/api/auth/login', data)
  .then((response) => {
    closeModal();
    window.location.reload();
  })
  .catch(function (error) {
    if (error.response.status == 401) {
      errText.textContent = "Користувача не знайдено";
    }
  });
});

async function LogOut() {
  
  await instance.get("http://localhost:3000/api/auth/logout");
  window.location.reload();
}

function renderLoggedUser(dataClient){
  let modal_body = document.querySelector(".modal_body");
  modal_body.textContent = "";

  let logIcon = document.querySelector(".logIcon");
  logIcon.innerHTML = "";
  logIcon.style.background = "#2c2d2c";

  let NameIcon = document.createElement('p');
  NameIcon.className = "NameIcon";
  NameIcon.textContent = dataClient.firstName.substring(0, 1).toUpperCase() + dataClient.lastName.substring(0, 1).toUpperCase();
  logIcon.append(NameIcon);

  let modal_head_name = document.querySelector(".modal_head_name");
  modal_head_name.textContent = dataClient.login;

  let infoLogContent = document.createElement('div');
  infoLogContent.className = "infoLogContent";
  modal_body.append(infoLogContent);

  for (let key in dataClient) {
    if(key != "login") {
      let elem = document.createElement('p');
      elem.className = key + "Log";
      elem.innerText = key + ": " + dataClient[key];
      infoLogContent.append(elem);
    }
  }

  let buttonLogOut = document.createElement('button');
  buttonLogOut.className = "buttonLogOut";
  buttonLogOut.textContent = "Вийти";
  buttonLogOut.onclick = () => LogOut();
  infoLogContent.append(buttonLogOut);
}

window.onload = () => {
  instance.get('http://localhost:3000/api/auth/me')
  .then((responce) => {
    renderLoggedUser(responce.data);
  })
  .catch(function (error) {
    if (error.response.status == 401) {
      // saveToken();
      token = false;
      console.log("errJWT");
    }
  });
}

function valid(value, regex, field) {
  const validData = regex.test(value);

  if (!validData) {
    field.style.borderBottom = '1.5px solid #e94a4a';
    return false;
  } else {
    field.style.borderBottom = '1.5px solid #8bd862';
    return true;
  }
}