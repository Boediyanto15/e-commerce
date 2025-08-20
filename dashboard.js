if (localStorage.getItem("adminLogin") !== "true") {
  window.location.href = "admin.html";
}

// Produk
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Coklat", desc: "Manis dan legit, cocok untuk camilan !", price: 15000, img: "assets/coklat.jpg", stok: 10 },
  { name: "Sistik Bawang", desc: "Renyah dan gurih dari bahan alami.", price: 15000, img: "assets/sistikbawang.jpg", stok: 10 },
  { name: "Keripik Bayam", desc: "Renyah dan sehat dari bayam segar.", price: 10000, img: "assets/keripikbayam.jpg", stok: 10 }
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.desc}</td>
        <td>${p.stok}</td>
        <td>Rp${p.price.toLocaleString()}</td>
        <td><img src="${p.img}" alt="${p.name}" style="height:32px;border-radius:6px;"> <br><small>${p.img}</small></td>
        <td>
          <button onclick="editProduct(${i})">Edit</button>
          <button onclick="deleteProduct(${i})" style="background:#ff5252;color:#fff;">Hapus</button>
        </td>
      </tr>
    `;
  });
}
renderProducts();

let editIndex = null;

document.getElementById("add-product-btn").onclick = function() {
  document.getElementById("add-product-form").style.display = "block";
  document.getElementById("new-name").value = "";
  document.getElementById("new-desc").value = "";
  document.getElementById("new-price").value = "";
  document.getElementById("new-img").value = "";
  editIndex = null;
};

document.getElementById("save-product-btn").onclick = function() {
  const name = document.getElementById("new-name").value;
  const desc = document.getElementById("new-desc").value;
  const price = parseInt(document.getElementById("new-price").value);
  const img = document.getElementById("new-img").value;
  if (!name || !desc || !price || !img) return;

  if (editIndex !== null) {
    products[editIndex] = { name, desc, price, img, stok: products[editIndex].stok || 10 };
  } else {
    products.push({ name, desc, price, img, stok: 10 });
  }
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  document.getElementById("add-product-form").style.display = "none";
  editIndex = null;
};

window.editProduct = function(i) {
  const p = products[i];
  const form = document.getElementById("add-product-form");
  form.style.display = "block";
  document.getElementById("new-name").value = p.name;
  document.getElementById("new-desc").value = p.desc;
  document.getElementById("new-price").value = p.price;
  document.getElementById("new-img").value = p.img;
  editIndex = i;
};

window.deleteProduct = function(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
};

document.getElementById("logout-btn").onclick = function() {
  localStorage.removeItem("adminLogin");
  window.location.href = "admin.html";
};

// Order (dummy, bisa dikembangkan dengan backend)
document.getElementById("order-list").innerHTML = "<i>Order tracking belum tersedia di versi demo ini.</i>";