let categories = ["mens", "womens", "jewellery", "electronics"];
let priceRange = ["range1", "range2", "range3", "range4"];
let inputFields = {
  category: {
    mens: false,
    womens: false,
    jewellery: false,
    electronics: false,
  },
  ratingRange: {
    isChanged: false,
    rate: 0,
  },
  priceRange: {
    range1: false,
    range2: false,
    range3: false,
    range4: false,
  },
  search: {
    value: "",
  },
};

//fetchProducts
let products_catalog = document.querySelector(".products_catalog");
let allProducts;

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = [...data];
    displayProducts(data);
  })
  .catch((error) => console.log(error.message));

function displayProducts(products) {
  products_catalog.innerHTML = "";
  products.map((product, index) => {
    let div = document.createElement("div");
    div.setAttribute("class", "product");
    div.innerHTML = `<div class="product_image">
        <img
          src=${product.image}
        />
      </div>
      <div class="product_desc">
        <div class="title">
          <strong>${product.title}</strong>
        </div>
        <div class="price">Price: <strong>$${product.price}</strong></div>
        <div class="rating">Rating: <strong>${product.rating.rate}</strong></div>
      </div>`;
    let btn = document.createElement("button");
    btn.innerText = "Add To Cart";
    btn.type = "button";
    btn.setAttribute("class", "addToCartBtn btn btn-dark");
    div.append(btn);
    products_catalog.append(div);
    btn.addEventListener("click", () => addToCart(product));
  });
}

