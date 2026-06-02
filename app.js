const countryCurrencyMap = {
  NG: { currency: "NGN", locale: "en-NG", label: "Nigeria" },
  GH: { currency: "GHS", locale: "en-GH", label: "Ghana" },
  US: { currency: "USD", locale: "en-US", label: "United States" },
  GB: { currency: "GBP", locale: "en-GB", label: "United Kingdom" },
  EU: { currency: "EUR", locale: "en-IE", label: "Euro Area" },
  KE: { currency: "KES", locale: "en-KE", label: "Kenya" },
  ZA: { currency: "ZAR", locale: "en-ZA", label: "South Africa" },
};

const currencyLocaleMap = Object.fromEntries(
  Object.values(countryCurrencyMap).map((item) => [item.currency, item.locale]),
);

const apiBaseUrl = localStorage.getItem("prosale-api-url") || "http://127.0.0.1:5000/api";

let selectedCountry = localStorage.getItem("prosale-country") || "NG";
if (!countryCurrencyMap[selectedCountry]) selectedCountry = "NG";

let selectedCurrency = localStorage.getItem("prosale-currency") || countryCurrencyMap[selectedCountry].currency;
if (!currencyLocaleMap[selectedCurrency]) selectedCurrency = countryCurrencyMap[selectedCountry].currency;

let products = [];
let customers = [];
let suppliers = [];
let expenses = [];
let sales = [];
let databaseConnected = false;

const cart = new Map();
const vatRate = 0.075;

function formatMoney(value) {
  return new Intl.NumberFormat(currencyLocaleMap[selectedCurrency] || "en-US", {
    style: "currency",
    currency: selectedCurrency,
    maximumFractionDigits: 0,
  }).format(value);
}

function renderMoneyFields() {
  document.querySelectorAll("[data-money]").forEach((element) => {
    element.textContent = formatMoney(Number(element.dataset.money || 0));
  });
}

