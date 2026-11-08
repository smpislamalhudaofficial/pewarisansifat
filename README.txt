GENETIC ADVENTURE - MPI PEWARISAN SIFAT KELAS IX
Paket aplikasi lengkap - HTML, CSS, dan JavaScript lokal.

CARA MENJALANKAN
1. Ekstrak ZIP ke sebuah folder.
2. Buka folder MPI_Pewarisan_Sifat_Full.
3. Klik dua kali index.html.
4. Jalankan di Chrome atau Edge versi terbaru.
5. Aplikasi dapat berjalan tanpa internet. Musik dan seluruh ilustrasi fallback disertakan lokal.

FITUR
- Landing page dan navigasi menu.
- Apersepsi interaktif.
- Enam tujuan pembelajaran.
- 14 halaman materi dengan aktivitas interaktif.
- Simulasi pasangan basa DNA dan transkripsi mRNA.
- Aktivitas kromosom, genotipe, fenotipe, dan ekspresi gen.
- Simulasi persilangan monohibrid.
- Simulasi tabel Punnett dihibrid 4 x 4.
- Simulasi kemungkinan golongan darah ABO.
- Tiga permainan berbasis Virtual Biology Lab: Genetic Puzzle, DNA Challenge, dan Mendel Master.
- Genetic Puzzle: merakit kemasan DNA, mengidentifikasi bagian kromosom, serta membedakan gen dan alel.
- DNA Challenge: menyusun pasangan basa DNA, melakukan simulasi transkripsi mRNA, dan memilah ciri DNA/RNA.
- Mendel Master: menyusun gamet dan tabel Punnett monohibrid serta mengisi 16 kombinasi genotipe-fenotipe dihibrid.
- Interaksi drag-and-drop dengan alternatif tap-to-place untuk HP/tablet; slot dapat dikosongkan dan diperbaiki.
- Setiap stasiun praktikum memiliki pemeriksaan otomatis, umpan balik, dan kesimpulan hasil eksperimen.
- Dua mode permainan: latihan tanpa batas waktu dan tantangan dengan timer.
- Penilaian praktikum berdasarkan ketepatan penempatan, ketuntasan stasiun, konsistensi hasil, dan efisiensi pengerjaan.
- Quiz 20 soal LOTS, MOTS, HOTS berbasis cerita, data, dan penalaran dengan timer 20 menit.
- Urutan 20 soal diacak setiap kali peserta memulai sesi baru dan tetap tersimpan selama sesi aktif.
- Setiap soal memiliki area ilustrasi; jika gambar belum tersedia, placeholder menampilkan petunjuk dan nama file gambar yang perlu ditambahkan.
- Navigasi nomor soal dan penyimpanan jawaban selama sesi aktif.
- Hasil quiz, kunci jawaban, pembahasan, dan ekspor Excel XLSX.
- Musik instrumental original dengan tombol play/pause.
- Tombol Ganti untuk memilih audio dari perangkat.
- Responsif untuk HP, laptop, komputer, dan layar sentuh; tabel Punnett 4 x 4 dapat digulir horizontal pada layar kecil.

PENYIMPANAN
Aplikasi memakai sessionStorage untuk menyimpan halaman aktif, jawaban quiz, dan progres sesi pada tab browser yang sama. Data tidak disinkronkan antarkomputer dan akan hilang ketika sesi/tab ditutup sesuai spesifikasi.

EKSPOR EXCEL
Ekspor XLSX dibuat secara lokal oleh aplikasi, tanpa CDN atau koneksi internet. File memiliki dua sheet: Rekap Nilai dan Detail Jawaban.

ILUSTRASI MANUAL
Lihat assets/images/README.txt untuk nama file, lokasi, dan rekomendasi resolusi ilustrasi. Khusus gambar quiz, ikuti assets/images/quiz/README.txt. Jika gambar belum dimasukkan, aplikasi menampilkan ilustrasi SVG fallback.

CATATAN PENGGUNAAN
- Musik tidak otomatis diputar ketika halaman dibuka karena browser umumnya memerlukan tindakan pengguna. Tekan tombol Musik untuk memulai.
- Gunakan tombol Ganti untuk memilih file musik sendiri dari perangkat.
- Timer quiz berjalan selama quiz aktif. Jika waktu habis, jawaban otomatis dikumpulkan.
- Pada mode tantangan, timer game berjalan mundur; mode latihan menggunakan pencatat waktu tanpa batas.
- Progres game dan quiz disimpan selama sesi aktif pada tab browser yang sama.
- Untuk penggunaan di banyak perangkat dengan sinkronisasi nilai terpusat, diperlukan pengembangan backend terpisah. Fitur tersebut tidak termasuk versi offline ini.


PEMBARUAN VIDEO DAN PROFIL PENGEMBANG
- Materi 14: Pewarisan Sifat Manusia dilengkapi pemutar video YouTube di dalam halaman materi.
- Video menggunakan YouTube Embedded Player dan membutuhkan koneksi internet.
- Menu baru: Profil Pengembang.
- Profil pengembang ditampilkan sebagai slideshow empat orang, otomatis berganti setiap 7 detik.
- Slideshow memiliki tombol sebelumnya, berikutnya, indikator slide, serta jeda/lanjutkan.
- Placeholder foto berbentuk rounded rectangle dengan aspect ratio 4:5.
- Petunjuk penggantian foto tersedia di assets/images/profiles/README.txt.


PERBAIKAN FOTO PROFIL
- Empat foto pengembang sudah disertakan langsung dalam assets/images/profiles/.
- File foto sudah dinormalisasi menjadi JPEG asli dengan ekstensi .jpg.
- Foto ditampilkan utuh di dalam bingkai rounded rectangle dengan rasio 4:5, tanpa memotong bagian atas/bawah.
- Untuk mengganti foto, pertahankan nama file profile-01.jpg sampai profile-04.jpg dan gunakan format JPEG asli.
