# evaluasi-js-reprogram-Ahmad-Hanif-Abqari

# Simple Blog

Simple Blog adalah website sederhana untuk membuat dan mengelola artikel menggunakan **HTML, CSS, dan JavaScript**.

Data artikel diambil dari **JSONPlaceholder API** dan ditampilkan pada halaman website.

## Fitur

* Menampilkan daftar artikel
* Mencari artikel
* Menambahkan artikel
* Mengedit artikel
* Menghapus artikel
* Tombol batal saat edit
* Loading saat mengambil data
* Pesan error jika terjadi masalah
* Tampilan responsive untuk perangkat mobile

## Teknologi

* HTML
* CSS
* JavaScript
* Fetch API
* JSONPlaceholder

## Struktur Folder

```text
Simple-Blog/
│
├── index.html
├── css.css
└── js.js
```

## Cara Menjalankan

1. Download atau clone repository ini.
2. Pastikan ketiga file berada dalam satu folder.
3. Buka file `index.html` menggunakan browser.
4. Website akan mengambil data artikel dari API secara otomatis.

## API

Project ini menggunakan JSONPlaceholder:

```text
https://jsonplaceholder.typicode.com/posts
```

API digunakan untuk mengambil data artikel dan melakukan simulasi operasi:

* GET untuk mengambil artikel
* POST untuk menambahkan artikel
* PUT untuk mengedit artikel
* DELETE untuk menghapus artikel

## Catatan

JSONPlaceholder merupakan API dummy. Data yang ditambahkan, diedit, atau dihapus **tidak tersimpan secara permanen di server**.

Perubahan hanya terlihat selama data tersebut disimpan di aplikasi. Jika halaman di-refresh, data akan kembali seperti data dari API.

## Tampilan

Website terdiri dari:

* Header Simple Blog
* Form tambah artikel
* Kolom pencarian
* Daftar artikel
* Tombol Edit dan Delete

## Tujuan

Project ini dibuat untuk mempelajari penggunaan **Fetch API, async/await, DOM manipulation, CRUD, dan event listener** menggunakan JavaScript.

```
```