function updateCurrencyStatus() {
  const status = document.querySelector("#currency-status");
  if (status) {
    status.textContent = `Currency: ${selectedCurrency}`;
  }

  const databaseStatus = document.querySelector("#database-status");
  if (databaseStatus) {
    databaseStatus.textContent = databaseConnected ? "Database: connected" : "Database: not connected";
    databaseStatus.classList.toggle("low", !databaseConnected);
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API request failed" }));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

async function loadDatabaseData() {
  try {
    const data = await apiRequest("/bootstrap");

    products = (data.products || []).map((product) => ({
      id: product._id,
      name: product.name,
      category: product.category || "Uncategorized",
      barcode: product.barcode || "",
      stock: Number(product.stock || 0),
      price: Number(product.price || 0),
      icon: product.icon || "PR",
    }));
    customers = data.customers || [];
    suppliers = data.suppliers || [];
    expenses = data.expenses || [];
    sales = data.sales || [];
    databaseConnected = data.databaseConnected !== false;

    if (data.settings?.country && countryCurrencyMap[data.settings.country]) {
      selectedCountry = data.settings.country;
    }
    if (data.settings?.currency && currencyLocaleMap[data.settings.currency]) {
      selectedCurrency = data.settings.currency;
    }

    applyCurrencySettings({ persist: false });
    renderAll();
  } catch (error) {
    console.warn("Could not load MongoDB data:", error.message);
    renderAll();
  }
}

function applyCurrencySettings(options = {}) {
  const countrySelect = document.querySelector("#country-select");
  const currencySelect = document.querySelector("#currency-select");

  if (countrySelect) countrySelect.value = selectedCountry;
  if (currencySelect) currencySelect.value = selectedCurrency;

  localStorage.setItem("prosale-country", selectedCountry);
  localStorage.setItem("prosale-currency", selectedCurrency);

  renderMoneyFields();
  calculateTotals();
  renderTopProducts();
  renderProductTable(document.querySelector("#product-search").value);
  renderCheckoutProducts(document.querySelector("#checkout-search").value);
  renderCustomers();
  renderSuppliers();
  renderExpenses();
  updateCurrencyStatus();

  if (options.persist !== false) {
    apiRequest("/settings", {
      method: "PUT",
      body: JSON.stringify({ country: selectedCountry, currency: selectedCurrency }),
    }).catch((error) => {
      console.warn("Could not save currency settings to MongoDB:", error.message);
    });
  }
}

function renderAll() {
  renderTopProducts();
  renderProductTable(document.querySelector("#product-search").value);
  renderCheckoutProducts(document.querySelector("#checkout-search").value);
  renderCart();
  renderCustomers();
  renderSuppliers();
  renderExpenses();
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
  if (!products.length) {
    document.querySelector("#top-products").innerHTML = `
      <div class="empty-state">
        <strong>No products entered yet</strong>
        <p>Top products will appear after products are added and sales are made.</p>
      </div>
    `;
    return;
  }

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

  if (!rows.length) {
    document.querySelector("#product-table").innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state table-empty">
            <strong>No products entered yet</strong>
            <p>Add products before you can track inventory or make sales.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

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

  if (!visible.length) {
    document.querySelector("#checkout-products").innerHTML = `
      <div class="empty-state">
        <strong>No products available for sale</strong>
        <p>Enter products first, then return here to process transactions.</p>
      </div>
    `;
    return;
  }

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
    : `<div class="cart-item"><div><strong>No items in cart</strong><small>No products have been entered yet.</small></div></div>`;

  calculateTotals();
}

async function completeSale() {
  const items = [...cart.values()];
  if (!items.length) return;

  const totals = calculateTotals();
  const payment = document.querySelector("#payment-method").value;

  items.forEach(({ product, qty }) => {
    product.stock -= qty;
  });

  apiRequest("/sales", {
    method: "POST",
    body: JSON.stringify({
      items: items.map(({ product, qty }) => ({
        product: product.id,
        name: product.name,
        quantity: qty,
        price: product.price,
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      vat: totals.vat,
      total: totals.total,
      paymentMethod: payment,
    }),
  })
    .then((sale) => {
      sales = [sale, ...sales];
    })
    .catch((error) => {
      console.warn("Could not save sale to MongoDB:", error.message);
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
  if (!customers.length) {
    document.querySelector("#customer-grid").innerHTML = `
      <article class="empty-state">
        <strong>No customers added yet</strong>
        <p>Customer records will appear after customers are created or assigned to sales.</p>
      </article>
    `;
    return;
  }

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
  if (!suppliers.length) {
    document.querySelector("#supplier-grid").innerHTML = `
      <article class="empty-state">
        <strong>No suppliers added yet</strong>
        <p>Supplier records will appear after stock sources are entered.</p>
      </article>
    `;
    return;
  }

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
  if (!expenses.length) {
    document.querySelector("#expenses-list").innerHTML = `
      <div class="empty-state">
        <strong>No expenses recorded yet</strong>
        <p>Operating costs will appear here after expenses are entered.</p>
      </div>
    `;
    return;
  }

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

document.querySelector("#country-select").addEventListener("change", (event) => {
  selectedCountry = event.target.value;
  selectedCurrency = countryCurrencyMap[selectedCountry].currency;
  applyCurrencySettings();
});

document.querySelector("#currency-select").addEventListener("change", (event) => {
  selectedCurrency = event.target.value;
  const matchingCountry = Object.entries(countryCurrencyMap).find(([, item]) => item.currency === selectedCurrency);
  if (matchingCountry) {
    selectedCountry = matchingCountry[0];
  }
  applyCurrencySettings();
});

document.querySelector("#checkout-products").addEventListener("click", (event) => {
  const productId = event.target.dataset.add;
  if (productId) addToCart(productId);
});

document.querySelector("#cart-list").addEventListener("click", (event) => {
  const inc = event.target.dataset.inc;
  const dec = event.target.dataset.dec;
  if (inc) changeQty(inc, 1);
  if (dec) changeQty(dec, -1);
});

document.querySelector("#restock-button").addEventListener("click", () => {
  if (!products.length) return;

  products.forEach((product) => {
    if (product.stock <= 9) product.stock += 20;
  });
  renderProductTable(document.querySelector("#product-search").value);
  renderCheckoutProducts(document.querySelector("#checkout-search").value);
});

renderAll();
applyCurrencySettings({ persist: false });
loadDatabaseData();