const filterProducts = () => {
  let filteredProducts = [...allProducts];

  if (inputFields.search.value != "") {
    let inputValue = inputFields.search.value;
    filteredProducts = filteredProducts.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  if (
    inputFields.category.mens == true ||
    inputFields.category.womens == true ||
    inputFields.category.jewellery == true ||
    inputFields.category.electronics == true
  ) {
    filteredProducts = filteredProducts.filter((item) => {
      if (
        (inputFields.category.mens && item.category == "men's clothing") ||
        (inputFields.category.womens && item.category == "women's clothing") ||
        (inputFields.category.jewellery && item.category == "jewelery") ||
        (inputFields.category.electronics && item.category == "electronics")
      )
        return item;
    });
  }

  if (inputFields.ratingRange.isChanged) {
    filteredProducts = filteredProducts.filter((item) => {
      if (Math.round(item.rating.rate) == inputFields.ratingRange.rate)
        return item;
    });
  }

  if (
    inputFields.priceRange.range1 == true ||
    inputFields.priceRange.range2 == true ||
    inputFields.priceRange.range3 == true ||
    inputFields.priceRange.range4 == true
  ) {
    filteredProducts = filteredProducts.filter((item) => {
      if (
        (inputFields.priceRange[priceRange[0]] &&
          isOfPriceRange(item, priceRange[0])) ||
        (inputFields.priceRange[priceRange[1]] &&
          isOfPriceRange(item, priceRange[1])) ||
        (inputFields.priceRange[priceRange[2]] &&
          isOfPriceRange(item, priceRange[2])) ||
        (inputFields.priceRange[priceRange[3]] &&
          isOfPriceRange(item, priceRange[3]))
      )
        return item;
    });
  }
  displayProducts(filteredProducts);
};

// let filterBtns=document.querySelectorAll(".filterBtn");

// filterBtns[0].addEventListener("click",()=>{
//   filterProducts();
// })
// filterBtns[1].addEventListener("click",()=>{
//   filterProducts();
//   closeModal();
// })

let filters1 = document.querySelectorAll(".filters1");
let filters2 = document.querySelectorAll(".filters2");

//categories filter
for (let i = 0; i < 4; i++) {
  filters1[i].addEventListener("change", () => {
    if (filters1[i].checked) inputFields.category[categories[i]] = true;
    else inputFields.category[categories[i]] = false;
    filterProducts();
  });
}

for (let i = 0; i < 4; i++) {
  filters2[i].addEventListener("change", () => {
    if (filters2[i].checked) inputFields.category[categories[i]] = true;
    else inputFields.category[categories[i]] = false;
    filterProducts();
  });
}

//rating
filters1[4].addEventListener("change", () => {
  if (filters1[4].value == 0) {
    inputFields.ratingRange.isChanged = false;
  } else {
    inputFields.ratingRange.isChanged = true;
  }
  inputFields.ratingRange.rate = filters1[4].value;
  filterProducts();
});

filters2[4].addEventListener("change", () => {
  if (filters2[4].value == 0) {
    inputFields.ratingRange.isChanged = false;
  } else {
    inputFields.ratingRange.isChanged = true;
  }
  inputFields.ratingRange.rate = filters2[4].value;
  filterProducts();
});

//priceRange
for (let i = 5; i <= 8; i++) {
  filters1[i].addEventListener("change", () => {
    if (filters1[i].checked) {
      inputFields.priceRange[priceRange[i - 5]] = true;
    } else {
      inputFields.priceRange[priceRange[i - 5]] = false;
    }
    filterProducts();
  });
}

for (let i = 5; i <= 8; i++) {
  filters2[i].addEventListener("change", () => {
    if (filters2[i].checked) {
      inputFields.priceRange[priceRange[i - 5]] = true;
    } else {
      inputFields.priceRange[priceRange[i - 5]] = false;
    }
    filterProducts();
  });
}

function isOfPriceRange(item, range) {
  let min = 0,
    max = 0;
  if (range == "range1") {
    min = 0;
    max = 25;
  } else if (range == "range2") {
    min = 25;
    max = 50;
  } else if (range == "range3") {
    min = 50;
    max = 100;
  } else {
    min = 100;
    max = Infinity;
  }
  if (item.price >= min && item.price <= max) return true;
  return false;
}

function closeModal() {
  var element = document.querySelectorAll(".btn-close");
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element[1].dispatchEvent(event);
}

let resetFilters = document.querySelectorAll(".resetFilters");

resetFilters[0].addEventListener("click", () => {
  for (let i = 0; i < filters1.length; i++) {
    if (i !== 4) {
      filters1[i].checked = false;
    } else {
      filters1[i].value = 0;
    }
  }
  inputFields = {
    category: {
      mens: false,
      womens: false,
      jewellery: false,
      electronics: false,
    },
    ratingRange: {
      isChanged: false,
      rate: 0,
    },
    priceRange: {
      range1: false,
      range2: false,
      range3: false,
      range4: false,
    },
    search: {
      value: "",
    },
  };
  document.querySelector("#searchBar").value = "";
  filterProducts();
});

resetFilters[1].addEventListener("click", () => {
  for (let i = 0; i < filters2.length; i++) {
    if (i !== 4) {
      filters2[i].checked = false;
    } else {
      filters2[i].value = 0;
    }
  }
  inputFields = {
    category: {
      mens: false,
      womens: false,
      jewellery: false,
      electronics: false,
    },
    ratingRange: {
      isChanged: false,
      rate: 0,
    },
    priceRange: {
      range1: false,
      range2: false,
      range3: false,
      range4: false,
    },
    search: {
      value: "",
    },
  };
  document.querySelector("#searchBar").value = "";
  filterProducts();
  closeModal();
});

//search functionality
let searchbar = document.querySelector("#searchBar");
searchbar.addEventListener("change", () => {
  inputFields.search.value = searchbar.value;
  filterProducts();
});

//home page to shop page by clicking categories

let category = document.querySelectorAll(".category");
for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", () => {
    goToShop();
    filters1[i].checked = true;
    filters2[i].checked = true;
    inputFields.category[categories[i]] = true;
    filterProducts();
  });
}

function goToShop() {
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  navLinks[1].dispatchEvent(event);
}

//clicking on brand logo - redirect to home
let navBarBrand = document.querySelector(".navbar-brand");

navBarBrand.addEventListener("click", () => {
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  navLinks[0].dispatchEvent(event);
});

//add to cart
function addToCart(item) {
  let cartItems = JSON.parse(localStorage.getItem("InStyle_CartItems")) || [];
  let itemAlreadyExists = cartItems.filter(
    (cartItem) => cartItem.id === item.id
  );
  if (itemAlreadyExists.length > 0) showToast("item already exists in cart!!!");
  else {
    item.quantity = 1;
    cartItems.push(item);
    showToast("item added to cart :)");
    localStorage.setItem("InStyle_CartItems", JSON.stringify(cartItems));
    displayCartProducts();
  }
}

