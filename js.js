// API
const api = "https://jsonplaceholder.typicode.com/posts";

// Data
let artikel = [];

// Ambil artikel
async function ambilArtikel() {
  const loading = document.getElementById("loading");

  const error = document.getElementById("error");

  loading.style.display = "block";
  error.textContent = "";

  try {
    const respon = await fetch(api);

    if (!respon.ok) {
      throw new Error("Gagal mengambil data");
    }

    artikel = await respon.json();

    tampilArtikel();
  } catch (err) {
    console.error(err);

    error.textContent = "Gagal mengambil data artikel.";
  } finally {
    loading.style.display = "none";
  }
}

// Tampilkan artikel
function tampilArtikel() {
  const daftar = document.getElementById("daftar");

  const cari = document.getElementById("cari").value.trim().toLowerCase();

  daftar.innerHTML = "";

  const hasil = artikel.filter(function (data) {
    return data.title.toLowerCase().includes(cari);
  });

  if (hasil.length === 0) {
    daftar.innerHTML = "<p>Belum ada artikel.</p>";

    return;
  }

  hasil.forEach(function (data) {
    const kartu = document.createElement("div");

    kartu.className = "kartu";

    const nomor = document.createElement("span");

    nomor.textContent = `# ${data.id}`;

    const judul = document.createElement("h3");

    judul.textContent = data.title;

    const isi = document.createElement("p");

    isi.textContent = data.body;

    const tombol = document.createElement("div");

    tombol.className = "tombol-box";

    // Edit
    const edit = document.createElement("button");

    edit.className = "tombol edit";
    edit.textContent = "Edit";

    edit.addEventListener("click", function () {
      editArtikel(data.id);
    });

    // Hapus
    const hapus = document.createElement("button");

    hapus.className = "tombol hapus";
    hapus.textContent = "Delete";

    hapus.addEventListener("click", function () {
      hapusArtikel(data.id);
    });

    tombol.appendChild(edit);
    tombol.appendChild(hapus);

    kartu.appendChild(nomor);
    kartu.appendChild(judul);
    kartu.appendChild(isi);
    kartu.appendChild(tombol);

    daftar.appendChild(kartu);
  });
}

// Tambah artikel
async function tambahArtikel(judul, isi) {
  if (!judul.trim() || !isi.trim()) {
    alert("Judul dan isi wajib diisi.");

    return;
  }

  try {
    const respon = await fetch(api, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: judul.trim(),
        body: isi.trim(),
        userId: 1,
      }),
    });

    if (!respon.ok) {
      throw new Error("Gagal menambah artikel");
    }

    const dataBaru = await respon.json();

    artikel.unshift(dataBaru);

    tampilArtikel();
    resetForm();
  } catch (err) {
    console.error(err);

    alert("Gagal menambahkan artikel.");
  }
}

// Edit artikel
function editArtikel(id) {
  const data = artikel.find(function (item) {
    return item.id === id;
  });

  if (!data) {
    alert("Artikel tidak ditemukan.");

    return;
  }

  document.getElementById("id-artikel").value = data.id;

  document.getElementById("judul-artikel").value = data.title;

  document.getElementById("isi-artikel").value = data.body;

  document.getElementById("judul-form").textContent = "Edit Artikel";

  document.getElementById("tombol-submit").textContent = "Simpan Perubahan";

  document.getElementById("tombol-batal").style.display = "inline-block";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Update artikel
async function updateArtikel(id, judul, isi) {
  if (!judul.trim() || !isi.trim()) {
    alert("Judul dan isi wajib diisi.");

    return;
  }

  try {
    const respon = await fetch(`${api}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: id,
        title: judul.trim(),
        body: isi.trim(),
        userId: 1,
      }),
    });

    if (!respon.ok) {
      throw new Error("Gagal mengedit artikel");
    }

    const dataBaru = await respon.json();

    const posisi = artikel.findIndex(function (item) {
      return item.id === id;
    });

    if (posisi !== -1) {
      artikel[posisi] = dataBaru;
    }

    tampilArtikel();
    resetForm();
  } catch (err) {
    console.error(err);

    alert("Gagal mengedit artikel.");
  }
}

// Hapus artikel
async function hapusArtikel(id) {
  const yakin = confirm("Yakin ingin menghapus artikel ini?");

  if (!yakin) {
    return;
  }

  try {
    const respon = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    if (!respon.ok) {
      throw new Error("Gagal menghapus artikel");
    }

    artikel = artikel.filter(function (item) {
      return item.id !== id;
    });

    tampilArtikel();
  } catch (err) {
    console.error(err);

    alert("Gagal menghapus artikel.");
  }
}

// Reset
function resetForm() {
  document.getElementById("form-artikel").reset();

  document.getElementById("id-artikel").value = "";

  document.getElementById("judul-form").textContent = "Tambah Artikel";

  document.getElementById("tombol-submit").textContent = "Tambah Artikel";

  document.getElementById("tombol-batal").style.display = "none";
}

// Submit
document
  .getElementById("form-artikel")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id-artikel").value;

    const judul = document.getElementById("judul-artikel").value;

    const isi = document.getElementById("isi-artikel").value;

    if (id) {
      updateArtikel(Number(id), judul, isi);
    } else {
      tambahArtikel(judul, isi);
    }
  });

// Batal
document.getElementById("tombol-batal").addEventListener("click", function () {
  resetForm();
});

// Cari
document.getElementById("cari").addEventListener("input", function () {
  tampilArtikel();
});

// Jalankan
ambilArtikel();
