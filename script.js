let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Coklat",
    desc: "Manis dan legit, cocok untuk camilan !",
    price: 15000,
    img: "assets/coklat.jpg"
  },
  {
    name: "Sistik Bawang",
    desc: "Renyah dan gurih dari bahan alami.",
    price: 15000,
    img: "assets/sistikbawang.jpg"
  },
  {
    name: "Keripik Bayam",
    desc: "Renyah dan sehat dari bayam segar.",
    price: 10000,
    img: "assets/keripikbayam.jpg"
  }
];

const lang = {
  id: {
    "title-beranda": "Selamat datang di Mang Budi Snack!",
    "title-produk": "Produk Kami",
    "title-pemesanan": "Pesanan Anda",
    "title-tentang": "Tentang Kami",
    "desc-tentang": "Mang Budi Snack adalah toko camilan rumahan yang menghadirkan cita rasa khas dan sehat sejak 2010. Kami menawarkan 3 produk favorit : Coklat manis, Sistik Bawang renyah, dan Keripik Bayam sehat. Nikmati camilan berkualitas, cocok untuk teman santai dan keluarga !",
    "title-kontak": "Hubungi Kami",
    "btn-cart": "Tambah ke Keranjang",
    "title-blog": "Blog",
    "blog-judul": "Perjalanan Mang Budi Snack : Dari Dapur Kecil ke Toko Online",
    "blog-isi1": "Halo, saya Budi, pendiri Mang Budi Snack. Usaha camilan ini berawal dari dapur kecil di rumah pada tahun 2010. Berbekal resep keluarga dan semangat untuk menghadirkan camilan sehat, saya mulai memproduksi Coklat, Sistik Bawang, dan Keripik Bayam.",
    "blog-isi2": "Awalnya, produk hanya dijual ke tetangga dan teman dekat. Namun, berkat dukungan pelanggan setia dan perkembangan teknologi, kini Mang Budi Snack hadir secara online agar lebih banyak orang bisa menikmati camilan khas kami.",
    "blog-isi3": "Saya percaya, camilan bukan hanya soal rasa, tapi juga kebersamaan dan cerita di baliknya. Terima kasih sudah menjadi bagian dari perjalanan Mang Budi Snack!",
    "blog-salam": "Salam hangat,\nBudi (Owner Mang Budi Snack)",
    "header-title": "Mang Budi Snack",
    "login-admin-btn": "Login",
    "title-pembayaran": "Dukungan Pembayaran",
    "pembayaran-note": "*Silakan hubungi admin untuk detail pembayaran.",
    "footer-visitor": "Jumlah Pengunjung :",
    "nav-beranda": "Beranda",
    "nav-produk": "Produk",
    "nav-order": "Order",
    "nav-blog": "Blog",
    "nav-tentang": "Tentang",
    "nav-kontak": "Kontak",
    "jumlah-pesanan": "Jumlah Pesanan :",
    "total-harga": "Total Harga :",
    "checkout-wa": "Checkout via WhatsApp",
    "harga": "Harga :"
  },
  en: {
    "title-beranda": "Welcome to Mang Budi Snack!",
    "title-produk": "Our Products",
    "title-pemesanan": "Your Order",
    "title-tentang": "About Us",
    "desc-tentang": "Mang Budi Snack is a homemade snack shop offering unique and healthy flavors since 2010. We offer 3 favorite products: Sweet Chocolate, Crispy Onion Sticks, and Healthy Spinach Chips. Enjoy quality snacks, perfect for relaxing with friends and family!",
    "title-kontak": "Contact Us",
    "btn-cart": "Add to Cart",
    "title-blog": "Blog",
    "blog-judul": "Mang Budi Snack Journey: From a Small Kitchen to Online Store",
    "blog-isi1": "Hello, I'm Budi, the founder of Mang Budi Snack. This snack business started from a small kitchen at home in 2010. With family recipes and a passion for healthy snacks, I began producing Chocolate, Onion Sticks, and Spinach Chips.",
    "blog-isi2": "At first, the products were only sold to neighbors and close friends. But thanks to loyal customers and technology, Mang Budi Snack is now online so more people can enjoy our special snacks.",
    "blog-isi3": "I believe snacks are not just about taste, but also togetherness and the story behind them. Thank you for being part of Mang Budi Snack's journey!",
    "blog-salam": "Warm regards,\nBudi (Owner of Mang Budi Snack)",
    "header-title": "Mang Budi Snack",
    "login-admin-btn": "Login",
    "title-pembayaran": "Payment Support",
    "pembayaran-note": "*Please contact admin for payment details.",
    "footer-visitor": "Visitor Count :",
    "nav-beranda": "Home",
    "nav-produk": "Products",
    "nav-order": "Order",
    "nav-blog": "Blog",
    "nav-tentang": "About",
    "nav-kontak": "Contact",
    "jumlah-pesanan": "Total Orders :",
    "total-harga": "Total Price :",
    "checkout-wa": "Checkout via WhatsApp",
    "harga": "Price :"
  }
};