function showToast(text) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = text;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
  }, 10);

  setTimeout(function () {
    toast.classList.remove("show");
    // Remove the toast from the document
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// ----------------cart------------------

let discountPercent=10;
let shippingCharges=80;

let cart_catalog = document.querySelector(".cart_catalog");
const displayCartProducts = () => {
  let totalAmount = 0;
  let toatalQty = 0;
  cart_catalog.innerHTML = "";
  let cartItems = JSON.parse(localStorage.getItem("InStyle_CartItems")) || [];
  if (cartItems.length === 0) {
    cart_catalog.innerHTML = `<div class="empty_cart"><span>Your Cart is Empty</span> <i class="fa-solid fa-cart-shopping"></i><p class="empty_cart_addItems">add items to it now</p><button class="btn btn-primary" onclick="goToShop()">Shop</button></div>`;
    document.querySelector(".price_list").classList.add("hide");
  } else {
    document.querySelector(".price_list").classList.remove("hide");
    cartItems.map((cartItem) => {
      let div = document.createElement("div");
      div.setAttribute("class", "cartItem");
      div.innerHTML = `<img src=${cartItem.image}>`;
      let cartItemInfo = document.createElement("div");
      cartItemInfo.setAttribute("class", "cartItem_info");
      cartItemInfo.innerHTML = `<div class="cartItem_titleRow"><strong>${cartItem.title}</strong></div>`;

      let cartItem_row = document.createElement("div");
      cartItem_row.setAttribute("class", "cartItem_row");
      cartItem_row.innerHTML = `<div class="cartItem_price">Price: <strong>$ ${
        cartItem.price * cartItem.quantity
      }</strong></div>`;

      let cartItem_qty = document.createElement("div");
      cartItem_qty.innerHTML = `Quantity: `;
      let decrementBtn = document.createElement("button");
      decrementBtn.innerText = "-";
      decrementBtn.setAttribute("class", "decrement btn btn-dark");
      let qtyBtn = document.createElement("button");
      qtyBtn.setAttribute("class", "qtyBtn btn btn-dark");
      qtyBtn.innerHTML = `<strong>${cartItem.quantity}</strong>`;
      let incrementBtn = document.createElement("button");
      incrementBtn.setAttribute("class", "increment btn btn-dark");
      incrementBtn.innerText = "+";

      cartItem_qty.append(decrementBtn, qtyBtn, incrementBtn);

      decrementBtn.addEventListener("click", () => decrement(cartItem));
      incrementBtn.addEventListener("click", () => increment(cartItem));

      cartItem_row.append(cartItem_qty);

      cartItemInfo.append(cartItem_row);

      let removeBtn = document.createElement("button");
      removeBtn.setAttribute("class", "removeBtn btn btn-dark");
      removeBtn.innerText = "Remove";
      div.append(cartItemInfo, removeBtn);
      cart_catalog.append(div);

      removeBtn.addEventListener("click", () => removeProduct(cartItem));

      toatalQty += cartItem.quantity;
      totalAmount += cartItem.quantity * cartItem.price;
    });
  }
  totalAmount = Math.round(totalAmount * 100) / 100;
  let discount =
    Math.round(((discountPercent * totalAmount) / 100) * 100) / 100;
  let grandTotal =
    Math.round((totalAmount - discount + shippingCharges) * 100) / 100;
  document.querySelector("#totalQty").textContent = `(${toatalQty} items)`;
  document.querySelector("#totalPrice").innerHTML = `$ ${totalAmount}`;
  document.querySelector("#discount").textContent = `$ ${discount}`;
  document.querySelector("#shipping").textContent = `$ ${shippingCharges}`;
  document.querySelector("#grandTotal").textContent = `$ ${grandTotal}`;
  localStorage.setItem(
    "InStyle_grandTotal",
    JSON.stringify({ totalAmount: grandTotal })
  );
};

function increment(item) {
  let cartItems = JSON.parse(localStorage.getItem("InStyle_CartItems"));
  cartItems = cartItems.map((cartItem) => {
    if (cartItem.id === item.id) cartItem.quantity++;
    return cartItem;
  });
  localStorage.setItem("InStyle_CartItems", JSON.stringify(cartItems));
  displayCartProducts();
}

function decrement(item) {
  let cartItems = JSON.parse(localStorage.getItem("InStyle_CartItems"));
  cartItems = cartItems.filter((cartItem) => {
    if (cartItem.id === item.id) {
      if (cartItem.quantity !== 1) {
        cartItem.quantity--;
        return cartItem;
      }
    } else return cartItem;
  });
  localStorage.setItem("InStyle_CartItems", JSON.stringify(cartItems));
  displayCartProducts();
}

function removeProduct(item) {
  let cartItems = JSON.parse(localStorage.getItem("InStyle_CartItems"));
  cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem("InStyle_CartItems", JSON.stringify(cartItems));
  displayCartProducts();
}

displayCartProducts();

