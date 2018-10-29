var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}


function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('mainpage').style.marginLeft = '250px';
    document.getElementById('category').style.marginLeft = '190px';
    document.getElementById('item').style.marginLeft = '190px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('mainpage').style.marginLeft = '0';
    document.getElementById('category').style.marginLeft = '0';
    document.getElementById('item').style.marginLeft = '0';
}

var slideIndex = 0;
showSlides();
var slides, dots;
var timeoutHandle;

function showSlides() {
    var i;
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1; }
    for (i = 0; i < dots.length; i++) {

        dots[i].className = dots[i].className.replace(" active", "");

    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    timeoutHandle = setTimeout(showSlides, 3000); // Change image every 10 seconds
}

function plusSlides(position) {

    slideIndex += position;
    if (slideIndex > slides.length) { slideIndex = 1; }
    else if (slideIndex < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(showSlides, 10000);
}

function currentSlide(index) {

    if (index > slides.length) { index = 1; }
    else if (index < 1) { index = slides.length; }

    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[index - 1].style.display = "block";
    dots[index - 1].className += " active";
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(showSlides, 10000);
}

var burgerOne;
var burgerTwo;
var burgerThree;
var totalBurgers;
var burgerStorage;
var ListIds;
var VarIds;
var burgerPrices;
var orderPrice=0;

//function to calculate total items in users basket
function sumQuantity() {
    burgerOne = parseInt(document.getElementById("burgerOne").value);
    burgerTwo = parseInt(document.getElementById("burgerTwo").value);
    burgerThree = parseInt(document.getElementById("burgerThree").value);
    totalBurgers = burgerOne + burgerTwo + burgerThree;
    burgerStorage = localStorage.setItem('totalLocalBurgers', JSON.stringify([burgerOne, burgerTwo, burgerThree]));
    if (totalBurgers >0 && totalBurgers < 2) {
        document.getElementById("totalQuantity").innerHTML = totalBurgers + " item";
        
    }
    else {
        document.getElementById("totalQuantity").innerHTML = totalBurgers + " items";
        
    }
   
}


function sumCheckout() {
    ListIds = ['burgerOneList', 'burgerTwoList', 'burgerThreeList'];
    VarIds = ['chk-burger-one', 'chk-burger-two', 'chk-burger-three'];
    burgerStorage = JSON.parse(localStorage.getItem('totalLocalBurgers'));
    burgerPrices = [5.00, 7.50, 9.95];
    orderPrice = 0;

    for (var i = 0; i < burgerStorage.length;i++){
        if (burgerStorage[i] === 0) {
            document.getElementById(ListIds[i]).style.display = "none";
        }
        else {
            document.getElementById(VarIds[i]).innerHTML = burgerStorage[i];
        }
    }
    for (var i = 0; i < burgerStorage.length; i++) {
        orderPrice += (burgerPrices[i]*burgerStorage[i]);
    }
    document.getElementById("totalPrice").innerHTML = "$" + orderPrice;
    
}

function addItem(burgerItem) {
    burgerStorage = JSON.parse(localStorage.getItem('totalLocalBurgers'));
    orderPrice = 0;
    for (var i = 0; i < burgerStorage.length; i++) {
        if (burgerItem === VarIds[i]) {
            burgerStorage[i] += 1;
            document.getElementById(VarIds[i]).innerHTML = burgerStorage[i];
        }
    }

    for (var i = 0; i < burgerStorage.length; i++) {
        orderPrice += (burgerPrices[i] * burgerStorage[i]);
    }
    document.getElementById("totalPrice").innerHTML = "$" + orderPrice;

    burgerStorage = localStorage.setItem('totalLocalBurgers', JSON.stringify([burgerStorage[0],
        burgerStorage[1], burgerStorage[2]]));
  
 }

function removeItem(burgerItem) {
    burgerStorage = JSON.parse(localStorage.getItem('totalLocalBurgers'));
    orderPrice = 0;
    for (var i = 0; i < burgerStorage.length; i++) {
        if (burgerItem === VarIds[i] && burgerStorage[i] > 0) {
            burgerStorage[i] -= 1;
            document.getElementById(VarIds[i]).innerHTML = burgerStorage[i];
        }
    }
    for (var i = 0; i < burgerStorage.length; i++) {
        orderPrice += (burgerPrices[i] * burgerStorage[i]);
    }
    document.getElementById("totalPrice").innerHTML = "$" + orderPrice;

    burgerStorage = localStorage.setItem('totalLocalBurgers', JSON.stringify([burgerStorage[0],
    burgerStorage[1], burgerStorage[2]]));
}