const passwordInput = document.querySelector(".input");
const generateButton = document.querySelector(".generateButton");
const copyButton = document.querySelector(".copyButton");
const toastArea = document.querySelector(".toastArea");

const generatePassword = () => {
  let password = "";
  let upperCase = [`ABCDEFGHIJKLMNOPQRSTUVWXYZ`];
  let lowerCase = [`abcdefghijklmnopqrstuvwxyz`];
  let numbers = [`012345689`];
  let special = [`@!#$%&*(){}[]+-=_`];
  let allChar = [upperCase + lowerCase + numbers + special];
  password += upperCase[0][Math.floor(Math.random() * upperCase[0].length)];
  password += lowerCase[0][Math.floor(Math.random() * lowerCase[0].length)];
  password += numbers[0][Math.floor(Math.random() * numbers[0].length)];
  password += special[0][Math.floor(Math.random() * special[0].length)];

  for (let i = 0; i < 6; i++) {
    password += allChar[0][Math.floor(Math.random() * allChar[0].length)];
  }

  passwordInput.value = password;
  validationItems.forEach((item) => {
    item.classList.add("isValid");
  });
  validationIcons.forEach((icon) => {
    icon.className = "fa-solid fa-circle-check";
  });
};

const validationItems = document.querySelectorAll(".validate__item");
const validationIcons = document.querySelectorAll("[data-name]");

passwordInput.addEventListener("keyup", (e) => {
  validationItems.forEach(() => {
    if (e.target.value.length >= 10) {
      validationItems[0].classList.add("isValid");
      validationIcons[0].className = "fa-solid fa-circle-check";
    } else {
      validationItems[0].classList.remove("isValid");
      validationIcons[0].className = "fa-solid fa-circle-xmark";
    }

    if (/[A-Z]/.test(e.target.value)) {
      validationItems[1].classList.add("isValid");
      validationIcons[1].className = "fa-solid fa-circle-check";
    } else {
      validationItems[1].classList.remove("isValid");
      validationIcons[1].className = "fa-solid fa-circle-xmark";
    }
    if (/[a-z]/.test(e.target.value)) {
      validationItems[2].classList.add("isValid");
      validationIcons[2].className = "fa-solid fa-circle-check";
    } else {
      validationItems[2].classList.remove("isValid");
      validationIcons[2].className = "fa-solid fa-circle-xmark";
    }
    if (/[0-9]/.test(e.target.value)) {
      validationItems[3].classList.add("isValid");
      validationIcons[3].className = "fa-solid fa-circle-check";
    } else {
      validationItems[3].classList.remove("isValid");
      validationIcons[3].className = "fa-solid fa-circle-xmark";
    }
    if (/[^a-zA-Z0-9]/.test(e.target.value)) {
      validationItems[4].classList.add("isValid");
      validationIcons[4].className = "fa-solid fa-circle-check";
    } else {
      validationItems[4].classList.remove("isValid");
      validationIcons[4].className = "fa-solid fa-circle-xmark";
    }
  });
});

const copyText = () => {
  let toastNotification = document.createElement("div");
  toastNotification.classList.add("toast");

  if (passwordInput.value.length === 0) {
    toastNotification.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
must type a password`;
    toastNotification.classList.add("error");
    toastArea.appendChild(toastNotification);
  }
  if (passwordInput.value.length) {
    let items = [...validationItems];
    items.every((item) => {
      if (item.classList.contains("isValid")) {
        passwordInput.select();
        navigator.clipboard
          .writeText(passwordInput.value)
          .then(() => {
            toastNotification.innerHTML = `<i class="fa-solid fa-circle-check"></i>
       Copied !`;
            toastNotification.classList.add("success");
            toastArea.appendChild(toastNotification);
          })
          .catch(() => {
            alert("error");
          });
      } else {
        toastNotification.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>
     invalid password`;
        toastNotification.classList.add("invalid");
        toastArea.appendChild(toastNotification);
      }
    });

    // if (
    //   items.every((item) => {
    //     item.classList.contains("isValid");
    //   })
    // ) {
    //   console.log("hey");
    // }
  }

  setTimeout(() => {
    toastNotification.remove();
  }, 5000);
};

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyText);
