let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const cartList = document.getElementById("cart-list");
const favoritesList = document.getElementById("favorites-list");

// ✅ حفظ البيانات في localStorage
function saveData() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ❤️ عرض المفضلات
function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p class="text-muted text-center">No favorites yet ❤️</p>`;
    return;
  }

  favorites.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4 col-lg-3";
    div.innerHTML = `
      <div class="card h-100 shadow-sm text-center">
        <img src="${item.img}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="text-danger fw-bold">Price: $${item.price}</p>
          <button class="btn remove-fav">❤️</button>
        </div>
      </div>
    `;

    div.querySelector(".remove-fav").addEventListener("click", () => {
      favorites.splice(index, 1);
      saveData();
      renderFavorites();
    });

    favoritesList.appendChild(div);
  });
}

// ✅ حساب وإظهار إجمالي السعر
function updateCartTotal() {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// 🛒 عرض السلة
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="text-muted text-center">Your cart is empty 🛒</p>`;
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "col-md-4 col-lg-3";
    div.innerHTML = `
      <div class="card h-100 shadow-sm text-center">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title text-primary">${item.name}</h5>
          <p class="text-danger fw-bold">Total: $${(item.price * item.quantity).toFixed(2)}</p>
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button class="btn btn-sm btn-outline-secondary decrease">-</button>
            <span class="mx-3">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary increase">+</button>
          </div>
          <button class="btn btn-danger btn-sm remove">Remove from cart</button>
        </div>
      </div>
    `;

    // 🔼 زيادة الكمية
    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveData();
      renderCart();
    });

    // 🔽 تقليل الكمية
    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      else cart.splice(index, 1);
      saveData();
      renderCart();
    });

    // 🗑️ حذف المنتج
    div.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveData();
      renderCart();
    });

    cartList.appendChild(div);
  });

  updateCartTotal();
}

renderFavorites();
renderCart();