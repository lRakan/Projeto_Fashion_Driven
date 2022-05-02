let featuresSelected = 0;
let url = "invalid URL";
const refImageInput = document.querySelector("#reference-image-input");
const refImageButton = document.querySelector("#reference-image-button");
let id = null;
let model = null;
let neck = null;
let material = null;
let image = null;
let owner = null;
let author = null;
let space = " ";

function startApp() {
    userReception();
    getLastOrders();
}
startApp();

function userReception() {
    const userName = prompt("Qual é o seu nome?");
    if (userName != null && userName != undefined && userName != "") {
        alert(`Olá ${userName}, seja bem vindo à Fashion Driven!`);
    } else {
        startApp();
    }
    owner = userName;
    author = userName;
}

function getLastOrders() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promise.then(renderizeLastOrders);
}

function renderizeLastOrders(answer) {
    let lastOrdersContainer = document.querySelector(".last-orders-container");
    lastOrdersContainer.innerHTML = "";
    for (i = 0; i < answer.data.length; i++) {
        id = answer.data[i].id;
        model = answer.data[i].model;
        neck = answer.data[i].neck;
        material = answer.data[i].material;
        image = answer.data[i].image;
        owner = answer.data[i].owner;
        author = answer.data[i].owner;
        if (i >= answer.data.length - 10) {
            const order = `
                    <div class="last-order-box" id="${id}" onclick="purchaseFromLastOrders(this)">
                        <div width="180px" height="180px" class="last-orders-image">
                            <img src="${image}" alt="pedido${id}">
                        </div>
                        <div class="last-orders-creator">
                            <span>Criador</span> <span id="creator">${space}${author}</span>
                        </div>
                        <ul class="orders-data hidden ${id}">
                            <li class="model-${id}" id="${model}"></li>
                            <li class="neck-${id}" id="${neck}"></li>
                            <li class="material-${id}" id="${material}"></li>
                            <li class="image-${id}" id="${image}"></li>
                            <li class="owner-${id}" id="${owner}"></li>
                            <li class="author-${id}" id="${author}"></li>
                        </ul>
                    </div>
                `;
            lastOrdersContainer.innerHTML += order;    
        }
    }
}

let selectModel = (element) => {
    const tShirt = document.querySelector("#t-shirt");
    const tankTop = document.querySelector("#top-tank");
    const longSleeves = document.querySelector("#long");
    const selectedModel = element;
    selectedModel.classList.toggle("selected");
    if (selectedModel == tShirt) {
        tankTop.classList.remove("selected");
        longSleeves.classList.remove("selected");
        featuresSelected = featuresSelected + 1;
    } else if (selectedModel == tankTop) {
        tShirt.classList.remove("selected");
        longSleeves.classList.remove("selected");
        featuresSelected = featuresSelected + 1;
    } else if (selectedModel == longSleeves) {
        tShirt.classList.remove("selected");
        tankTop.classList.remove("selected");
        featuresSelected = featuresSelected + 1;
    }
    model = element.id;
    enableButton();
};

let selectNeck = (element) => {
    const vNeck = document.querySelector("#v-neck");
    const round = document.querySelector("#round");
    const poloShirt = document.querySelector("#polo");
    const selectedNeck = element;
    selectedNeck.classList.toggle("selected");  
    if (selectedNeck == vNeck) {
      round.classList.remove("selected");
      poloShirt.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    } else if (selectedNeck == round) {
      vNeck.classList.remove("selected");
      poloShirt.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    } else if (selectedNeck == poloShirt) {
      vNeck.classList.remove("selected");
      round.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    }
    neck = element.id;
    enableButton();
};

let selectMaterial = (element) => {
    const silk = document.querySelector("#silk");
    const organicCotton = document.querySelector("#cotton");
    const poliester = document.querySelector("#polyester");
    const selectedMaterial = element;
    selectedMaterial.classList.toggle("selected");  
    if (selectedMaterial == silk) {
      organicCotton.classList.remove("selected");
      poliester.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    } else if (selectedMaterial == organicCotton) {
      silk.classList.remove("selected");
      poliester.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    } else if (selectedMaterial == poliester) {
      silk.classList.remove("selected");
      organicCotton.classList.remove("selected");
      featuresSelected = featuresSelected + 1;
    }
    material = element.id;
    enableButton();
};

function checkInputEvent() {
    console.log(refImageInput.value);
    enableButton();
}

function validateUrl() {
    if (validateUrl(refImageInput.value) === true) {
        url = "valid URL";
    } else {
        url = "invalid URL";
    }
}

