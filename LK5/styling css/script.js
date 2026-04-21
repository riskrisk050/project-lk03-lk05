const form = document.getElementById("formPendaftaran");
const notif = document.getElementById("notif");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const hp = document.getElementById("hp");
const kategori = document.getElementById("kategori");
const pesan = document.getElementById("pesan");

const preview = document.getElementById("preview");
const listData = document.getElementById("listData");


// =========================
// 🔹 PREVIEW INPUT (input event)
// =========================
nama.addEventListener("input", () => {
  preview.innerHTML = `<p>Halo, <b>${nama.value}</b></p>`;
});


form.addEventListener("submit", (e) => {
  console.log("Form submitted"); // debug
  e.preventDefault(); // biar ga refresh

  let error = "";

  // VALIDASI NAMA
  if (nama.value.length < 3) {
    error = "Nama minimal 3 karakter!";
  }

  // VALIDASI NO HP (hanya angka & min 10 digit)
  else if (!/^[0-9]{10,}$/.test(hp.value)) {
    error = "No HP harus angka dan minimal 10 digit!";
  }

  // VALIDASI EMAIL sederhana
  else if (!email.value.includes("@")) {
    error = "Format email tidak valid!";
  }

  // VALIDASI KATEGORI
  else if (kategori.value === "") {
    error = "Silakan pilih kategori!";
  }

  if (error !== "") {
    console.log("Validation error:", error); // debug
    notif.innerHTML = `<p style="color:red;">❌ ${error}</p>`;
    return;
  }

  console.log("Form valid, adding to list"); // debug
  notif.innerHTML = `<p style="color:green;">✅ Data berhasil dikirim!</p>`;

  // =========================
  //  DOM MANIPULATION
  // tambah ke list
  // =========================
  const li = document.createElement("li");
  li.innerHTML = `
    <b>${nama.value}</b> - ${kategori.value} <br>
    ${email.value} | ${hp.value}
  `;

  listData.appendChild(li);

  // RESET FORM
  form.reset();
  preview.innerHTML = "";
});

notif.addEventListener("click", () => {
  notif.innerHTML = ""; 
});