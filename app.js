const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});

const products = [
  { id: 1, name: "Rice 5kg", category: "Grocery", barcode: "10001", stock: 42, cost: 42, price: 68 },
  { id: 2, name: "Cooking Oil 3L", category: "Grocery", barcode: "10002", stock: 18, cost: 55, price: 82 },
  { id: 3, name: "Paracetamol Pack", category: "Pharmacy", barcode: "22001", stock: 6, cost: 8, price: 15 },
  { id: 4, name: "Cotton Shirt", category: "Boutique", barcode: "33001", stock: 13, cost: 65, price: 120 },
  { id: 5, name: "LED Bulb", category: "Hardware", barcode: "44001", stock: 4, cost: 18, price: 35 },
  { id: 6, name: "Milk Powder", category: "Grocery", barcode: "10003", stock: 25, cost: 30, price: 48 },
];

const customers = [
  { name: "Kojo Antwi", phone: "+233 24 111 9012", email: "kojo@example.com", spend: 1420 },
  { name: "Mariam Sule", phone: "+233 55 200 3020", email: "mariam@example.com", spend: 860 },
  { name: "Akua Mensah", phone: "+233 27 900 1111", email: "akua@example.com", spend: 2310 },
  { name: "Yaw Boateng", phone: "+233 20 500 9080", email: "yaw@example.com", spend: 540 },
  { name: "Esi Dapaah", phone: "+233 54 700 2222", email: "esi@example.com", spend: 1195 },
  { name: "Nana Osei", phone: "+233 26 333 4545", email: "nana@example.com", spend: 720 },
];

const staff = [
  { name: "Ama Mensah", role: "Cashier", sales: 12420, status: "Active" },
  { name: "Daniel Agyeman", role: "Manager", sales: 8200, status: "Active" },
  { name: "Efua Sarpong", role: "Inventory Officer", sales: 0, status: "Active" },
  { name: "Kelvin Owusu", role: "Cashier", sales: 6410, status: "Disabled" },
];

const cart = new Map();
const taxRate = 0.125;

const sectionTitles = {
  dashboard: "Business Dashboard",
  checkout: "Sales Checkout",
  inventory: "Inventory Management",
  customers: "Customer Management",
  staff: "Staff and Role Management",
  subscriptions: "Subscription Management",
  reports: "Reports and Analytics",
  admin: "Admin Dashboard",
};

function money(amount) {
  return currency.format(amount).replace("GH₵", "GHS ");
}

function showSection(id) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === id);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.section === id);
  });

  document.querySelector("#page-title").textContent = sectionTitles[id] || "Business Dashboard";
}

function renderProducts(filter = "") {
  const list = document.querySelector("#product-list");
  const query = filter.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    return [product.name, product.category, product.barcode].some((value) => value.toLowerCase().includes(query));
  });

  list.innerHTML = visibleProducts
    .map(
      (product) => `
        <div class="product-row">
          <div>
            <strong>${product.name}</strong>
            <small>${product.category} · ${product.barcode} · ${product.stock} in stock</small>
          </div>
          <button class="primary-button" data-add-product="${product.id}">Add</button>
        </div>
      `,
    )
    .join("");
}

function renderCart() {
  const container = document.querySelector("#cart-items");
  const items = [...cart.values()];

  if (!items.length) {
    container.innerHTML = `<div class="cart-row"><div><strong>No items added</strong><small>Search products to start a sale.</small></div></div>`;
  } else {
    container.innerHTML = items
      .map(
        ({ product, quantity }) => `
          <div class="cart-row">
            <div>
              <strong>${product.name}</strong>
              <small>${money(product.price)} each</small>
            </div>
            <div class="quantity-controls">
              <button data-decrease="${product.id}" aria-label="Decrease ${product.name}">-</button>
              <strong>${quantity}</strong>
              <button data-increase="${product.id}" aria-label="Increase ${product.name}">+</button>
            </div>
          </div>
        `,
      )
      .join("");
  }

  updateTotals();
}

function updateTotals() {
  const discountPercent = Number(document.querySelector("#discount").value || 0) / 100;
  const subtotal = [...cart.values()].reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * discountPercent;
  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * taxRate;
  const total = taxable + tax;

  document.querySelector("#subtotal").textContent = money(subtotal);
  document.querySelector("#tax").textContent = money(tax);
  document.querySelector("#discount-total").textContent = money(discount);
  document.querySelector("#grand-total").textContent = money(total);

  return { subtotal, discount, tax, total };
}

function addProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || product.stock <= 0) return;

  const current = cart.get(productId) || { product, quantity: 0 };
  if (current.quantity < product.stock) {
    current.quantity += 1;
    cart.set(productId, current);
  }

  renderCart();
}

function changeQuantity(productId, change) {
  const item = cart.get(productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(productId);
  } else if (item.quantity <= item.product.stock) {
    cart.set(productId, item);
  }

  renderCart();
}

function completeSale() {
  const items = [...cart.values()];
  if (!items.length) return;

  const { subtotal, discount, tax, total } = updateTotals();
  const paymentMethod = document.querySelector("#payment-method").value;

  items.forEach(({ product, quantity }) => {
    product.stock -= quantity;
  });

  const receipt = [
    "ACCra RETAIL HUB",
    "Receipt #SP-" + Math.floor(Math.random() * 90000 + 10000),
    new Date().toLocaleString(),
    "",
    ...items.map(({ product, quantity }) => `${quantity} x ${product.name} - ${money(product.price * quantity)}`),
    "",
    `Subtotal: ${money(subtotal)}`,
    `Discount: ${money(discount)}`,
    `Tax: ${money(tax)}`,
    `Paid by: ${paymentMethod}`,
    `Total: ${money(total)}`,
    "",
    "Cashier: Ama Mensah",
    "Thank you for your purchase.",
  ].join("\n");

  cart.clear();
  document.querySelector("#receipt").textContent = receipt;
  document.querySelector("#receipt").classList.add("show");
  renderProducts(document.querySelector("#product-search").value);
  renderInventory();
  renderCart();
}

function renderInventory() {
  document.querySelector("#inventory-table").innerHTML = products
    .map((product) => {
      const status = product.stock <= 5 ? "Low stock" : "Available";
      const statusClass = product.stock <= 5 ? "warning" : "success";
      return `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.stock}</td>
          <td>${money(product.cost)}</td>
          <td>${money(product.price)}</td>
          <td><span class="status-pill ${statusClass}">${status}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderCustomers(filter = "") {
  const query = filter.trim().toLowerCase();
  document.querySelector("#customer-list").innerHTML = customers
    .filter((customer) => [customer.name, customer.phone, customer.email].some((value) => value.toLowerCase().includes(query)))
    .map(
      (customer) => `
        <article class="customer-card">
          <strong>${customer.name}</strong>
          <small>${customer.phone}</small>
          <small>${customer.email}</small>
          <span class="status-pill">Lifetime spend: ${money(customer.spend)}</span>
        </article>
      `,
    )
    .join("");
}

function renderStaff() {
  document.querySelector("#staff-list").innerHTML = staff
    .map(
      (person) => `
        <div class="staff-row">
          <div>
            <strong>${person.name}</strong>
            <small>${person.role} · Sales ${money(person.sales)}</small>
          </div>
          <span class="status-pill ${person.status === "Active" ? "success" : "warning"}">${person.status}</span>
        </div>
      `,
    )
    .join("");
}

document.querySelectorAll("[data-section]").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.section));
});

document.querySelectorAll("[data-section-jump]").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.sectionJump));
});

document.querySelector("#product-list").addEventListener("click", (event) => {
  const productId = Number(event.target.dataset.addProduct);
  if (productId) addProduct(productId);
});

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const increaseId = Number(event.target.dataset.increase);
  const decreaseId = Number(event.target.dataset.decrease);
  if (increaseId) changeQuantity(increaseId, 1);
  if (decreaseId) changeQuantity(decreaseId, -1);
});

document.querySelector("#product-search").addEventListener("input", (event) => renderProducts(event.target.value));
document.querySelector("#customer-search").addEventListener("input", (event) => renderCustomers(event.target.value));
document.querySelector("#discount").addEventListener("input", updateTotals);
document.querySelector("#complete-sale").addEventListener("click", completeSale);
document.querySelector("#hold-sale").addEventListener("click", () => {
  document.querySelector("#receipt").textContent = "Sale held. Cart can be resumed from held transactions in the production version.";
  document.querySelector("#receipt").classList.add("show");
});

document.querySelector("#restock-low").addEventListener("click", () => {
  products.forEach((product) => {
    if (product.stock <= 5) product.stock += 20;
  });
  renderProducts(document.querySelector("#product-search").value);
  renderInventory();
});

renderProducts();
renderCart();
renderInventory();
renderCustomers();
renderStaff();