let currentLang = "id";
let cart = [];

function renderProducts() {
  const produkList = document.getElementById("produk-list");
  produkList.innerHTML = "";
  products.forEach((item, i) => {
    produkList.innerHTML += `
      <div class="produk-card">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <p><strong>${lang[currentLang]["harga"] || "Harga :"} </strong> Rp${item.price.toLocaleString()}</p>
        <p><strong>${lang[currentLang]["stok-tersedia"] || "Stok tersedia"} :</strong> ${item.stok ?? 0}</p>
        <button class="btn-cart" onclick="addToCart(${i})">${lang[currentLang]["btn-cart"]}</button>
      </div>
    `;
  });
}

// Pastikan fungsi renderProducts() dipanggil saat halaman dimuat
renderProducts();

function addToCart(index) {
  const item = products[index];
  // Cari apakah produk sudah ada di cart
  const found = cart.find(c => c.name === item.name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

function removeFromCart(index) {
  // Kurangi qty, jika qty 1 maka hapus dari cart
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";
  cart.forEach((item, i) => {
    const totalItemPrice = item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - Rp${item.price.toLocaleString()} x ${item.qty} <button onclick="removeFromCart(${i})">❌</button>`;
    list.appendChild(li);
  });

  // Summary pesanan
  const summary = document.getElementById("cart-summary");
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  summary.innerHTML = `
    <strong>${lang[currentLang]["jumlah-pesanan"]}</strong> ${totalItems} <br>
    <strong>${lang[currentLang]["total-harga"]}</strong> Rp${totalPrice.toLocaleString()}
    <br>
    <button id="checkout-btn" style="margin-top:10px;padding:8px 16px;background:#25d366;color:white;border:none;border-radius:5px;cursor:pointer;">
      ${lang[currentLang]["checkout-wa"]}
    </button>
  `;

  // Event listener tombol checkout
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = function() {
      if (cart.length === 0) return;
      let pesan = "Halo, saya ingin memesan : \n";
      cart.forEach((item, i) => {
        pesan += `${i + 1}. ${item.name} - Rp${item.price.toLocaleString()} x ${item.qty}\n`;
      });
      pesan += `\nTotal Pesanan : ${totalItems}\nTotal Harga: Rp.${totalPrice.toLocaleString()}`;
      const waUrl = `https://wa.me/62881023481159?text=${encodeURIComponent(pesan)}`;
      window.open(waUrl, "_blank");
    };
  }
}

document.querySelectorAll(".lang-flag").forEach(flag => {
  flag.addEventListener("click", () => {
    currentLang = flag.dataset.lang;
    document.querySelectorAll(".lang-flag").forEach(f => f.classList.remove("active"));
    flag.classList.add("active");
    document.querySelectorAll(".translate").forEach(el => {
      const key = el.dataset.id;
      if (lang[currentLang][key]) {
        el.textContent = lang[currentLang][key];
      }
    });
    renderProducts();
    renderCart();
  });
});

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".navbar ul").classList.toggle("show");
});

// Visitor counter (localStorage)
function updateVisitorCount() {
  let count = localStorage.getItem("visitorCount");
  if (!count) count = 0;
  count = parseInt(count) + 1;
  localStorage.setItem("visitorCount", count);
  const el = document.getElementById("visitor-count");
  if (el) el.textContent = count; // Hanya angka saja
}
updateVisitorCount();
