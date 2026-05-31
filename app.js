const moneyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const products = [
  { id: 1, name: "Laptop", category: "Electronics", barcode: "PS-1001", stock: 18, price: 560000, icon: "LT" },
  { id: 2, name: "Headphone", category: "Accessories", barcode: "PS-1002", stock: 42, price: 150000, icon: "HP" },
  { id: 3, name: "Smart Watch", category: "Accessories", barcode: "PS-1003", stock: 24, price: 120000, icon: "SW" },
  { id: 4, name: "Keyboard", category: "Accessories", barcode: "PS-1004", stock: 9, price: 80000, icon: "KB" },
  { id: 5, name: "Mouse", category: "Accessories", barcode: "PS-1005", stock: 4, price: 50000, icon: "MS" },
  { id: 6, name: "Receipt Printer", category: "Hardware", barcode: "PS-1006", stock: 3, price: 240000, icon: "RP" },
];

const customers = [
  { name: "Aisha Bello", phone: "+234 801 220 1020", email: "aisha@example.com", spend: 720000, tier: "Gold" },
  { name: "Tunde Okafor", phone: "+234 803 770 6000", email: "tunde@example.com", spend: 380000, tier: "Silver" },
  { name: "Maryam Yusuf", phone: "+234 905 441 7788", email: "maryam@example.com", spend: 1140000, tier: "Gold" },
  { name: "Chinedu Obi", phone: "+234 807 901 2222", email: "chinedu@example.com", spend: 210000, tier: "Starter" },
];

const suppliers = [
  { name: "TechBridge Wholesale", contact: "+234 809 111 2345", product: "Electronics", balance: 1840000 },
  { name: "Metro Accessories Ltd", contact: "+234 806 400 4000", product: "Accessories", balance: 920000 },
  { name: "PrintServe Depot", contact: "+234 802 900 1122", product: "POS Hardware", balance: 640000 },
];

const expenses = [
  { label: "Internet subscription", category: "Operations", amount: 45000 },
  { label: "Store rent", category: "Facilities", amount: 280000 },
  { label: "Delivery logistics", category: "Sales", amount: 62000 },
  { label: "Software renewal", category: "Subscriptions", amount: 18000 },
];

const cart = new Map();
const vatRate = 0.075;

function formatMoney(value) {
  return moneyFormatter.format(value).replace("NGN", "NGN");
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
}

function statusForStock(stock) {
  if (stock <= 3) return ["Critical", "danger"];
  if (stock <= 9) return ["Low stock", "low"];
  return ["In stock", ""];
}

function renderTopProducts() {
  document.querySelector("#top-products").innerHTML = products
    .slice(0, 5)
    .map(
      (product) => `
        <div class="top-product">
          <span class="product-thumb">${product.icon}</span>
          <strong>${product.name}</strong>
          <span>${formatMoney(product.price)}</span>
        </div>
      `,
    )
    .join("");
}

function productMatches(product, filter) {
  const query = filter.trim().toLowerCase();
  return [product.name, product.category, product.barcode].some((value) => value.toLowerCase().includes(query));
}

