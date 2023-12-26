let register_btn = document.querySelector('.btn_register');
let phoneInput = document.querySelector(".phone");
let errText = document.querySelector(".regErrText");
let LabelName = document.querySelectorAll(".LabelName");

phoneInput.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

const loginRegex = /^.{4,20}$/;
const passwordRegex = /^.{8,25}$/;
const emailRegex = /^[^\s@]{2,45}@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^.{2,45}$/;
const addressRegex = /^.{10,100}$/;
const phoneRegex = /^.{14}$/;

let arrRegex = [];
arrRegex.push(loginRegex);
arrRegex.push(nameRegex);
arrRegex.push(nameRegex);
arrRegex.push(passwordRegex);
arrRegex.push(passwordRegex);
arrRegex.push(phoneRegex);
arrRegex.push(addressRegex);
arrRegex.push(emailRegex);


function getRegData() {
  let dataReg = {};
  dataReg.login = document.querySelector(".login").value;
  dataReg.password = document.querySelector(".pswrd").value;
  dataReg.email = document.querySelector(".email").value;
  dataReg.firstName = document.querySelector(".firstName").value;
  dataReg.lastName = document.querySelector(".lastName").value;
  dataReg.phone = document.querySelector(".phone").value;
  dataReg.address = document.querySelector(".address").value;
  return dataReg;
}

register_btn.addEventListener("click", () => {

  let fields = document.querySelectorAll(".inputField");
  let valueFields = document.querySelectorAll(".inputValue");

  for(let i = 0; i < fields.length; i++)
  {
    if(!valid(valueFields[i].value, arrRegex[i], fields[i])) 
    {
      errText.textContent = "Пусте або неправильно заповнене поле";
      return;
    } else errText.textContent = "";

    if(LabelName[i].textContent == "Repeat password") 
    {
      if(valueFields[i].value != valueFields[i-1].value)
      {
        errText.textContent = "Паролі не співпадають";
        fields[i].style.borderBottom = '1.5px solid #e94a4a';
        return;
      } 
      else
      {
        errText.textContent = "";
        fields[i].style.borderBottom = '1.5px solid #8bd862';
      }
    };

    if(LabelName[i].textContent == "Last name" || LabelName[i].textContent == "First name") 
    {
      if(/\d/.test(valueFields[i].value))
      {
        errText.textContent = "Поле не повинно містити цифри";
        fields[i].style.borderBottom = '1.5px solid #e94a4a';
        return;
      } 
      else 
      {
        errText.textContent = "";
        fields[i].style.borderBottom = '1.5px solid #8bd862';
      }
    };
    
  }
  let data = getRegData();
  axios.post('http://localhost:3000/api/auth/register', data)
  .then(() => {
    window.location.href = "/";
  })
  .catch(function (error) {
    if (error.response.status == 409) {
      errText.textContent = "Такий корисувач вже існує";
    }
  });
});

function valid(value, regex, field)
{

  const validData = regex.test(value);

  if (!validData) {
    field.style.borderBottom = '1.5px solid #e94a4a';
    return false;
  } else {
    field.style.borderBottom = '1.5px solid #8bd862';
    return true;
  }
}