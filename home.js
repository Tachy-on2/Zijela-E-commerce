const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');

cartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    cartSidebar.classList.add('open');
    closeNav()
});

closeCartBtn.addEventListener('click', function () {
    cartSidebar.classList.remove('open');
});

let cart = [];


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productDiv = btn.closest('.product');
            const id = productDiv.getAttribute('data-id');
            const title = productDiv.getAttribute('data-title');
            const img = productDiv.getAttribute('data-img');
            const price = productDiv.getAttribute('data-price');
            addToCart({ id, title, img, price });
        });
    });
});

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemTotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p> <p class="empty-cart">Add some products to see them here.</p>';
        document.getElementById('cart-total').textContent = 'Total: $0.00';
        return;
    }
    cart.forEach((itm, idx) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        const priceNum = parseFloat(itm.price) || 0;
        total += priceNum * itm.qty;
        itemTotal = priceNum * itm.qty;
        div.setAttribute('data-id', itm.id);
        let actionBtn = '';
        if (itm.qty > 1) {
            actionBtn = `<button class="reduce-cart-item" data-idx="${idx}" aria-label="Reduce">-</button>`;
        } else {
            actionBtn = `<button class="remove-cart-item" data-idx="${idx}" aria-label="Remove">&times;</button>`;
        }
        div.innerHTML = `
            <img src="${itm.img}" alt="${itm.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${itm.title}</div>
                <div class="cart-item-qty">Qty: ${itm.qty}</div>
                <div class="cart-item-price">Price: $${itemTotal}</div>
            </div>
            <div class="cart-item-actions">
            ${actionBtn}
            <button class="increase-cart-item" data-idx="${idx}" aria-label="Add">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });
    document.getElementById('cart-total').textContent = `Total: $${total}`;

    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            renderCart();
        });
    });
    document.querySelectorAll('.reduce-cart-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(btn.getAttribute('data-idx'));
            removeFromCart(cart[idx]);
        });
    });
    document.querySelectorAll('.increase-cart-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(btn.getAttribute('data-idx'));
            addToCart(cart[idx]);
        });
    });
}

function removeFromCart(itm) {
    if (itm.qty > 1) {
        itm.qty -= 1;
    }
    else {
        const idx = cart.indexOf(itm);
        if (idx > -1) cart.splice(idx, 1);
    }
    renderCart();
}

function increaseQty(itm) {
    itm.qty += 1;
    renderCart();
}

function addToCart(product) {
    const found = cart.find(itm => itm.id === product.id);
    if (found) {
        found.qty += 1;
    }
    else {
        cart.push({ ...product, qty: 1 });
    }

    renderCart();
    cartSidebar.classList.add('open');
}

function replaceBtn(itm) {
    if (itm.qty > 1) {
        let remove = document.getElementsByClassName("remove-cart-item").innerHTML;
        document.getElementsByClassName("remove-cart-item").innerHTML = remove.replace(closeCartBtn, removeFromCart)
        remove.style.display = "none"
    }
    else {
        remove.style.display = "flex"
    }

}


window.addToCart = addToCart;


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    var header = document.getElementsByTagName("header")[0];
    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "80%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Adding event listener for mobile nav cart icon
const mobileCartBtn = document.querySelector('.mobile-nav #cart-btn');
if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        cartSidebar.classList.add('open');
        closeNav();
    });
}

const scroller = document.querySelectorAll(".scroller");

function addAnimation(){
    scroller.forEach((scroller) =>{
        scroller.getAttribute("data-animated", true)
    })
}