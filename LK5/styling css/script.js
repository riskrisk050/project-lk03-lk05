document.addEventListener("DOMContentLoaded", () => {
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
  // HELPER: Sanitasi teks agar aman dari XSS
  // =========================
  function sanitize(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // =========================
  // HELPER: Tampilkan notifikasi
  // =========================
  function showNotif(message, type) {
    notif.textContent = "";
    const p = document.createElement("p");
    p.style.color = type === "error" ? "#c0392b" : "#27ae60";
    p.textContent = (type === "error" ? "❌ " : "✅ ") + message;
    notif.appendChild(p);
    notif.title = "Klik untuk menutup";
  }

  // =========================
  // PREVIEW INPUT (input event)
  // =========================
  function updatePreview() {
    const namaVal = nama.value.trim();
    const emailVal = email.value.trim();
    const kategoriVal = kategori.value;

    if (!namaVal && !emailVal && !kategoriVal) {
      preview.textContent = "";
      return;
    }

    // Bersihkan preview lalu buat elemen baru
    preview.textContent = "";

    if (namaVal) {
      const pNama = document.createElement("p");
      pNama.innerHTML = "Halo, <b>" + sanitize(namaVal) + "</b>";
      preview.appendChild(pNama);
    }

    if (emailVal) {
      const pEmail = document.createElement("p");
      pEmail.textContent = "Email: " + emailVal;
      preview.appendChild(pEmail);
    }

    if (kategoriVal) {
      const pKat = document.createElement("p");
      pKat.textContent = "Kategori: " + kategoriVal;
      preview.appendChild(pKat);
    }
  }

  nama.addEventListener("input", updatePreview);
  email.addEventListener("input", updatePreview);
  kategori.addEventListener("change", updatePreview);

  // =========================
  // VALIDASI & SUBMIT FORM
  // =========================
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // biar ga refresh

    let error = "";

    // VALIDASI NAMA (minimal 3 karakter)
    if (nama.value.trim().length < 3) {
      error = "Nama minimal 3 karakter!";
    }

    // VALIDASI NO HP (hanya angka & min 10 digit)
    else if (!/^[0-9]{10,}$/.test(hp.value.trim())) {
      error = "No HP harus angka dan minimal 10 digit!";
    }

    // VALIDASI EMAIL (format email standar)
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error = "Format email tidak valid!";
    }

    // VALIDASI KATEGORI
    else if (kategori.value === "") {
      error = "Silakan pilih kategori!";
    }

    if (error !== "") {
      showNotif(error, "error");
      return;
    }

    showNotif("Data berhasil dikirim!", "success");

    // =========================
    // DOM MANIPULATION
    // tambah ke list
    // =========================
    const li = document.createElement("li");

    const bNama = document.createElement("b");
    bNama.textContent = nama.value.trim();

    const spanKat = document.createTextNode(" - " + sanitize(kategori.value));
    const br = document.createElement("br");
    const spanDetail = document.createTextNode(
      sanitize(email.value.trim()) + " | " + sanitize(hp.value.trim())
    );

    li.appendChild(bNama);
    li.appendChild(spanKat);
    li.appendChild(br);
    li.appendChild(spanDetail);

    // Tambahkan pesan jika ada
    if (pesan.value.trim()) {
      const brPesan = document.createElement("br");
      const spanPesan = document.createElement("em");
      spanPesan.textContent = "Pesan: " + pesan.value.trim();
      li.appendChild(brPesan);
      li.appendChild(spanPesan);
    }

    listData.appendChild(li);

    // =========================
    // TAMPILKAN MODAL POPUP
    // =========================
    showModal(
      nama.value.trim(),
      email.value.trim(),
      hp.value.trim(),
      kategori.value,
      pesan.value.trim()
    );

    // RESET FORM
    form.reset();
    preview.textContent = "";
  });

  // =========================
  // MODAL POPUP
  // =========================
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  function showModal(namaTxt, emailTxt, hpTxt, kategoriTxt, pesanTxt) {
    modalBody.textContent = "";

    const fields = [
      { label: "Nama", value: namaTxt },
      { label: "Email", value: emailTxt },
      { label: "No HP", value: hpTxt },
      { label: "Kategori", value: kategoriTxt },
    ];

    // Tambahkan pesan jika diisi
    if (pesanTxt) {
      fields.push({ label: "Pesan", value: pesanTxt });
    }

    fields.forEach((field) => {
      const p = document.createElement("p");
      const b = document.createElement("b");
      b.textContent = field.label + ": ";
      p.appendChild(b);
      p.appendChild(document.createTextNode(field.value));
      modalBody.appendChild(p);
    });

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // cegah scroll
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  // Tutup modal jika klik di luar box
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Tutup modal dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // =========================
  // KLIK NOTIF UNTUK DISMISS
  // =========================
  notif.addEventListener("click", () => {
    notif.textContent = "";
    notif.title = "";
  });
});