function renderProductTable(filter = "") {
  const rows = products.filter((product) => productMatches(product, filter));

  document.querySelector("#product-table").innerHTML = rows
    .map((product) => {
      const [label, tone] = statusForStock(product.stock);
      return `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.barcode}</td>
          <td>${product.stock}</td>
          <td>${formatMoney(product.price)}</td>
          <td><span class="badge ${tone}">${label}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderCheckoutProducts(filter = "") {
  const visible = products.filter((product) => productMatches(product, filter));

  document.querySelector("#checkout-products").innerHTML = visible
    .map(
      (product) => `
        <div class="product-card">
          <div>
            <strong>${product.name}</strong>
            <small>${product.category} | ${product.stock} available | ${formatMoney(product.price)}</small>
          </div>
          <button class="primary-button" data-add="${product.id}">Add</button>
        </div>
      `,
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || product.stock < 1) return;

  const item = cart.get(productId) || { product, qty: 0 };
  if (item.qty < product.stock) {
    item.qty += 1;
    cart.set(productId, item);
  }

  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.get(productId);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart.delete(productId);
  } else if (item.qty <= item.product.stock) {
    cart.set(productId, item);
  }

  renderCart();
}

function calculateTotals() {
  const subtotal = [...cart.values()].reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const discountRate = Number(document.querySelector("#discount").value || 0) / 100;
  const discount = subtotal * discountRate;
  const vat = (subtotal - discount) * vatRate;
  const total = subtotal - discount + vat;

  document.querySelector("#subtotal").textContent = formatMoney(subtotal);
  document.querySelector("#vat").textContent = formatMoney(vat);
  document.querySelector("#discount-value").textContent = formatMoney(discount);
  document.querySelector("#total").textContent = formatMoney(total);

  return { subtotal, discount, vat, total };
}

function renderCart() {
  const items = [...cart.values()];
  const target = document.querySelector("#cart-list");

  target.innerHTML = items.length
    ? items
        .map(
          ({ product, qty }) => `
          <div class="cart-item">
            <div>
              <strong>${product.name}</strong>
              <small>${formatMoney(product.price)} each</small>
            </div>
            <div class="qty">
              <button data-dec="${product.id}" aria-label="Decrease ${product.name}">-</button>
              <strong>${qty}</strong>
              <button data-inc="${product.id}" aria-label="Increase ${product.name}">+</button>
            </div>
          </div>
        `,
        )
        .join("")
    : `<div class="cart-item"><div><strong>No products added</strong><small>Select a product to start a sale.</small></div></div>`;

  calculateTotals();
}

function completeSale() {
  const items = [...cart.values()];
  if (!items.length) return;

  const totals = calculateTotals();
  const payment = document.querySelector("#payment-method").value;

  items.forEach(({ product, qty }) => {
    product.stock -= qty;
  });

  const receiptText = [
    "PROSALE POS",
    `Receipt #PS-${Math.floor(Math.random() * 90000 + 10000)}`,
    new Date().toLocaleString(),
    "",
    ...items.map(({ product, qty }) => `${qty} x ${product.name} ${formatMoney(product.price * qty)}`),
    "",
    `Subtotal: ${formatMoney(totals.subtotal)}`,
    `Discount: ${formatMoney(totals.discount)}`,
    `VAT: ${formatMoney(totals.vat)}`,
    `Payment: ${payment}`,
    `Total: ${formatMoney(totals.total)}`,
    "",
    "Thank you for shopping with us.",
  ].join("\n");

  cart.clear();
  document.querySelector("#receipt").textContent = receiptText;
  document.querySelector("#receipt").classList.add("show");
  renderCart();
  renderProductTable(document.querySelector("#product-search").value);
  renderCheckoutProducts(document.querySelector("#checkout-search").value);
}

function renderCustomers() {
  document.querySelector("#customer-grid").innerHTML = customers
    .map(
      (customer) => `
        <article class="info-card">
          <strong>${customer.name}</strong>
          <small>${customer.phone}</small>
          <small>${customer.email}</small>
          <span class="badge">${customer.tier} | ${formatMoney(customer.spend)}</span>
        </article>
      `,
    )
    .join("");
}

function renderSuppliers() {
  document.querySelector("#supplier-grid").innerHTML = suppliers
    .map(
      (supplier) => `
        <article class="info-card">
          <strong>${supplier.name}</strong>
          <small>${supplier.contact}</small>
          <small>Supplies: ${supplier.product}</small>
          <span class="badge">Purchases ${formatMoney(supplier.balance)}</span>
        </article>
      `,
    )
    .join("");
}

function renderExpenses() {
  document.querySelector("#expenses-list").innerHTML = expenses
    .map(
      (expense) => `
        <div class="expense-row">
          <strong>${expense.label}</strong>
          <span class="badge">${expense.category}</span>
          <strong>${formatMoney(expense.amount)}</strong>
        </div>
      `,
    )
    .join("");
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.viewJump));
});

document.querySelector("#product-search").addEventListener("input", (event) => renderProductTable(event.target.value));
document.querySelector("#checkout-search").addEventListener("input", (event) => renderCheckoutProducts(event.target.value));
document.querySelector("#discount").addEventListener("input", calculateTotals);
document.querySelector("#complete-sale").addEventListener("click", completeSale);

document.querySelector("#checkout-products").addEventListener("click", (event) => {
  const productId = Number(event.target.dataset.add);
  if (productId) addToCart(productId);
});

document.querySelector("#cart-list").addEventListener("click", (event) => {
  const inc = Number(event.target.dataset.inc);
  const dec = Number(event.target.dataset.dec);
  if (inc) changeQty(inc, 1);
  if (dec) changeQty(dec, -1);
});

document.querySelector("#restock-button").addEventListener("click", () => {
  products.forEach((product) => {
    if (product.stock <= 9) product.stock += 20;
  });
  renderProductTable(document.querySelector("#product-search").value);
  renderCheckoutProducts(document.querySelector("#checkout-search").value);
});

renderTopProducts();
renderProductTable();
renderCheckoutProducts();
renderCart();
renderCustomers();
renderSuppliers();
renderExpenses();
