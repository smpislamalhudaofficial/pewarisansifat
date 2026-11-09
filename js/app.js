(() => {
"use strict";

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const appView = $("#appView");
const progressFill = $("#progressFill");
const menuPanel = $("#menuPanel");
const menuToggle = $("#menuToggle");
const menuClose = $("#menuClose");
const menuBackdrop = $("#menuBackdrop");
const musicToggle = $("#musicToggle");
const musicIcon = $("#musicIcon");
const musicLabel = $("#musicLabel");
const musicUpload = $("#musicUpload");
const musicFile = $("#musicFile");
const backgroundMusic = $("#backgroundMusic");
backgroundMusic.volume = 0.26;

const STORAGE_KEY = "geneticAdventure.fullApp.v1";
let customMusicUrl = null;
let quizTimerHandle = null;
let gameTimerHandle = null;
let profileTimerHandle = null;

const materials = [
  {
    title:"Mengenal Materi Genetik", section:"MATERI GENETIK", image:"01-materi-genetik.png",
    alt:"Hubungan kromosom, DNA, RNA, dan gen",
    intro:"Materi genetik membawa informasi biologis yang berperan dalam menentukan karakteristik makhluk hidup dan dapat diwariskan dari induk kepada keturunannya.",
    paragraphs:[
      "Pada manusia dan banyak organisme lain, DNA merupakan materi genetik utama. DNA dikemas bersama protein membentuk kromosom. Bagian tertentu dari DNA disebut gen.",
      "RNA berperan dalam penggunaan informasi genetik, misalnya dalam proses pembentukan protein. Jadi, kromosom, DNA, gen, dan RNA saling berkaitan, tetapi tidak berada pada tingkat susunan yang sama."
    ],
    points:["Kromosom adalah struktur DNA dan protein yang mengemas informasi genetik.","DNA menyimpan informasi genetik.","Gen merupakan bagian DNA yang membawa instruksi untuk menghasilkan produk fungsional.","RNA membantu penggunaan informasi genetik."],
    example:"Contoh: informasi genetik berperan dalam menentukan golongan darah dan berbagai karakteristik organisme.",
    activity:"match"
  },
  {
    title:"Mengenal Kromosom", section:"MATERI GENETIK", image:"02-kromosom.png",
    alt:"Struktur kromosom dengan kromatid, sentromer, dan telomer",
    intro:"Kromosom adalah struktur di dalam inti sel yang tersusun atas DNA dan protein. Kromosom membantu mengemas DNA agar tersimpan secara teratur.",
    paragraphs:[
      "Kromosom berperan dalam penyimpanan dan pembagian informasi genetik ketika sel membelah. Pada manusia, sebagian besar sel tubuh memiliki 46 kromosom atau 23 pasang.",
      "Sel kelamin, yaitu sperma dan ovum, masing-masing memiliki 23 kromosom. Jumlah ini memungkinkan jumlah kromosom kembali menjadi 46 setelah pembuahan."
    ],
    points:["Kromatid: salah satu bagian dari kromosom yang telah mengganda.","Sentromer: bagian yang menghubungkan kromatid saudara.","Telomer: bagian ujung kromosom yang membantu melindungi ujung DNA."],
    example:"Contoh: sel tubuh manusia memiliki 46 kromosom, sedangkan sel sperma dan ovum masing-masing memiliki 23 kromosom.",
    activity:"chromosome"
  },
  {
    title:"Mengenal DNA", section:"MATERI GENETIK", image:"03-dna.png",
    alt:"Struktur heliks ganda DNA dan pasangan basa nitrogen",
    intro:"DNA (Deoxyribonucleic Acid) adalah molekul yang menyimpan informasi genetik suatu organisme. DNA umumnya memiliki bentuk heliks ganda, seperti tangga yang berpilin.",
    paragraphs:[
      "DNA tersusun atas unit kecil bernama nukleotida. Setiap nukleotida terdiri atas gula deoksiribosa, gugus fosfat, dan basa nitrogen.",
      "Empat basa nitrogen DNA adalah adenin (A), timin (T), guanin (G), dan sitosin (C). Pasangan basanya bersifat spesifik: A berpasangan dengan T, sedangkan G berpasangan dengan C."
    ],
    points:["DNA menyimpan informasi genetik.","DNA dapat diwariskan dari induk kepada keturunannya.","Urutan basa nitrogen menyimpan instruksi biologis.","DNA menjadi sumber informasi dalam ekspresi gen."],
    example:"Jika salah satu untai DNA memiliki urutan A-T-G-C, untai pasangannya adalah T-A-C-G.",
    activity:"dna"
  },
  {
    title:"Mengenal RNA", section:"MATERI GENETIK", image:"04-rna.png",
    alt:"Struktur RNA beruntai tunggal",
    intro:"RNA (Ribonucleic Acid) adalah molekul yang berperan dalam penggunaan informasi genetik, terutama dalam sintesis protein.",
    paragraphs:[
      "RNA tersusun atas nukleotida yang mengandung gula ribosa, fosfat, dan basa nitrogen. RNA umumnya berupa satu untai, walaupun dapat membentuk lipatan pada bagian tertentu.",
      "RNA memiliki basa adenin (A), urasil (U), guanin (G), dan sitosin (C). Berbeda dengan DNA, RNA menggunakan urasil (U) sebagai pengganti timin (T)."
    ],
    points:["RNA mengandung gula ribosa.","RNA umumnya beruntai tunggal.","RNA menggunakan basa urasil (U).","Beberapa jenis RNA berperan dalam sintesis protein."],
    example:"Perbedaan penting: DNA memiliki basa Timin (T), sedangkan RNA memiliki Urasil (U).",
    activity:"rna"
  },
  {
    title:"Mengenal Gen", section:"MATERI GENETIK", image:"05-gen.png",
    alt:"Segmen gen pada molekul DNA",
    intro:"Gen adalah bagian dari DNA yang mengandung informasi untuk menghasilkan produk fungsional, seperti protein atau molekul RNA tertentu.",
    paragraphs:[
      "Gen berada pada lokasi tertentu di kromosom yang disebut lokus. Variasi dari suatu gen disebut alel. Kombinasi alel berkontribusi terhadap karakteristik suatu organisme.",
      "Tidak semua bagian DNA merupakan gen. Gen adalah segmen DNA yang memiliki informasi biologis tertentu."
    ],
    points:["Gen merupakan bagian dari DNA.","Alel adalah variasi dari suatu gen.","Lokus adalah posisi gen pada kromosom.","Produk gen dapat berupa protein atau RNA fungsional."],
    example:"Contoh pembelajaran Mendel: variasi gen pada tanaman ercis dapat berperan dalam perbedaan warna bunga.",
    activity:"gene"
  },
  {
    title:"Mengenal Genotipe", section:"PERAN MATERI GENETIK", image:"06-genotipe.png",
    alt:"Ilustrasi kombinasi alel AA, Aa, dan aa",
    intro:"Genotipe adalah susunan genetik atau kombinasi alel yang dimiliki oleh suatu individu. Genotipe tidak dapat diketahui hanya dengan melihat penampilan fisik.",
    paragraphs:[
      "Dalam model pewarisan sederhana, genotipe dapat ditulis menggunakan huruf. Huruf besar sering digunakan untuk alel dominan, sedangkan huruf kecil untuk alel resesif.",
      "Istilah homozigot berarti memiliki dua alel yang sama, sedangkan heterozigot berarti memiliki dua alel yang berbeda."
    ],
    points:["AA: homozigot dominan.","Aa: heterozigot.","aa: homozigot resesif.","Dominansi penuh merupakan model sederhana dan tidak berlaku untuk semua sifat."],
    example:"Dalam contoh tanaman ercis, Pp merupakan genotipe heterozigot.",
    activity:"genotype"
  },
  {
    title:"Mengenal Fenotipe", section:"PERAN MATERI GENETIK", image:"07-fenotipe.png",
    alt:"Contoh karakteristik fenotipe tanaman dan manusia",
    intro:"Fenotipe adalah karakteristik organisme yang dapat diamati atau diukur. Fenotipe terbentuk melalui interaksi faktor genetik dan lingkungan.",
    paragraphs:[
      "Pada contoh pewarisan sederhana dengan dominansi penuh, alel dominan dapat menutupi ekspresi alel resesif pada individu heterozigot.",
      "Tidak semua fenotipe ditentukan oleh satu gen. Banyak karakteristik manusia, seperti tinggi badan dan warna kulit, dipengaruhi banyak gen serta lingkungan."
    ],
    points:["Genotipe adalah susunan alel.","Fenotipe adalah karakteristik yang tampak atau dapat diukur.","Lingkungan dapat memengaruhi fenotipe.","Contoh sederhana: Pp menghasilkan bunga ungu jika P dominan penuh terhadap p."],
    example:"Tinggi badan dipengaruhi faktor genetik sekaligus nutrisi, kesehatan, dan lingkungan selama pertumbuhan.",
    activity:"phenotype"
  },
  {
    title:"Mengenal Ekspresi Gen", section:"EKSPRESI GEN", image:"08-ekspresi-gen.png",
    alt:"Alur DNA, transkripsi, mRNA, translasi, dan protein",
    intro:"Ekspresi gen adalah proses penggunaan informasi pada gen untuk menghasilkan produk fungsional, seperti protein atau RNA.",
    paragraphs:[
      "Salah satu bentuk ekspresi gen yang dipelajari adalah sintesis protein. Pada sel eukariotik, transkripsi berlangsung di inti sel, kemudian mRNA diproses dan digunakan di ribosom untuk translasi.",
      "Transkripsi adalah pembentukan RNA berdasarkan cetakan DNA. Translasi adalah penerjemahan informasi pada mRNA menjadi urutan asam amino."
    ],
    points:["DNA menyimpan informasi genetik.","Transkripsi menghasilkan RNA dari cetakan DNA.","mRNA membawa informasi ke ribosom.","Translasi menyusun asam amino menjadi polipeptida."],
    example:"Alur sederhana: DNA → transkripsi → mRNA → translasi → rantai polipeptida/protein.",
    activity:"expression"
  },
  {
    title:"Messenger RNA (mRNA)", section:"EKSPRESI GEN", image:"09-mrna.png",
    alt:"mRNA dibentuk melalui proses transkripsi dari DNA",
    intro:"Messenger RNA (mRNA) adalah jenis RNA yang membawa informasi genetik dari DNA menuju ribosom untuk digunakan dalam sintesis protein.",
    paragraphs:[
      "mRNA dibentuk melalui proses transkripsi dengan menggunakan salah satu untai DNA sebagai cetakan. Pada mRNA, informasi dibaca dalam kelompok tiga basa yang disebut kodon.",
      "Setiap kodon dapat menentukan asam amino tertentu atau menjadi sinyal mulai maupun berhentinya translasi."
    ],
    points:["mRNA membawa informasi genetik.","mRNA menjadi cetakan dalam translasi.","Kodon terdiri atas tiga basa nitrogen.","mRNA menggunakan urasil (U), bukan timin (T)."],
    example:"DNA cetakan TAC-GGA-CTT dapat menghasilkan mRNA AUG-CCU-GAA.",
    activity:"mrna"
  },
  {
    title:"Ribosomal RNA (rRNA)", section:"EKSPRESI GEN", image:"10-rrna.png",
    alt:"Ribosom tersusun atas subunit besar dan kecil yang mengandung rRNA",
    intro:"Ribosomal RNA (rRNA) adalah jenis RNA yang menjadi komponen utama penyusun ribosom.",
    paragraphs:[
      "Ribosom merupakan tempat berlangsungnya translasi. Ribosom tersusun atas rRNA dan protein, serta memiliki subunit besar dan subunit kecil.",
      "rRNA membantu menjaga struktur ribosom dan berperan dalam proses pembentukan ikatan peptida antar-asam amino."
    ],
    points:["rRNA merupakan komponen utama ribosom.","Ribosom menjadi tempat translasi.","rRNA membantu proses pembentukan ikatan peptida.","Ribosom membaca kodon pada mRNA."],
    example:"Ketika mRNA berikatan dengan ribosom, ribosom membantu menerjemahkan urutan kodon menjadi rantai asam amino.",
    activity:"rrna"
  },
  {
    title:"Transfer RNA (tRNA)", section:"EKSPRESI GEN", image:"11-trna.png",
    alt:"Struktur tRNA dengan antikodon dan tempat melekatnya asam amino",
    intro:"Transfer RNA (tRNA) membawa asam amino menuju ribosom selama proses translasi.",
    paragraphs:[
      "tRNA memiliki bagian yang disebut antikodon. Antikodon terdiri atas tiga basa yang dapat berpasangan dengan kodon pada mRNA.",
      "Setiap tRNA yang telah terikat dengan asam amino membawa asam amino yang sesuai menuju ribosom untuk dirangkai."
    ],
    points:["tRNA membawa asam amino.","Antikodon berpasangan dengan kodon mRNA.","Kodon dan antikodon berpasangan secara komplementer.","Asam amino dirangkai menjadi polipeptida."],
    example:"Kodon mRNA AUG berpasangan dengan antikodon tRNA UAC. AUG juga merupakan kodon awal yang mengode metionin.",
    activity:"trna"
  },
  {
    title:"Persilangan Monohibrid", section:"POLA PEWARISAN SIFAT", image:"12-monohibrid.png",
    alt:"Persilangan monohibrid tanaman ercis dengan tabel Punnett",
    intro:"Persilangan monohibrid adalah persilangan yang memperhatikan satu karakteristik berbeda. Persilangan ini digunakan untuk mempelajari Hukum I Mendel atau hukum segregasi.",
    paragraphs:[
      "Hukum segregasi menyatakan bahwa pasangan alel berpisah ketika pembentukan gamet sehingga setiap gamet membawa satu alel dari pasangan tersebut.",
      "Contoh: Pp × Pp, dengan P sebagai alel bunga ungu dominan penuh dan p sebagai alel bunga putih resesif."
    ],
    points:["Gamet dari Pp adalah P dan p.","Keturunan: PP, Pp, Pp, dan pp.","Rasio genotipe: 1 PP : 2 Pp : 1 pp.","Rasio fenotipe: 3 ungu : 1 putih."],
    example:"Jika dua tanaman Pp disilangkan, peluang keturunan berbunga putih (pp) adalah 25%.",
    activity:"monohybrid"
  },
  {
    title:"Persilangan Dihibrid", section:"POLA PEWARISAN SIFAT", image:"13-dihibrid.png",
    alt:"Persilangan dihibrid dengan tabel Punnett empat kali empat",
    intro:"Persilangan dihibrid adalah persilangan yang memperhatikan dua karakteristik berbeda sekaligus.",
    paragraphs:[
      "Hukum II Mendel atau hukum asortasi bebas menjelaskan bahwa alel dari pasangan gen yang berbeda dapat memisah secara bebas saat pembentukan gamet, dengan asumsi gen tidak terpaut.",
      "Pada persilangan RrYy × RrYy, masing-masing induk dapat membentuk gamet RY, Ry, rY, dan ry."
    ],
    points:["Persilangan memperhatikan dua sifat.","Setiap induk RrYy membentuk empat jenis gamet.","Tabel Punnett memiliki 16 kemungkinan kombinasi.","Dengan dominansi penuh dan asortasi bebas, rasio fenotipe F2 adalah 9:3:3:1."],
    example:"R = bulat, r = keriput, Y = kuning, y = hijau. Rasio F2: 9 bulat kuning : 3 bulat hijau : 3 keriput kuning : 1 keriput hijau.",
    activity:"dihybrid"
  },
  {
    title:"Pewarisan Sifat Manusia", section:"POLA PEWARISAN SIFAT", image:"14-pewarisan-manusia.png",
    alt:"Ilustrasi keluarga dan pewarisan sifat manusia",
    intro:"Pewarisan sifat manusia adalah proses diteruskannya informasi genetik dari kedua orang tua kepada keturunannya melalui sel kelamin.",
    paragraphs:[
      "Setiap anak menerima satu set kromosom dari ayah dan satu set dari ibu. Kombinasi informasi genetik berkontribusi terhadap karakteristik individu.",
      "Sebagian sifat manusia dipengaruhi banyak gen dan lingkungan. Karena itu, tidak semua karakteristik manusia dapat dijelaskan dengan persilangan Mendel sederhana."
    ],
    points:["Golongan darah ABO merupakan contoh pewarisan alel ganda dan kodominansi.","Tinggi badan dipengaruhi banyak gen dan lingkungan.","Warna kulit juga merupakan sifat poligenik.","Beberapa kondisi genetik dapat diwariskan melalui pola tertentu."],
    example:"Pada sistem ABO, alel IA dan IB bersifat kodominan, sedangkan alel i bersifat resesif terhadap keduanya.",
    activity:"abo"
  }
];

const developerProfiles = [
  {
    role:"PENANGGUNG JAWAB",
    name:"Rizqi Anugerah Perdana, S.Kom., M.Pd.",
    institution:"SMP Islam AL Huda Brondong",
    email:"rizqianugerah.perdana@gmail.com",
    instagram:"rizqi_ap26",
    facebook:"Rizqi Anugerah Perdana",
    image:"profile-01.jpg",
    alt:"Foto profil Rizqi Anugerah Perdana"
  },
  {
    role:"PENGEMBANG MATERI",
    name:"Maf'idatul Inayah, S.Pd.",
    institution:"SMP Islam AL Huda Brondong",
    email:"arinaia89@gmail.com",
    instagram:"-",
    facebook:"-",
    image:"profile-02.jpg",
    alt:"Foto profil Maf'idatul Inayah"
  },
  {
    role:"PENGEMBANG MATERI",
    name:"Anita Rahayu, S.Pd.",
    institution:"SMP Islam AL Huda Brondong",
    email:"anita.sempia@gmail.com",
    instagram:"anietasabrinazahwa",
    facebook:"Anieta Sabrina Zahwa",
    image:"profile-03.jpg",
    alt:"Foto profil Anita Rahayu"
  },
  {
    role:"PENGEMBANG MEDIA",
    name:"Faishal Al Idrus",
    institution:"SMP Islam AL Huda Brondong",
    email:"alidrus.faishal@gmail.com",
    instagram:"ide.faishal",
    facebook:"-",
    image:"profile-04.jpg",
    alt:"Foto profil Faishal Al Idrus"
  }
];

const quizBank = [
 {level:"LOTS",image:"quiz-01.png",imageAlt:"Ilustrasi ekstraksi DNA dari bahan biologis",imageHint:"Ilustrasi praktikum ekstraksi DNA dan struktur kromosom.",scenario:"Dalam praktikum, kelompok Nisa menghancurkan beberapa potong stroberi, mencampurnya dengan larutan sederhana, lalu menambahkan alkohol dingin. Setelah beberapa saat, tampak serabut putih yang dapat ditarik perlahan dari campuran tersebut. Guru menjelaskan bahwa bahan yang diamati berkaitan dengan materi genetik di dalam sel. Kelompok itu kemudian membandingkan DNA dengan protein, lemak, dan karbohidrat sebagai komponen sel.",stem:"Berdasarkan informasi praktikum tersebut, molekul yang menjadi penyimpan utama informasi genetik adalah ...",options:["Protein","DNA","Lemak","Glukosa"],answer:1,explanation:"DNA merupakan molekul utama penyimpan informasi genetik pada manusia dan banyak organisme lain. DNA tersusun dalam kromosom bersama protein."},
 {level:"LOTS",image:"quiz-02.png",imageAlt:"Ilustrasi pembuahan oleh sperma dan ovum serta jumlah kromosom",imageHint:"Ilustrasi sperma, ovum, dan pembentukan zigot dengan 46 kromosom.",scenario:"Saat membahas reproduksi manusia, guru menampilkan diagram pembuahan. Sel sperma membawa separuh jumlah kromosom sel tubuh, begitu pula sel ovum. Ketika keduanya melebur, terbentuk zigot dengan jumlah kromosom normal manusia, yaitu 46. Guru meminta siswa menggunakan informasi tersebut untuk menelusuri kontribusi masing-masing sel kelamin, bukan sekadar menghafalkan jumlah kromosom.",stem:"Jika zigot normal memiliki 46 kromosom dan menerima jumlah yang sama dari kedua orang tua, berapa kromosom yang dibawa oleh satu sel sperma?",options:["12","23","46","92"],answer:1,explanation:"Sperma dan ovum masing-masing membawa 23 kromosom. Saat pembuahan, keduanya bergabung membentuk zigot dengan 46 kromosom."},
 {level:"LOTS",image:"quiz-03.png",imageAlt:"Ilustrasi pasangan basa nitrogen pada DNA",imageHint:"Ilustrasi heliks ganda DNA dan pasangan basa A-T serta G-C.",scenario:"Raka membuat model DNA menggunakan keping berwarna. Ia menyusun satu untai dengan urutan basa 5′-A-G-T-C-3′. Temannya mengingatkan bahwa kedua untai DNA tidak dipasangkan secara sembarang karena setiap basa memiliki pasangan komplementer tertentu. Raka kemudian memeriksa satu per satu pasangan pada model agar bentuk tangga DNA tetap sesuai aturan biologis.",stem:"Jika Raka menempatkan basa Adenin (A) pada satu untai DNA, basa apa yang harus dipasang tepat di seberangnya?",options:["Guanin (G)","Sitosin (C)","Timin (T)","Urasil (U)"],answer:2,explanation:"Dalam DNA, Adenin (A) berpasangan dengan Timin (T), sedangkan Guanin (G) berpasangan dengan Sitosin (C)."},
 {level:"LOTS",image:"quiz-04.png",imageAlt:"Ilustrasi perbandingan struktur DNA dan RNA",imageHint:"Ilustrasi perbandingan DNA beruntai ganda dan RNA beruntai tunggal.",scenario:"Dua kelompok siswa mengamati model molekul X dan Y. Molekul X memiliki dua untai, gula deoksiribosa, dan basa timin. Molekul Y umumnya berupa satu untai, mengandung gula ribosa, serta memiliki satu jenis basa yang tidak ditemukan pada DNA. Guru meminta siswa mengidentifikasi basa khas tersebut berdasarkan perbedaan komposisi kedua molekul.",stem:"Basa nitrogen yang digunakan RNA sebagai pengganti timin pada DNA adalah ...",options:["Urasil (U)","Sitosin (C)","Adenin (A)","Guanin (G)"],answer:0,explanation:"RNA menggunakan Urasil (U), sedangkan DNA menggunakan Timin (T). Keduanya tetap memiliki Adenin, Guanin, dan Sitosin."},
 {level:"LOTS",image:"quiz-05.png",imageAlt:"Ilustrasi pasangan alel pada kromosom homolog",imageHint:"Ilustrasi dua kromosom homolog dengan alel A dan a pada lokus yang sama.",scenario:"Pada diagram kromosom homolog, guru menandai satu lokus yang sama pada kedua kromosom. Di lokus tersebut terdapat alel A pada kromosom pertama dan alel a pada kromosom kedua. Seorang siswa menuliskan susunan tersebut sebagai Aa. Guru meminta siswa menjelaskan istilah yang tepat untuk individu yang memiliki dua alel berbeda pada satu lokus.",stem:"Berdasarkan susunan alel Aa, individu tersebut termasuk ...",options:["Homozigot dominan","Homozigot resesif","Heterozigot","Fenotipe"],answer:2,explanation:"Heterozigot berarti individu memiliki dua alel yang berbeda pada satu lokus, misalnya Aa."},
 {level:"MOTS",image:"quiz-06.png",imageAlt:"Ilustrasi persilangan monohibrid bunga ungu dan putih",imageHint:"Ilustrasi dua bunga ercis ungu heterozigot dan tabel Punnett Pp × Pp.",scenario:"Dalam percobaan tanaman ercis, warna bunga ungu dikendalikan alel P yang dominan penuh terhadap alel p untuk bunga putih. Dua tanaman berbunga ungu yang masing-masing bergenotipe Pp disilangkan. Siswa menggambar tabel Punnett dan memperoleh empat kemungkinan kombinasi keturunan: PP, Pp, Pp, dan pp. Mereka kemudian diminta mengelompokkan hasil berdasarkan warna bunga yang tampak.",stem:"Dengan asumsi semua keturunan memiliki peluang yang sama, rasio fenotipe bunga ungu terhadap bunga putih yang diharapkan adalah ...",options:["1 ungu : 1 putih","3 ungu : 1 putih","1 ungu : 2 putih","Semua putih"],answer:1,explanation:"Persilangan Pp × Pp menghasilkan tiga genotipe yang menampakkan bunga ungu (PP, Pp, Pp) dan satu genotipe bunga putih (pp), sehingga rasio fenotipenya 3:1."},
 {level:"MOTS",image:"quiz-07.png",imageAlt:"Ilustrasi proses transkripsi dari DNA menjadi mRNA",imageHint:"Ilustrasi untai DNA cetakan 3′-TAC-GGA-CTT-5′ yang ditranskripsi menjadi mRNA.",scenario:"Dalam simulasi ekspresi gen, siswa memperoleh untai DNA cetakan dengan urutan 3′-TAC-GGA-CTT-5′. Guru menjelaskan bahwa RNA polimerase menyusun mRNA dengan pasangan basa komplementer. Karena molekul yang dibentuk adalah RNA, basa Timin tidak digunakan dan digantikan oleh Urasil. Siswa harus menuliskan hasil transkripsi dengan arah untai mRNA yang benar.",stem:"Urutan mRNA yang tepat berdasarkan DNA cetakan tersebut adalah ...",options:["5′-TAC-GGA-CTT-3′","5′-AUG-CCU-GAA-3′","5′-ATG-CCT-GAA-3′","5′-UAC-GGA-CUU-3′"],answer:1,explanation:"DNA cetakan 3′-TAC-GGA-CTT-5′ menghasilkan mRNA 5′-AUG-CCU-GAA-3′. RNA menggunakan U sebagai pengganti T."},
 {level:"MOTS",image:"quiz-08.png",imageAlt:"Ilustrasi tRNA membawa asam amino ke ribosom",imageHint:"Ilustrasi ribosom, mRNA, tRNA, antikodon, dan asam amino.",scenario:"Pada animasi sintesis protein, tiga jenis RNA terlihat menjalankan tugas berbeda. Satu molekul membawa salinan informasi genetik dari inti sel, molekul kedua menjadi komponen utama ribosom, sedangkan molekul ketiga bergerak membawa asam amino menuju ribosom. Molekul ketiga juga memiliki antikodon yang dapat berpasangan dengan kodon pada mRNA.",stem:"Molekul RNA yang membawa asam amino menuju ribosom adalah ...",options:["mRNA","rRNA","tRNA","DNA"],answer:2,explanation:"tRNA membawa asam amino menuju ribosom. Antikodonnya berpasangan dengan kodon pada mRNA agar asam amino tersusun sesuai informasi genetik."},
 {level:"MOTS",image:"quiz-09.png",imageAlt:"Ilustrasi pembentukan empat jenis gamet dari genotipe RrYy",imageHint:"Ilustrasi individu RrYy membentuk gamet RY, Ry, rY, dan ry.",scenario:"Tanaman ercis memiliki genotipe RrYy. Gen R/r mengatur bentuk biji, sedangkan Y/y mengatur warna biji. Saat pembentukan gamet, setiap gamet hanya menerima satu alel dari masing-masing pasangan gen. Jika kedua gen berasortasi bebas, siswa perlu mengombinasikan alel R atau r dengan alel Y atau y untuk menemukan seluruh kemungkinan gamet.",stem:"Kombinasi gamet yang dapat dibentuk oleh tanaman RrYy adalah ...",options:["RY dan ry saja","RR, Rr, rY, dan yy","RY, Ry, rY, dan ry","Rr dan Yy"],answer:2,explanation:"Dengan asortasi bebas, empat kombinasi gamet yang mungkin adalah RY, Ry, rY, dan ry."},
 {level:"MOTS",image:"quiz-10.png",imageAlt:"Ilustrasi pewarisan golongan darah ABO",imageHint:"Ilustrasi persilangan golongan darah ayah IAi dan ibu IBi.",scenario:"Ayah memiliki golongan darah A dengan genotipe IAi, sedangkan ibu memiliki golongan darah B dengan genotipe IBi. Dalam diskusi kelas, siswa mengingat bahwa setiap orang tua hanya menyumbangkan satu alel melalui gamet. Mereka membuat tabel kombinasi: alel IA atau i dari ayah bertemu dengan alel IB atau i dari ibu. Dari kombinasi tersebut, siswa memperkirakan variasi golongan darah anak.",stem:"Seluruh kemungkinan golongan darah anak dari pasangan tersebut adalah ...",options:["A dan B saja","AB dan O saja","A, B, AB, dan O","AB saja"],answer:2,explanation:"Persilangan IAi × IBi dapat menghasilkan IAIB (AB), IAi (A), IBi (B), dan ii (O). Keempat golongan darah mungkin muncul."},
 {level:"HOTS",image:"quiz-11.png",imageAlt:"Ilustrasi dua saudara kandung dengan kombinasi genetik berbeda",imageHint:"Ilustrasi dua anak dalam satu keluarga dan proses pembentukan gamet.",scenario:"Dua saudara kandung memiliki beberapa ciri fisik yang berbeda meskipun berasal dari ayah dan ibu yang sama. Dalam diskusi, seorang siswa berpendapat bahwa semua anak dari pasangan orang tua yang sama seharusnya menerima susunan gen yang persis sama. Guru lalu menjelaskan bahwa saat meiosis, alel dipisahkan dan dikombinasikan ke dalam gamet. Pembuahan juga mempertemukan satu gamet ayah dan satu gamet ibu secara acak.",stem:"Penjelasan yang paling masuk akal untuk perbedaan kombinasi genetik kedua saudara tersebut adalah ...",options:["Setiap anak menerima seluruh DNA hanya dari ibu","Kombinasi alel yang diwariskan dapat berbeda pada setiap anak","Semua gen saudara kandung selalu identik","Lingkungan tidak pernah memengaruhi fenotipe"],answer:1,explanation:"Meiosis dan pembuahan menghasilkan kombinasi alel yang dapat berbeda pada setiap anak. Fenotipe juga dapat dipengaruhi lingkungan."},
 {level:"HOTS",image:"quiz-12.png",imageAlt:"Ilustrasi alur ekspresi gen dan sintesis protein",imageHint:"Diagram alur DNA, transkripsi, mRNA, ribosom, translasi, dan polipeptida.",scenario:"Sebuah kelompok membuat model perjalanan informasi genetik pada sel eukariotik. Mereka menempatkan DNA di inti sel, kemudian menunjukkan pembentukan mRNA melalui proses penyalinan informasi. Setelah diproses, mRNA keluar menuju sitoplasma dan berikatan dengan ribosom. Di sana, kodon dibaca dan tRNA membawa asam amino untuk dirangkai menjadi rantai polipeptida.",stem:"Urutan proses yang paling tepat untuk menjelaskan sintesis protein adalah ...",options:["Translasi → transkripsi → DNA","DNA → transkripsi → mRNA → translasi → polipeptida","mRNA → DNA → ribosom → transkripsi","Protein → DNA → tRNA → mRNA"],answer:1,explanation:"Informasi pada DNA ditranskripsikan menjadi RNA. mRNA kemudian digunakan dalam proses translasi di ribosom untuk menyusun rantai polipeptida."},
 {level:"HOTS",image:"quiz-13.png",imageAlt:"Ilustrasi perubahan satu basa DNA akibat mutasi",imageHint:"Ilustrasi perbandingan urutan DNA normal dan urutan DNA dengan substitusi satu basa.",scenario:"Peneliti membandingkan dua urutan DNA pada bagian gen yang sama. Pada sampel kedua, satu basa berubah akibat substitusi. Perubahan itu dapat mengubah kodon pada mRNA. Namun, guru mengingatkan bahwa kode genetik memiliki sifat degeneratif sehingga beberapa kodon berbeda dapat menentukan asam amino yang sama. Karena itu, dampak mutasi tidak selalu identik.",stem:"Kesimpulan paling tepat mengenai perubahan satu basa tersebut adalah ...",options:["Setiap perubahan basa pasti menghentikan seluruh fungsi sel","Perubahan basa dapat mengubah kodon dan berpotensi memengaruhi protein, tetapi dampaknya bergantung pada perubahan tersebut","Perubahan basa DNA selalu tidak berpengaruh","Protein berubah menjadi DNA ketika terjadi mutasi"],answer:1,explanation:"Mutasi substitusi dapat bersifat silent, missense, atau nonsense. Dampaknya bergantung pada perubahan kodon dan pengaruhnya terhadap produk gen."},
 {level:"HOTS",image:"quiz-14.png",imageAlt:"Ilustrasi tabel Punnett persilangan Aa × Aa",imageHint:"Ilustrasi tabel Punnett Aa × Aa dengan hasil AA, Aa, Aa, dan aa.",scenario:"Pada tanaman ercis, alel A menentukan sifat dominan penuh terhadap alel a. Dua tanaman heterozigot disilangkan, sehingga masing-masing dapat membentuk gamet A dan a. Siswa menyusun tabel Punnett 2 × 2 dan memperoleh empat kombinasi keturunan. Guru meminta mereka menghitung peluang munculnya keturunan yang memiliki dua alel resesif, bukan hanya menghitung jumlah fenotipe dominan.",stem:"Berdasarkan persilangan Aa × Aa, peluang keturunan bergenotipe aa adalah ...",options:["0%","25%","50%","75%"],answer:1,explanation:"Empat kemungkinan hasil persilangan adalah AA, Aa, Aa, dan aa. Satu dari empat kombinasi adalah aa, sehingga peluangnya 25%."},
 {level:"HOTS",image:"quiz-15.png",imageAlt:"Ilustrasi persilangan dihibrid RrYy × RrYy",imageHint:"Ilustrasi tabel Punnett 4 × 4 untuk persilangan dihibrid bentuk dan warna biji.",scenario:"Pada tanaman ercis, bentuk biji bulat (R) dominan terhadap keriput (r), sedangkan warna kuning (Y) dominan terhadap hijau (y). Dua tanaman RrYy disilangkan. Guru menyampaikan bahwa kedua gen diasumsikan tidak terpaut dan mengalami asortasi bebas. Setiap induk dapat membentuk empat jenis gamet. Siswa kemudian menganalisis 16 kombinasi keturunan berdasarkan dua karakter sekaligus.",stem:"Kondisi yang menjelaskan munculnya rasio fenotipe F2 9:3:3:1 pada persilangan tersebut adalah ...",options:["Karena hanya satu gen yang diwariskan","Karena alel dari dua pasangan gen berasortasi bebas dan terjadi dominansi penuh","Karena semua gamet selalu membawa alel yang sama","Karena lingkungan mengubah semua genotipe"],answer:1,explanation:"Rasio 9:3:3:1 merupakan rasio klasik persilangan dihibrid dengan dominansi penuh dan asortasi bebas pada dua gen yang tidak terpaut."},
 {level:"HOTS",image:"quiz-16.png",imageAlt:"Ilustrasi pewarisan golongan darah AB dan O",imageHint:"Ilustrasi ayah bergolongan darah AB dan ibu O dengan kemungkinan anak A atau B.",scenario:"Dalam latihan genetika, ayah memiliki golongan darah AB dengan genotipe IAIB, sedangkan ibu bergolongan darah O dengan genotipe ii. Seorang siswa mengusulkan bahwa anak mereka dapat bergolongan darah AB karena ayah memiliki alel IA dan IB. Siswa lain mengingatkan bahwa ibu hanya dapat menyumbangkan alel i. Kelas diminta menguji kedua pendapat melalui kombinasi gamet.",stem:"Berdasarkan informasi tersebut, golongan darah yang mungkin dimiliki anak adalah ...",options:["AB dan O","A dan B","A, B, AB, dan O","O saja"],answer:1,explanation:"Ayah dapat menghasilkan gamet IA atau IB, sedangkan ibu hanya menghasilkan gamet i. Anak dapat bergenotipe IAi (golongan A) atau IBi (golongan B)."},
 {level:"HOTS",image:"quiz-17.png",imageAlt:"Ilustrasi faktor genetik dan lingkungan yang memengaruhi tinggi badan",imageHint:"Ilustrasi pertumbuhan manusia dengan faktor genetik, nutrisi, dan kesehatan.",scenario:"Dua siswa memiliki tinggi badan berbeda meskipun usia mereka hampir sama. Seorang teman menyimpulkan bahwa tinggi badan hanya ditentukan oleh satu gen dominan. Guru meminta kelas mengevaluasi kesimpulan tersebut dengan mempertimbangkan bahwa tinggi badan merupakan karakteristik kompleks. Selain variasi genetik dari banyak gen, asupan nutrisi, kondisi kesehatan, hormon, dan lingkungan selama pertumbuhan juga dapat berperan.",stem:"Pernyataan yang paling sesuai dengan informasi tersebut adalah ...",options:["Tinggi badan hanya ditentukan satu alel dominan","Tinggi badan merupakan sifat yang dipengaruhi banyak gen dan faktor lingkungan","Nutrisi tidak memiliki hubungan dengan pertumbuhan","Semua orang tua tinggi pasti memiliki anak dengan tinggi yang sama"],answer:1,explanation:"Tinggi badan merupakan sifat poligenik yang dipengaruhi banyak gen serta faktor lingkungan, seperti nutrisi dan kesehatan."},
 {level:"HOTS",image:"quiz-18.png",imageAlt:"Ilustrasi pasangan kodon mRNA AUG dan antikodon tRNA UAC",imageHint:"Ilustrasi kodon AUG pada mRNA berpasangan dengan antikodon UAC pada tRNA.",scenario:"Pada simulasi translasi, ribosom sedang membaca urutan mRNA dan berhenti pada kodon AUG. Sebuah molekul tRNA akan berikatan dengan kodon tersebut melalui pasangan basa komplementer. Siswa diminta menentukan antikodon yang sesuai. Guru mengingatkan bahwa mRNA dan tRNA sama-sama tersusun dari RNA, sehingga pasangan basanya mengikuti aturan A-U dan G-C, bukan aturan DNA yang menggunakan T.",stem:"Antikodon tRNA yang berpasangan dengan kodon mRNA AUG adalah ...",options:["AUG","UAC","TAC","GUA"],answer:1,explanation:"Antikodon tRNA yang berpasangan dengan kodon mRNA AUG adalah UAC. AUG merupakan kodon awal dan mengode metionin."},
 {level:"HOTS",image:"quiz-19.png",imageAlt:"Ilustrasi pewarisan sifat autosomal resesif dari orang tua carrier",imageHint:"Ilustrasi kedua orang tua carrier Aa dan kemungkinan anak aa pada tabel Punnett.",scenario:"Dalam sebuah studi kasus, kedua orang tua tampak sehat dan tidak menunjukkan suatu kelainan genetik. Namun, anak mereka mengalami kelainan yang menurut informasi guru diwariskan secara autosomal resesif sederhana. Pada pola ini, individu harus memiliki dua alel resesif agar sifat tersebut tampak. Siswa diminta menalar genotipe orang tua yang memungkinkan anak aa lahir dari dua orang tua yang tidak menunjukkan kelainan.",stem:"Kombinasi genotipe orang tua yang paling mungkin adalah ...",options:["AA dan AA","AA dan aa","Aa dan Aa","aa dan aa"],answer:2,explanation:"Dua orang tua heterozigot (Aa × Aa) dapat tampak tidak mengalami kelainan, tetapi masing-masing dapat mewariskan alel a sehingga anak aa dapat terbentuk."},
 {level:"HOTS",image:"quiz-20.png",imageAlt:"Ilustrasi perbedaan genotipe Pp dan pp serta fenotipe bunga",imageHint:"Ilustrasi tanaman Pp berbunga ungu dan pp berbunga putih.",scenario:"Pada lembar pengamatan, tanaman X memiliki genotipe Pp dan tanaman Y memiliki genotipe pp. Dalam model pewarisan ini, alel P menghasilkan bunga ungu dan dominan penuh terhadap alel p yang menghasilkan bunga putih. Seorang siswa menulis bahwa Pp adalah fenotipe dan ungu adalah genotipe. Guru meminta siswa memeriksa kembali apakah simbol alel menunjukkan susunan genetik atau karakteristik yang dapat diamati.",stem:"Pasangan penjelasan genotipe dan fenotipe yang benar adalah ...",options:["X: genotipe ungu; Y: fenotipe pp","X: genotipe Pp dan fenotipe ungu; Y: genotipe pp dan fenotipe putih","X: fenotipe Pp; Y: genotipe putih","X dan Y memiliki genotipe sama karena fenotipenya berbeda"],answer:1,explanation:"Pp dan pp adalah genotipe, yaitu susunan alel. Ungu dan putih adalah fenotipe. Dengan dominansi penuh, Pp berbunga ungu dan pp berbunga putih."}
];

const gameSets = {
  puzzle:{title:"Genetic Puzzle",level:"Mudah",duration:300,icon:"🧩",description:"Cocokkan ilustrasi komponen materi genetik dengan definisinya, identifikasi bagian kromosom, dan bedakan gen dengan alel.",stations:3},
  dna:{title:"DNA Challenge",level:"Menengah",duration:420,icon:"🧬",description:"Susun urutan basa DNA dan mRNA menggunakan kartu visual, lalu kelompokkan ciri DNA dan RNA.",stations:3},
  mendel:{title:"Mendel Master",level:"Sulit",duration:600,icon:"🌱",description:"Pilih gamet induk, amati kombinasi genotipe dan fenotipe, lalu tentukan rasio keturunan pada tabel Punnett.",stations:2}
};

const labSpecs = {
  puzzle:[
    {
      id:"packaging",title:"Stasiun 1 · Merakit kemasan DNA",kind:"sequence",
      description:"Susun komponen dari bahan penyusun hingga menjadi kromosom. DNA membungkus protein histon membentuk nukleosom; nukleosom tersusun menjadi kromatin yang dapat memadat menjadi kromosom.",
      instruction:"Pilih kartu gambar, kemudian pilih definisi yang sesuai. Pasangan yang benar akan terkunci.",
      tokens:[
        {id:"dna",label:"DNA"},{id:"histone",label:"Protein histon"},{id:"nucleosome",label:"Nukleosom"},{id:"chromatin",label:"Kromatin"},{id:"chromosome",label:"Kromosom"}
      ],
      slots:[
        {id:"p1",prompt:"Bahan genetik yang dikemas",answer:"dna"},
        {id:"p2",prompt:"Protein tempat DNA melilit",answer:"histone"},
        {id:"p3",prompt:"Unit hasil lilitan DNA pada histon",answer:"nucleosome"},
        {id:"p4",prompt:"Susunan nukleosom membentuk",answer:"chromatin"},
        {id:"p5",prompt:"Struktur padat pembawa informasi genetik",answer:"chromosome"}
      ],
      source:"DNA + protein histon → nukleosom → kromatin → kromosom"
    },
    {
      id:"chromosome",title:"Stasiun 2 · Identifikasi bagian kromosom",kind:"grid",
      description:"Identifikasi telomer, sentromer, dan kromatid dengan mengetuk hotspot pada ilustrasi kromosom.",
      instruction:"Baca petunjuk, lalu ketuk marker yang menunjukkan bagian kromosom yang diminta.",
      tokens:[{id:"telomere",label:"Telomer"},{id:"centromere",label:"Sentromer"},{id:"chromatid",label:"Kromatid"}],
      slots:[
        {id:"c1",prompt:"Bagian ujung kromosom yang membantu melindungi ujung DNA",answer:"telomere"},
        {id:"c2",prompt:"Daerah yang menghubungkan kromatid saudara",answer:"centromere"},
        {id:"c3",prompt:"Salah satu dari dua salinan identik setelah kromosom mengganda",answer:"chromatid"}
      ]
    },
    {
      id:"geneallele",title:"Stasiun 3 · Gen atau alel?",kind:"grid",
      description:"Bedakan segmen DNA yang membawa informasi dengan variasi dari segmen gen tersebut.",
      instruction:"Cocokkan ilustrasi gen dan alel dengan definisi yang tepat.",
      tokens:[{id:"gene",label:"Gen"},{id:"allele",label:"Alel"}],
      slots:[
        {id:"g1",prompt:"Segmen DNA yang mengandung informasi untuk menghasilkan produk fungsional",answer:"gene"},
        {id:"g2",prompt:"Bentuk alternatif dari suatu gen pada lokus yang sama",answer:"allele"}
      ]
    }
  ],
  dna:[
    {
      id:"complement",title:"Stasiun 1 · Merakit pasangan basa DNA",kind:"sequence",
      description:"Susun basa nitrogen pada untai komplementer dengan mengetuk kartu A, T, G, dan C.",
      instruction:"Ketuk kartu basa untuk mengisi urutan DNA komplementer dari arah 5′ ke 3′.",
      source:"Untai cetakan DNA: 3′-T A C G G T-5′",
      tokens:[
        {id:"a1",label:"A"},{id:"t1",label:"T"},{id:"g1",label:"G"},{id:"c1",label:"C"},{id:"c2",label:"C"},{id:"a2",label:"A"}
      ],
      slots:[
        {id:"b1",prompt:"1",answer:"a1"},{id:"b2",prompt:"2",answer:"t1"},{id:"b3",prompt:"3",answer:"g1"},
        {id:"b4",prompt:"4",answer:"c1"},{id:"b5",prompt:"5",answer:"c2"},{id:"b6",prompt:"6",answer:"a2"}
      ],
      output:"Untai komplementer: 5′-A T G C C A-3′"
    },
    {
      id:"transcription",title:"Stasiun 2 · Praktik transkripsi",kind:"sequence",
      description:"Gunakan untai DNA cetakan untuk menyusun mRNA. RNA menggunakan urasil (U), bukan timin (T). Ketuk kartu basa untuk mengisi urutan.",
      instruction:"Susun sembilan nukleotida mRNA sesuai pasangan transkripsi. Perhatikan arah pembacaan dan kelompok kodon.",
      source:"DNA cetakan: 3′-T A C   G G A   C T T-5′",
      tokens:[
        {id:"ta1",label:"A"},{id:"tu1",label:"U"},{id:"tg1",label:"G"},{id:"tc1",label:"C"},{id:"tc2",label:"C"},
        {id:"tu2",label:"U"},{id:"tg2",label:"G"},{id:"ta2",label:"A"},{id:"ta3",label:"A"}
      ],
      slots:[
        {id:"m1",prompt:"1",answer:"ta1"},{id:"m2",prompt:"2",answer:"tu1"},{id:"m3",prompt:"3",answer:"tg1"},
        {id:"m4",prompt:"4",answer:"tc1"},{id:"m5",prompt:"5",answer:"tc2"},{id:"m6",prompt:"6",answer:"tu2"},
        {id:"m7",prompt:"7",answer:"tg2"},{id:"m8",prompt:"8",answer:"ta2"},{id:"m9",prompt:"9",answer:"ta3"}
      ],
      output:"mRNA: 5′-AUG CCU GAA-3′"
    },
    {
      id:"classify",title:"Stasiun 3 · Memilah DNA dan RNA",kind:"grid",
      description:"DNA dan RNA memiliki perbedaan pada basa nitrogen, gula, dan struktur untainya.",
      instruction:"Pilih kartu ciri molekul, lalu ketuk kelompok DNA atau RNA yang sesuai.",
      tokens:[
        {id:"thymine",label:"Timin (T)"},{id:"uracil",label:"Urasil (U)"},{id:"deoxyribose",label:"Deoksiribosa"},
        {id:"ribose",label:"Ribosa"},{id:"double",label:"Umumnya dua untai"},{id:"single",label:"Umumnya satu untai"}
      ],
      slots:[
        {id:"d1",prompt:"Basa khas pada DNA",answer:"thymine"},{id:"d2",prompt:"Basa khas pada RNA",answer:"uracil"},
        {id:"d3",prompt:"Gula penyusun DNA",answer:"deoxyribose"},{id:"d4",prompt:"Gula penyusun RNA",answer:"ribose"},
        {id:"d5",prompt:"Struktur DNA pada model dasar",answer:"double"},{id:"d6",prompt:"Struktur RNA pada model dasar",answer:"single"}
      ]
    }
  ],
  mendel:[
    {
      id:"monohybrid",title:"Stasiun 1 · Persilangan monohibrid",kind:"punnett-mono",
      description:"Lakukan persilangan Pp × Pp. Alel P menghasilkan bunga ungu dan dominan penuh terhadap alel p yang menghasilkan bunga putih.",
      instruction:"Pilih alel untuk setiap gamet induk. Sistem akan membentuk empat kombinasi keturunan secara otomatis.",
      tokens:[
        {id:"P",label:"P",reusable:true},{id:"p",label:"p",reusable:true},
        {id:"PP",label:"PP",reusable:true},{id:"Pp",label:"Pp",reusable:true},{id:"pp",label:"pp",reusable:true}
      ],
      slots:[
        {id:"mc1",prompt:"Gamet induk 2",answer:"P"},{id:"mc2",prompt:"Gamet induk 2",answer:"p"},
        {id:"mr1",prompt:"Gamet induk 1",answer:"P"},{id:"mr2",prompt:"Gamet induk 1",answer:"p"},
        {id:"m11",prompt:"Keturunan 1",answer:"PP"},{id:"m12",prompt:"Keturunan 2",answer:"Pp"},
        {id:"m21",prompt:"Keturunan 3",answer:"Pp"},{id:"m22",prompt:"Keturunan 4",answer:"pp"}
      ],
      output:"Hasil yang diharapkan: genotipe 1 PP : 2 Pp : 1 pp; fenotipe 3 ungu : 1 putih."
    },
    {
      id:"dihybrid",title:"Stasiun 2 · Persilangan dihibrid",kind:"punnett-dihybrid",
      description:"Simulasikan persilangan RrYy × RrYy. R = bulat, r = keriput, Y = kuning, dan y = hijau. Kedua gen diasumsikan tidak terpaut dengan dominansi penuh.",
      instruction:"Pilih empat jenis gamet dari masing-masing induk. Sistem akan menghitung 16 kombinasi genotipe dan menampilkan ilustrasi fenotipe secara otomatis.",
      tokens:[
        {id:"RY",label:"RY",reusable:true},{id:"Ry",label:"Ry",reusable:true},{id:"rY",label:"rY",reusable:true},{id:"ry",label:"ry",reusable:true},
        {id:"RRYY",label:"RRYY · Bulat-kuning",reusable:true},{id:"RRYy",label:"RRYy · Bulat-kuning",reusable:true},
        {id:"RrYY",label:"RrYY · Bulat-kuning",reusable:true},{id:"RrYy",label:"RrYy · Bulat-kuning",reusable:true},
        {id:"RRyy",label:"RRyy · Bulat-hijau",reusable:true},{id:"Rryy",label:"Rryy · Bulat-hijau",reusable:true},
        {id:"rrYY",label:"rrYY · Keriput-kuning",reusable:true},{id:"rrYy",label:"rrYy · Keriput-kuning",reusable:true},
        {id:"rryy",label:"rryy · Keriput-hijau",reusable:true}
      ],
      slots:[
        {id:"dc1",prompt:"Gamet induk 2",answer:"RY"},{id:"dc2",prompt:"Gamet induk 2",answer:"Ry"},{id:"dc3",prompt:"Gamet induk 2",answer:"rY"},{id:"dc4",prompt:"Gamet induk 2",answer:"ry"},
        {id:"dr1",prompt:"Gamet induk 1",answer:"RY"},{id:"dr2",prompt:"Gamet induk 1",answer:"Ry"},{id:"dr3",prompt:"Gamet induk 1",answer:"rY"},{id:"dr4",prompt:"Gamet induk 1",answer:"ry"},
        {id:"d11",prompt:"Keturunan 1",answer:"RRYY"},{id:"d12",prompt:"Keturunan 2",answer:"RRYy"},{id:"d13",prompt:"Keturunan 3",answer:"RrYY"},{id:"d14",prompt:"Keturunan 4",answer:"RrYy"},
        {id:"d21",prompt:"Keturunan 5",answer:"RRYy"},{id:"d22",prompt:"Keturunan 6",answer:"RRyy"},{id:"d23",prompt:"Keturunan 7",answer:"RrYy"},{id:"d24",prompt:"Keturunan 8",answer:"Rryy"},
        {id:"d31",prompt:"Keturunan 9",answer:"RrYY"},{id:"d32",prompt:"Keturunan 10",answer:"RrYy"},{id:"d33",prompt:"Keturunan 11",answer:"rrYY"},{id:"d34",prompt:"Keturunan 12",answer:"rrYy"},
        {id:"d41",prompt:"Keturunan 13",answer:"RrYy"},{id:"d42",prompt:"Keturunan 14",answer:"Rryy"},{id:"d43",prompt:"Keturunan 15",answer:"rrYy"},{id:"d44",prompt:"Keturunan 16",answer:"rryy"}
      ],
      output:"Rasio fenotipe F2: 9 bulat-kuning : 3 bulat-hijau : 3 keriput-kuning : 1 keriput-hijau."
    }
  ]
};

let state = {
  route:{screen:"home",index:0},
  apersepsiCorrect:false,
  activityDone:{},
  quiz:null,
  lastQuizOrder:[],
  game:null,
  profileIndex:0,
  profilePaused:false
};

function safeSessionGet(){
  try{
    const raw=sessionStorage.getItem(STORAGE_KEY);
    if(raw){const parsed=JSON.parse(raw);if(parsed&&parsed.route){
      if(parsed.game&&parsed.game.id&&!parsed.game.activityState){parsed.game=null;if(parsed.route.screen==="game"||parsed.route.screen==="game-result")parsed.route={screen:"game-menu",index:0};}
      if(parsed.quiz&&(!Array.isArray(parsed.quiz.questionOrder)||parsed.quiz.questionOrder.length!==quizBank.length)){
        parsed.quiz=null;
        if(parsed.route.screen==="quiz"||parsed.route.screen==="quiz-result")parsed.route={screen:"quiz-intro",index:0};
      }
      state={...state,...parsed};
    }}
  }catch(e){}
}
function persist(){
  try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){}
}
safeSessionGet();

function esc(value){
  return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function imageSlot(filename,alt,fallbackLabel="Ilustrasi materi"){
  const fallback=`<svg viewBox="0 0 500 300" role="img" aria-label="${esc(alt)}"><rect x="8" y="8" width="484" height="284" rx="24" fill="#fff4e6"/><circle cx="250" cy="145" r="95" fill="#ffe0b5"/><path d="M190 55 C310 90 190 200 310 245" fill="none" stroke="#f28c28" stroke-width="14" stroke-linecap="round"/><path d="M310 55 C190 90 310 200 190 245" fill="none" stroke="#55a77d" stroke-width="14" stroke-linecap="round"/><g stroke="#d6a46e" stroke-width="6" stroke-linecap="round"><path d="M212 70h76M195 110h110M195 150h110M195 190h110M212 230h76"/></g><text x="250" y="280" text-anchor="middle" fill="#8a531f" font-size="14" font-family="Arial" font-weight="bold">${esc(fallbackLabel)}</text></svg>`;
  return `<div class="illustration-frame"><img src="assets/images/${esc(filename)}" alt="${esc(alt)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="illustration-fallback" hidden>${fallback}</div></div>`;
}
function heroArt(){
  const svg=`<svg viewBox="0 0 560 390" role="img" aria-label="Ilustrasi biologi"><ellipse cx="280" cy="345" rx="205" ry="24" fill="#e9c69d" opacity=".38"/><circle cx="285" cy="174" r="142" fill="#ffe0b5"/><circle cx="285" cy="174" r="112" fill="#fff4e6"/><g class="floating"><path d="M236 48 C420 90 230 250 360 294" fill="none" stroke="#f28c28" stroke-width="14" stroke-linecap="round"/><path d="M360 48 C170 90 370 250 230 294" fill="none" stroke="#55a77d" stroke-width="14" stroke-linecap="round"/><g stroke="#d8a36e" stroke-width="5" stroke-linecap="round"><path d="M260 65h76M230 105h136M230 145h136M230 185h136M230 225h136M260 265h76"/></g></g><g fill="#f4b55e"><circle cx="110" cy="95" r="9"/><circle cx="450" cy="100" r="12"/><circle cx="390" cy="45" r="6"/></g><text x="280" y="365" text-anchor="middle" fill="#8b5a31" font-size="14" font-weight="bold">DNA • GEN • KROMOSOM</text></svg>`;
  return `<div class="hero-art">${imageSlot("hero-biology.png","Ilustrasi utama biologi","DNA dan materi genetik")}</div>`;
}
function familyArt(){
  return imageSlot("family-genetics.png","Ilustrasi keluarga untuk apersepsi","Keluarga dan pewarisan sifat");
}

function menuBuild(){
  const target=$("#materialMenu");
  target.innerHTML=materials.map((m,i)=>`<button class="menu-link" data-route="material" data-index="${i}" type="button"><span>${String(i+1).padStart(2,"0")}</span>${esc(m.title)}</button>`).join("");
}
menuBuild();

function routeTo(screen,index=0){
  stopGameClock();
  state.route={screen,index};
  persist();
  closeMenu();
  render();
  window.scrollTo({top:0,behavior:"smooth"});
}
function progressPercent(){
  const {screen,index}=state.route;
  if(screen==="home")return 0;
  if(screen==="apersepsi")return 5;
  if(screen==="tujuan")return 10;
  if(screen==="material")return 15+((index+1)/materials.length)*65;
  if(screen==="game-menu"||screen==="game")return 84;
  if(screen==="quiz-intro"||screen==="quiz")return 92;
  if(screen==="quiz-result"||screen==="game-result"||screen==="profile")return 100;
  return 0;
}
function navButtons(prevAction,nextAction,nextLabel="Selanjutnya →"){
  return `<div class="screen-nav"><button class="secondary-btn" data-action="${prevAction}" type="button">← Kembali</button><button class="primary-btn nav-next" data-action="${nextAction}" type="button">${nextLabel}</button></div>`;
}
function heading(kicker,title,desc){
  return `<div class="page-heading"><span class="eyebrow"><span class="eyebrow-dot"></span>${kicker}</span><h1>${title}</h1>${desc?`<p class="lead">${desc}</p>`:""}</div>`;
}
function renderHome(){
  return `<section class="screen"><div class="hero"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span>MEDIA PEMBELAJARAN INTERAKTIF</span><h1><span class="chapter">BAB 4</span>PEWARISAN<br>SIFAT</h1><p class="lead">Yuk, jelajahi rahasia materi genetik, ekspresi gen, dan bagaimana sifat diwariskan dari generasi ke generasi.</p><button class="primary-btn" data-route="apersepsi" type="button">▶ &nbsp; MULAI BELAJAR!</button><div><span class="hero-sticker">✦ Belajar jadi petualangan sains!</span></div></div>${heroArt()}</div><div class="prototype-note">Mulai dari apersepsi, pelajari 14 materi, lalu uji pemahaman melalui game dan quiz.</div></section>`;
}
function renderApersepsi(){
  return `${heading("APERSEPSI","Mengapa Kita Mirip Orang Tua?","Pernahkah kamu memperhatikan bahwa beberapa karakteristikmu mirip dengan ayah atau ibu?")}
  <div class="card content-card"><div class="appersepsi-grid"><div class="family-art">${familyArt()}</div><div class="question-panel"><span class="eyebrow">PERTANYAAN PEMANTIK</span><h2>Menurutmu, mengapa anak dapat memiliki kemiripan dengan kedua orang tuanya?</h2><p class="question-text">Pilih jawaban yang paling tepat. Perhatikan hubungan antara orang tua, keturunan, dan informasi genetik.</p><div class="answer-list">
  <button class="answer-btn ${state.apersepsiCorrect?"":" "}" data-apersepsi="A" type="button"><span class="letter">A</span><span>Karena anak selalu memiliki wajah yang sama persis dengan orang tuanya.</span></button>
  <button class="answer-btn ${state.apersepsiCorrect?"correct":""}" data-apersepsi="B" type="button"><span class="letter">B</span><span>Karena anak mewarisi informasi genetik dari kedua orang tuanya.</span></button>
  <button class="answer-btn" data-apersepsi="C" type="button"><span class="letter">C</span><span>Karena semua anggota keluarga memiliki seluruh sifat yang sama.</span></button></div>
  <div id="apersepsiFeedback" aria-live="polite">${state.apersepsiCorrect?'<div class="feedback success">Benar! Anak mewarisi informasi genetik dari kedua orang tuanya.</div>':""}</div></div></div></div>${navButtons("back-home","next-objectives")}`;
}
const objectives=[
"Mengidentifikasi dan menjelaskan struktur materi genetik, meliputi kromosom, DNA, RNA, dan gen serta hubungan antara komponen-komponen tersebut.",
"Menjelaskan peran materi genetik dalam menentukan dan mewariskan sifat serta membedakan genotipe dan fenotipe.",
"Menjelaskan proses ekspresi gen dalam sintesis protein, termasuk fungsi mRNA, rRNA, dan tRNA.",
"Menerapkan Hukum I Mendel melalui persilangan monohibrid dengan menentukan kombinasi alel dan rasio keturunan.",
"Menganalisis pola pewarisan sifat melalui persilangan dihibrid berdasarkan Hukum II Mendel.",
"Menganalisis contoh pewarisan sifat pada manusia dengan menghubungkan faktor genetik dan lingkungan."
];
function renderObjectives(){
  return `${heading("ORIENTASI PEMBELAJARAN","Tujuan Pembelajaran","Setelah mengikuti pembelajaran, kamu diharapkan mampu mencapai enam tujuan berikut.")}
  <div class="objectives-grid">${objectives.map((o,i)=>`<article class="card objective-card"><span class="objective-number">${i+1}</span><div><strong>Tujuan Pembelajaran ${i+1}</strong><p>${o}</p></div></article>`).join("")}</div>
  <div class="prototype-note">Bacalah tujuan pembelajaran ini sebelum memulai materi. Kamu akan mempelajari konsep secara bertahap melalui ilustrasi dan aktivitas interaktif.</div>${navButtons("back-apersepsi","first-material")}`;
}

function activityHTML(type){
  const select=(id,options)=>`<select class="field-control" id="${id}"><option value="">Pilih jawaban...</option>${options.map((o,i)=>`<option value="${esc(o[0])}">${esc(o[1])}</option>`).join("")}</select>`;
  const btn=(label="Periksa Jawaban")=>`<button class="primary-btn check-btn" data-activity-check="${type}" type="button">${label}</button><div id="activityFeedback" aria-live="polite"></div>`;
  switch(type){
    case "match": return `<h3>Cocokkan istilah dengan pengertiannya</h3><p>Pilih pengertian yang paling tepat untuk setiap istilah.</p><div class="activity-grid">
      <div class="field-group"><label>Kromosom</label>${select("match0",[["a","Molekul penyimpan informasi genetik"],["b","Struktur DNA dan protein yang mengemas DNA"],["c","Bagian DNA pembawa informasi"],["d","Molekul yang membantu ekspresi gen"]])}</div>
      <div class="field-group"><label>DNA</label>${select("match1",[["a","Molekul penyimpan informasi genetik"],["b","Struktur DNA dan protein yang mengemas DNA"],["c","Bagian DNA pembawa informasi"],["d","Molekul yang membantu ekspresi gen"]])}</div>
      <div class="field-group"><label>Gen</label>${select("match2",[["a","Molekul penyimpan informasi genetik"],["b","Struktur DNA dan protein yang mengemas DNA"],["c","Bagian DNA pembawa informasi"],["d","Molekul yang membantu ekspresi gen"]])}</div>
      <div class="field-group"><label>RNA</label>${select("match3",[["a","Molekul penyimpan informasi genetik"],["b","Struktur DNA dan protein yang mengemas DNA"],["c","Bagian DNA pembawa informasi"],["d","Molekul yang membantu ekspresi gen"]])}</div></div>${btn()}`;
    case "chromosome": return `<h3>Kenali bagian kromosom</h3><p>Pilih istilah yang sesuai dengan deskripsi berikut.</p><div class="activity-grid">
      <div class="field-group"><label>Bagian yang menghubungkan kromatid saudara</label>${select("chrom0",[["kromatid","Kromatid"],["sentromer","Sentromer"],["telomer","Telomer"]])}</div>
      <div class="field-group"><label>Bagian ujung kromosom</label>${select("chrom1",[["kromatid","Kromatid"],["sentromer","Sentromer"],["telomer","Telomer"]])}</div>
      <div class="field-group"><label>Salah satu bagian dari kromosom yang telah mengganda</label>${select("chrom2",[["kromatid","Kromatid"],["sentromer","Sentromer"],["telomer","Telomer"]])}</div></div>${btn()}`;
    case "dna": return `<h3>DNA Base Pair Challenge</h3><p>Lengkapi pasangan basa dari urutan DNA berikut: <strong class="text-orange">A – G – T – C – C – A</strong>.</p><div class="field-group"><label>Masukkan urutan pasangan basanya</label><input id="dnaAnswer" class="text-input" placeholder="Contoh: T C A G G T" autocomplete="off"></div>${btn("Periksa Pasangan Basa")}`;
    case "rna": return `<h3>DNA atau RNA?</h3><p>Tentukan molekul yang sesuai untuk setiap karakteristik.</p><div class="activity-grid">
      <div class="field-group"><label>Mengandung gula deoksiribosa</label>${select("rna0",[["DNA","DNA"],["RNA","RNA"]])}</div>
      <div class="field-group"><label>Mengandung basa urasil</label>${select("rna1",[["DNA","DNA"],["RNA","RNA"]])}</div>
      <div class="field-group"><label>Umumnya memiliki dua untai</label>${select("rna2",[["DNA","DNA"],["RNA","RNA"]])}</div>
      <div class="field-group"><label>Mengandung gula ribosa</label>${select("rna3",[["DNA","DNA"],["RNA","RNA"]])}</div></div>${btn()}`;
    case "gene": return `<h3>Temukan konsep gen</h3><p>Dalam ilustrasi DNA, gen merupakan segmen tertentu yang mengandung informasi untuk menghasilkan produk fungsional. Pilih pernyataan yang tepat.</p><div class="answer-list">
      <button class="answer-btn" data-gene-choice="A" type="button"><span class="letter">A</span><span>Seluruh kromosom adalah satu gen.</span></button>
      <button class="answer-btn" data-gene-choice="B" type="button"><span class="letter">B</span><span>Gen merupakan bagian DNA yang membawa informasi biologis tertentu.</span></button>
      <button class="answer-btn" data-gene-choice="C" type="button"><span class="letter">C</span><span>Gen adalah organel yang menghasilkan energi.</span></button></div><div id="activityFeedback" aria-live="polite"></div>`;
    case "genotype": return `<h3>Kelompokkan genotipe</h3><p>Tentukan kategori dari masing-masing genotipe.</p><div class="activity-grid">
      <div class="field-group"><label>AA</label>${select("geno0",[["homod","Homozigot dominan"],["hetero","Heterozigot"],["homor","Homozigot resesif"]])}</div>
      <div class="field-group"><label>Aa</label>${select("geno1",[["homod","Homozigot dominan"],["hetero","Heterozigot"],["homor","Homozigot resesif"]])}</div>
      <div class="field-group"><label>aa</label>${select("geno2",[["homod","Homozigot dominan"],["hetero","Heterozigot"],["homor","Homozigot resesif"]])}</div></div>${btn()}`;
    case "phenotype": return `<h3>Hubungkan genotipe dengan fenotipe</h3><p>Pada contoh tanaman ercis, P = ungu (dominan penuh) dan p = putih (resesif).</p><div class="activity-grid">
      <div class="field-group"><label>Genotipe PP</label>${select("pheno0",[["ungu","Bunga ungu"],["putih","Bunga putih"]])}</div>
      <div class="field-group"><label>Genotipe Pp</label>${select("pheno1",[["ungu","Bunga ungu"],["putih","Bunga putih"]])}</div>
      <div class="field-group"><label>Genotipe pp</label>${select("pheno2",[["ungu","Bunga ungu"],["putih","Bunga putih"]])}</div></div>${btn()}`;
    case "expression": return `<h3>Susun proses ekspresi gen</h3><p>Pilih urutan sederhana yang tepat untuk pembentukan protein.</p>${select("expressionOrder",[["dna-transcription-mrna-translation-protein","DNA → Transkripsi → mRNA → Translasi → Protein"],["protein-transcription-dna-mrna","Protein → Transkripsi → DNA → mRNA"],["mrna-dna-translation-protein","mRNA → DNA → Translasi → Protein"]])}${btn("Periksa Urutan")}`;
    case "mrna": return `<h3>Transkripsi DNA menjadi mRNA</h3><p>DNA cetakan: <strong class="text-orange">TAC – GGA – CTT</strong>. Tuliskan urutan mRNA yang terbentuk.</p><div class="field-group"><label>Urutan mRNA</label><input id="mrnaAnswer" class="text-input" placeholder="Contoh: AUG CCU GAA" autocomplete="off"></div>${btn("Periksa Transkripsi")}`;
    case "rrna": return `<h3>Apa fungsi utama rRNA?</h3><p>Pilih jawaban yang paling tepat.</p><div class="answer-list">
      <button class="answer-btn" data-rrna-choice="A" type="button"><span class="letter">A</span><span>Menyimpan seluruh informasi genetik di inti sel.</span></button>
      <button class="answer-btn" data-rrna-choice="B" type="button"><span class="letter">B</span><span>Menjadi komponen utama ribosom dan membantu translasi.</span></button>
      <button class="answer-btn" data-rrna-choice="C" type="button"><span class="letter">C</span><span>Membawa asam amino menuju ribosom.</span></button></div><div id="activityFeedback" aria-live="polite"></div>`;
    case "trna": return `<h3>Pasangkan kodon dan antikodon</h3><p>Jika kodon mRNA adalah <strong class="text-orange">AUG</strong>, tuliskan antikodon tRNA yang berpasangan.</p><div class="field-group"><label>Antikodon tRNA</label><input id="trnaAnswer" class="text-input" placeholder="Masukkan tiga basa" autocomplete="off"></div>${btn("Periksa Antikodon")}`;
    case "monohybrid": return `<h3>Simulasi persilangan monohibrid</h3><p>Pilih genotipe kedua induk. Gunakan P untuk ungu (dominan penuh) dan p untuk putih (resesif).</p><div class="activity-grid">
      <div class="field-group"><label>Genotipe induk 1</label>${select("monoA",[["PP","PP"],["Pp","Pp"],["pp","pp"]])}</div>
      <div class="field-group"><label>Genotipe induk 2</label>${select("monoB",[["PP","PP"],["Pp","Pp"],["pp","pp"]])}</div></div><button class="primary-btn check-btn" data-mono-calc type="button">Hitung Persilangan</button><div id="activityFeedback" aria-live="polite"></div><div id="monoResult"></div>`;
    case "dihybrid": return `<h3>Simulasi persilangan dihibrid</h3><p>Persilangan RrYy × RrYy. R = bulat, r = keriput, Y = kuning, y = hijau. Asumsikan kedua gen tidak terpaut dan dominansi penuh.</p><button class="primary-btn check-btn" data-dihybrid-calc type="button">Tampilkan Tabel Punnett</button><div id="activityFeedback" aria-live="polite"></div><div id="dihybridResult"></div>`;
    case "abo": return `<h3>Family Genetics: Golongan Darah ABO</h3><p>Pilih genotipe kedua orang tua untuk melihat kemungkinan golongan darah anak.</p><div class="activity-grid">
      <div class="field-group"><label>Genotipe ayah</label>${select("aboA",[["IAi","IAi (golongan A)"],["IAIA","IAIA (golongan A)"],["IBi","IBi (golongan B)"],["IBIB","IBIB (golongan B)"],["IAIB","IAIB (golongan AB)"],["ii","ii (golongan O)"]])}</div>
      <div class="field-group"><label>Genotipe ibu</label>${select("aboB",[["IBi","IBi (golongan B)"],["IAi","IAi (golongan A)"],["IAIA","IAIA (golongan A)"],["IBIB","IBIB (golongan B)"],["IAIB","IAIB (golongan AB)"],["ii","ii (golongan O)"]])}</div></div><button class="primary-btn check-btn" data-abo-calc type="button">Hitung Kemungkinan Anak</button><div id="activityFeedback" aria-live="polite"></div><div id="aboResult"></div>`;
    default:return `<p>Aktivitas interaktif akan tersedia pada halaman ini.</p>`;
  }
}
function renderMaterial(){
  const i=state.route.index||0,m=materials[i];
  return `${heading(m.section,`Materi ${i+1}: ${esc(m.title)}`,m.intro)}
    <div class="material-layout">
      <article class="card material-main">
        <div class="material-meta"><span class="eyebrow">${m.section}</span><span class="progress-label">${i+1} / ${materials.length}</span></div>
        <h2>${esc(m.title)}</h2>
        ${m.paragraphs.map(p=>`<p>${p}</p>`).join("")}
        <ul class="info-points">${m.points.map(p=>`<li>${p}</li>`).join("")}</ul>
        <div class="prototype-note"><strong>Contoh:</strong> ${m.example}</div>
      </article>
      <div class="material-visual">${imageSlot(m.image,m.alt,m.title)}</div>
    </div>
    ${i===13?`<section class="card material-video-card">
      <div class="material-video-heading">
        <div><span class="eyebrow">VIDEO PEMBELAJARAN</span><h2>Pewarisan Sifat Manusia</h2></div>
        <span class="video-source-tag"><span aria-hidden="true">▶</span> YouTube</span>
      </div>
      <div class="material-video-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/5rIkbvyuJbQ?rel=0&modestbranding=1"
          title="Video pembelajaran Materi 14: Pewarisan Sifat Manusia"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </section>`:""}
    <div class="activity-card"><span class="eyebrow">AKTIVITAS INTERAKTIF</span>${activityHTML(m.activity)}</div>
    <div class="screen-nav"><button class="secondary-btn" data-action="material-prev" type="button">${i===0?"← Tujuan":"← Materi Sebelumnya"}</button><span class="progress-label">Materi ${i+1} dari 14</span><button class="primary-btn nav-next" data-action="material-next" type="button">${i===materials.length-1?"Ke Laboratorium IPA →":"Materi Selanjutnya →"}</button></div>`;
}

function profilePhoto(profile,index){
  return `<div class="profile-photo-frame">
    <img src="assets/images/profiles/${esc(profile.image)}" alt="${esc(profile.alt)}" loading="lazy"
      onerror="this.hidden=true;this.nextElementSibling.hidden=false">
    <div class="profile-photo-placeholder" hidden>
      <svg viewBox="0 0 180 225" role="img" aria-label="Placeholder foto profil">
        <rect x="5" y="5" width="170" height="215" rx="18" fill="#fff2df"/>
        <circle cx="90" cy="78" r="34" fill="#efc18c"/>
        <path d="M35 190c4-43 25-66 55-66s51 23 55 66" fill="#d7a16b"/>
        <path d="M52 190c5-29 17-45 38-45s33 16 38 45" fill="#f7d6ad"/>
        <circle cx="90" cy="78" r="34" fill="none" stroke="#d49a60" stroke-width="2"/>
      </svg>
      <strong>Placeholder Foto ${String(index+1).padStart(2,"0")}</strong>
      <span>Tambahkan foto profil pengembang</span>
      <small>assets/images/profiles/${esc(profile.image)}</small>
    </div>
  </div>`;
}
function profileContact(icon,label,value){
  const display=value==="-"?"—":value;
  const content=`<span class="profile-contact-value">${esc(display)}</span>`;
  return `<div class="profile-contact-row"><span class="profile-contact-icon" aria-hidden="true">${icon}</span><span class="profile-contact-label">${label}</span>${value!=="-"&&label==="E-mail"?`<a href="mailto:${esc(value)}">${content}</a>`:content}</div>`;
}
function renderDeveloperProfile(){
  const total=developerProfiles.length;
  const index=((Number(state.profileIndex)||0)%total+total)%total;
  const profile=developerProfiles[index];
  return `${heading("TIM PENGEMBANG","Profil Pengembang","Kenali tim yang bertanggung jawab dalam penyusunan materi dan pengembangan media pembelajaran Genetic Adventure.")}
    <section class="developer-profile-section">
      <div class="profile-slide-topline">
        <span class="profile-slide-count">PROFIL ${String(index+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}</span>
        <span class="profile-autoplay-status">${state.profilePaused?"Slideshow dijeda":"Slideshow otomatis · 7 detik"}</span>
      </div>
      <article class="card developer-profile-card">
        <div class="developer-profile-photo">${profilePhoto(profile,index)}</div>
        <div class="developer-profile-details">
          <span class="badge profile-role-badge">${esc(profile.role)}</span>
          <h2>${esc(profile.name)}</h2>
          <p class="profile-institution"><span aria-hidden="true">🏛️</span> ${esc(profile.institution)}</p>
          <div class="profile-contact-list">
            ${profileContact("📧","E-mail",profile.email)}
            ${profileContact("🅾","Instagram",profile.instagram)}
            ${profileContact("ⓕ","Facebook",profile.facebook)}
          </div>
        </div>
      </article>
      <div class="profile-slideshow-controls">
        <button class="secondary-btn profile-control-btn" data-profile-prev type="button" aria-label="Profil sebelumnya">← Sebelumnya</button>
        <div class="profile-slide-dots" aria-label="Pilih profil">
          ${developerProfiles.map((p,i)=>`<button class="profile-dot ${i===index?"active":""}" data-profile-dot="${i}" type="button" aria-label="Tampilkan profil ${i+1}" aria-current="${i===index?"true":"false"}"></button>`).join("")}
        </div>
        <button class="primary-btn profile-control-btn" data-profile-next type="button" aria-label="Profil berikutnya">Berikutnya →</button>
      </div>
      <div class="profile-playback-row">
        <button class="profile-pause-btn" data-profile-toggle type="button">${state.profilePaused?"▶ Lanjutkan slideshow":"▐▐ Jeda slideshow"}</button>
      </div>
      </section>
      <div class="prototype-note">Placeholder foto dapat diganti dengan foto asli. Gunakan rasio 4:5 agar seluruh foto tampil konsisten tanpa mengubah tata letak.</div>`;
}
function stopProfileSlideshow(){
  if(profileTimerHandle){clearInterval(profileTimerHandle);profileTimerHandle=null;}
}
function startProfileSlideshow(){
  stopProfileSlideshow();
  if(state.route.screen!=="profile"||state.profilePaused)return;
  profileTimerHandle=setInterval(()=>{
    if(state.route.screen!=="profile"||state.profilePaused){stopProfileSlideshow();return;}
    state.profileIndex=(Number(state.profileIndex||0)+1)%developerProfiles.length;
    persist();
    render();
  },7000);
}

function renderGameMenu(){
  return `${heading("LABORATORIUM IPA","Laboratorium IPA","Pilih praktikum. Setiap permainan menggunakan kartu bergambar, identifikasi visual, penyusunan urutan, klasifikasi, dan simulasi persilangan. Semua interaksi dapat dilakukan dengan klik atau ketukan.")}
  <div class="card form-card game-setup-card" style="margin-bottom:18px">
    <div class="field-group"><label for="gamePlayerName">Nama pemain</label><input id="gamePlayerName" class="text-input" placeholder="Masukkan nama kamu" value="${esc(state.game?.name||"")}"></div>
    <div class="field-group" style="margin-top:13px"><label for="gameMode">Mode praktikum</label><select id="gameMode" class="field-control"><option value="practice" ${state.game?.mode!=="challenge"?"selected":""}>Mode latihan · tanpa batas waktu</option><option value="challenge" ${state.game?.mode==="challenge"?"selected":""}>Mode tantangan · menggunakan timer</option></select></div>
    <p class="muted" style="font-size:12px;margin:9px 0 0">Mode latihan cocok untuk memahami proses. Mode tantangan menambahkan batas waktu, tetapi seluruh mekanik tetap sama.</p>
  </div>
  <div class="game-grid">
    ${Object.entries(gameSets).map(([id,g])=>`<article class="card game-card"><div class="game-icon">${g.icon}</div><span class="badge ${id==="puzzle"?"easy":id==="dna"?"medium":"hard"}">${g.level}</span><h3>${g.title}</h3><p>${g.description}</p><p class="muted">${g.stations} stasiun praktikum · interaksi visual berbasis ketukan</p><button class="primary-btn" data-game-start="${id}" type="button">Masuk Laboratorium →</button></article>`).join("")}
  </div>
  <div class="prototype-note">Petunjuk: pilih kartu bergambar, ketuk bagian ilustrasi, susun basa nitrogen, kelompokkan ciri DNA/RNA, atau bangun tabel Punnett. Tidak diperlukan drag & drop.</div>`;
}

function svgArt(viewBox,label,content){
  return `<svg viewBox="${viewBox}" role="img" aria-label="${esc(label)}" class="lab-svg-art">${content}</svg>`;
}
function nucleotideSvg(letter){
  const palette={
    A:["#f6a84f","#7e4b11"],
    T:["#74c080","#1d6a38"],
    G:["#79a8ff","#24488a"],
    C:["#d38cff","#6d2d8f"],
    U:["#ff8aa3","#8f2040"]
  };
  const key=String(letter||"").toUpperCase();
  const [fill,text]=palette[key]||["#ffd8a8","#7e4b11"];
  return svgArt("0 0 80 80",`Basa ${key}`,`
    <circle cx="40" cy="40" r="30" fill="${fill}" opacity=".18"/>
    <circle cx="40" cy="40" r="24" fill="${fill}" stroke="white" stroke-width="4"/>
    <text x="40" y="48" text-anchor="middle" font-size="28" font-family="Arial" font-weight="900" fill="${text}">${key}</text>
  `);
}
function dnaHelixSvg(){
  return svgArt("0 0 84 84","DNA",`
    <rect x="10" y="8" width="64" height="68" rx="18" fill="#fff7ec" stroke="#f0d6b3"/>
    <path d="M27 14 C54 24 26 39 56 50 C29 60 50 70 26 74" fill="none" stroke="#f28c28" stroke-width="6" stroke-linecap="round"/>
    <path d="M57 14 C30 24 58 39 28 50 C55 60 34 70 58 74" fill="none" stroke="#55a77d" stroke-width="6" stroke-linecap="round"/>
    <g stroke="#c59b72" stroke-width="3" stroke-linecap="round">
      <path d="M31 18h22"/><path d="M26 30h32"/><path d="M24 42h36"/><path d="M26 54h32"/><path d="M31 66h22"/>
    </g>
  `);
}
function chromosomeSvg(mode="full"){
  if(mode==="telomere"){
    return svgArt("0 0 84 84","Telomer",`
      <path d="M28 12 C20 26 24 39 38 44 C24 49 20 59 28 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
      <path d="M56 12 C64 26 60 39 46 44 C60 49 64 59 56 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="42" cy="42" r="8" fill="#f4a261"/>
      <circle cx="28" cy="12" r="6" fill="#f28c28"/><circle cx="56" cy="12" r="6" fill="#f28c28"/>
      <circle cx="28" cy="72" r="6" fill="#f28c28"/><circle cx="56" cy="72" r="6" fill="#f28c28"/>
    `);
  }
  if(mode==="centromere"){
    return svgArt("0 0 84 84","Sentromer",`
      <path d="M28 12 C20 26 24 39 38 44 C24 49 20 59 28 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
      <path d="M56 12 C64 26 60 39 46 44 C60 49 64 59 56 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="42" cy="42" r="9" fill="#e76f51"/>
    `);
  }
  if(mode==="chromatid"){
    return svgArt("0 0 84 84","Kromatid",`
      <path d="M42 12 C29 23 28 35 42 42 C56 50 55 61 42 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="42" cy="42" r="8" fill="#f4a261"/>
    `);
  }
  return svgArt("0 0 84 84","Kromosom",`
    <path d="M28 12 C20 26 24 39 38 44 C24 49 20 59 28 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
    <path d="M56 12 C64 26 60 39 46 44 C60 49 64 59 56 72" fill="none" stroke="#6ea4ff" stroke-width="10" stroke-linecap="round"/>
    <circle cx="42" cy="42" r="8" fill="#f4a261"/>
  `);
}
function histoneSvg(){
  return svgArt("0 0 84 84","Protein histon",`
    <circle cx="42" cy="42" r="22" fill="#55a77d"/>
    <circle cx="42" cy="42" r="10" fill="#dff2e6"/>
    <g stroke="#fff" stroke-width="3" stroke-linecap="round">
      <path d="M42 20v9"/><path d="M42 55v9"/><path d="M20 42h9"/><path d="M55 42h9"/>
    </g>
  `);
}
function nucleosomeSvg(){
  return svgArt("0 0 84 84","Nukleosom",`
    <circle cx="42" cy="42" r="18" fill="#55a77d"/>
    <path d="M18 42 C18 20 66 20 66 42 C66 64 18 64 18 42 Z" fill="none" stroke="#f28c28" stroke-width="5"/>
    <path d="M23 42 C23 27 61 27 61 42 C61 57 23 57 23 42 Z" fill="none" stroke="#f2b56a" stroke-width="4"/>
  `);
}
function chromatinSvg(){
  return svgArt("0 0 84 84","Kromatin",`
    <g fill="#55a77d">
      <circle cx="20" cy="42" r="10"/><circle cx="42" cy="28" r="10"/><circle cx="64" cy="42" r="10"/>
      <circle cx="42" cy="56" r="10"/>
    </g>
    <path d="M10 42 C16 24 28 24 34 30 C40 36 44 50 50 54 C56 58 64 52 72 42" fill="none" stroke="#f28c28" stroke-width="5" stroke-linecap="round"/>
  `);
}
function geneSvg(){
  return svgArt("0 0 84 84","Gen",`
    <path d="M25 12 C53 20 25 35 57 46 C28 56 54 69 25 74" fill="none" stroke="#f28c28" stroke-width="6" stroke-linecap="round"/>
    <path d="M59 12 C31 20 59 35 27 46 C56 56 30 69 59 74" fill="none" stroke="#55a77d" stroke-width="6" stroke-linecap="round"/>
    <rect x="28" y="34" width="28" height="16" rx="8" fill="#6ea4ff" opacity=".85"/>
  `);
}
function alleleSvg(){
  return svgArt("0 0 84 84","Alel",`
    <path d="M24 16 C40 22 24 35 43 46" fill="none" stroke="#f28c28" stroke-width="6" stroke-linecap="round"/>
    <path d="M60 16 C44 22 60 35 41 46" fill="none" stroke="#55a77d" stroke-width="6" stroke-linecap="round"/>
    <circle cx="26" cy="58" r="10" fill="#8ac4ff"/><circle cx="58" cy="58" r="10" fill="#ffb0bf"/>
    <text x="26" y="62" text-anchor="middle" font-size="12" font-weight="900" fill="#214d80">A</text>
    <text x="58" y="62" text-anchor="middle" font-size="12" font-weight="900" fill="#8d2644">a</text>
  `);
}
function sugarSvg(type="deoxy"){
  const label=type==="deoxy"?"Deoksiribosa":"Ribosa";
  const fill=type==="deoxy"?"#79a8ff":"#ff8aa3";
  return svgArt("0 0 84 84",label,`
    <polygon points="42,12 66,30 57,60 27,60 18,30" fill="${fill}" opacity=".85" stroke="white" stroke-width="3"/>
    <text x="42" y="48" text-anchor="middle" font-size="11" font-family="Arial" font-weight="900" fill="#fff">${type==="deoxy"?"DNA":"RNA"}</text>
  `);
}
function strandSvg(type="double"){
  if(type==="single"){
    return svgArt("0 0 84 84","RNA satu untai",`
      <path d="M28 14 C56 24 22 42 54 54 C34 63 50 70 30 74" fill="none" stroke="#ff8aa3" stroke-width="8" stroke-linecap="round"/>
      <circle cx="26" cy="14" r="4" fill="#ff8aa3"/><circle cx="32" cy="74" r="4" fill="#ff8aa3"/>
    `);
  }
  return svgArt("0 0 84 84","DNA dua untai",`
    <path d="M27 12 C54 22 26 38 56 50 C29 60 50 68 26 74" fill="none" stroke="#f28c28" stroke-width="6" stroke-linecap="round"/>
    <path d="M57 12 C30 22 58 38 28 50 C55 60 34 68 58 74" fill="none" stroke="#55a77d" stroke-width="6" stroke-linecap="round"/>
    <g stroke="#d6a46e" stroke-width="3"><path d="M31 18h22"/><path d="M26 32h32"/><path d="M24 46h36"/><path d="M28 60h30"/></g>
  `);
}
function flowerSvg(genotype){
  const dominant=String(genotype).includes("P");
  const petal=dominant?"#9c6bff":"#ffffff";
  const stroke=dominant?"#6c46cb":"#b3bfd1";
  return svgArt("0 0 84 84",`Bunga ${dominant?"ungu":"putih"}`,`
    <g fill="${petal}" stroke="${stroke}" stroke-width="2.5">
      <circle cx="42" cy="23" r="12"/><circle cx="24" cy="38" r="12"/><circle cx="60" cy="38" r="12"/><circle cx="32" cy="56" r="12"/><circle cx="52" cy="56" r="12"/>
    </g>
    <circle cx="42" cy="42" r="10" fill="#ffd166" stroke="#f4a261" stroke-width="2"/>
    <path d="M42 52v19" stroke="#55a77d" stroke-width="5" stroke-linecap="round"/>
    <path d="M42 63 C31 59 27 67 26 72" fill="none" stroke="#55a77d" stroke-width="4" stroke-linecap="round"/>
    <path d="M42 64 C53 60 57 68 58 72" fill="none" stroke="#55a77d" stroke-width="4" stroke-linecap="round"/>
    <text x="42" y="16" text-anchor="middle" font-size="11" font-family="Arial" font-weight="900" fill="#6b4f2c">${esc(genotype)}</text>
  `);
}
function seedSvg(genotype){
  const yellow=String(genotype).includes("Y");
  const round=String(genotype).includes("R");
  const fill=yellow?"#ffd84d":"#89c66d";
  const stroke=yellow?"#e1b521":"#4f8d4d";
  const path=round
    ? `<ellipse cx="42" cy="42" rx="22" ry="18" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`
    : `<path d="M22 34 C28 16 58 18 63 34 C68 49 56 67 40 64 C29 70 17 51 22 34 Z" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
  return svgArt("0 0 84 84",`Biji ${round?"bulat":"keriput"} ${yellow?"kuning":"hijau"}`,`
    ${path}
    <text x="42" y="45" text-anchor="middle" font-size="11" font-family="Arial" font-weight="900" fill="#6b4f2c">${esc(genotype)}</text>
  `);
}
function tokenArt(gameId,stationId,token){
  const label=token?.label||"";
  const id=token?.id||"";
  if(["a1","a2","t1","g1","g2","c1","c2","ta1","ta2","ta3","tu1","tu2"].includes(id)) return nucleotideSvg(label);
  if(stationId==="packaging"){
    if(id==="dna") return dnaHelixSvg();
    if(id==="histone") return histoneSvg();
    if(id==="nucleosome") return nucleosomeSvg();
    if(id==="chromatin") return chromatinSvg();
    if(id==="chromosome") return chromosomeSvg("full");
  }
  if(stationId==="chromosome"){
    if(id==="telomere") return chromosomeSvg("telomere");
    if(id==="centromere") return chromosomeSvg("centromere");
    if(id==="chromatid") return chromosomeSvg("chromatid");
  }
  if(stationId==="geneallele"){
    if(id==="gene") return geneSvg();
    if(id==="allele") return alleleSvg();
  }
  if(stationId==="classify"){
    if(id==="thymine") return nucleotideSvg("T");
    if(id==="uracil") return nucleotideSvg("U");
    if(id==="deoxyribose") return sugarSvg("deoxy");
    if(id==="ribose") return sugarSvg("ribo");
    if(id==="double") return strandSvg("double");
    if(id==="single") return strandSvg("single");
  }
  if(stationId==="monohybrid"){
    if(["P","p","PP","Pp","pp"].includes(id)){
      return flowerSvg(id);
    }
  }
  if(stationId==="dihybrid"){
    if(["RY","Ry","rY","ry"].includes(id)) return seedSvg(id);
    if(/^[Rr]{2}[Yy]{2}$/.test(id)) return seedSvg(id);
  }
  return svgArt("0 0 84 84",label,`
    <rect x="10" y="12" width="64" height="60" rx="18" fill="#fff0dc" stroke="#e9c9a4" />
    <text x="42" y="47" text-anchor="middle" font-size="18" font-family="Arial" font-weight="900" fill="#9b5316">${esc((label||"?").slice(0,8))}</text>
  `);
}
function slotPlaceholderArt(gameId,station,slot){
  const token=station.tokens.find(t=>t.id===slot.answer) || {id:"",label:""};
  return `<div class="lab-ghost-art">${tokenArt(gameId,station.id,token)}</div>`;
}
function renderStationScene(gameId,station){
  if(station.id==="packaging"){
    const ids=["dna","histone","nucleosome","chromatin","chromosome"];
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Model Pengemasan Materi Genetik</strong></div>
      <div class="scene-flow">${ids.map((id,i)=>{
        const token=station.tokens.find(t=>t.id===id);
        return `<div class="scene-flow-item"><div class="scene-flow-art">${tokenArt(gameId,station.id,token)}</div><b>${esc(token.label)}</b></div>${i<ids.length-1?'<div class="scene-flow-arrow">→</div>':''}`;
      }).join("")}</div>
    </section>`;
  }
  if(station.id==="chromosome"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Bagian-Bagian Kromosom</strong></div>
      <div class="scene-chromosome">
        <div class="scene-big-art">${chromosomeSvg("full")}</div>
        <div class="scene-hotspots">
          <div class="scene-hotspot"><i>1</i><span>Ujung kromosom = telomer</span></div>
          <div class="scene-hotspot"><i>2</i><span>Penyempitan tengah = sentromer</span></div>
          <div class="scene-hotspot"><i>3</i><span>Satu sisi identik = kromatid</span></div>
        </div>
      </div>
    </section>`;
  }
  if(station.id==="geneallele"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Gen dan Alel pada DNA</strong></div>
      <div class="scene-pair">
        <div class="scene-card-mini"><div class="scene-card-art">${geneSvg()}</div><b>Gen</b><p>Segmen DNA yang membawa informasi.</p></div>
        <div class="scene-card-mini"><div class="scene-card-art">${alleleSvg()}</div><b>Alel</b><p>Variasi dari gen yang sama.</p></div>
      </div>
    </section>`;
  }
  if(station.id==="complement"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Pasangan Basa Komplementer</strong></div>
      <div class="scene-sequence-bases">
        <div class="scene-seq-row"><span>DNA cetakan</span><div class="scene-base-list">${["T","A","C","G","G","T"].map(ch=>`<div class="scene-base">${nucleotideSvg(ch)}</div>`).join("")}</div></div>
        <div class="scene-seq-row"><span>Pasangan benar</span><div class="scene-base-list">${["A","T","G","C","C","A"].map(ch=>`<div class="scene-base">${nucleotideSvg(ch)}</div>`).join("")}</div></div>
      </div>
    </section>`;
  }
  if(station.id==="transcription"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Transkripsi DNA → mRNA</strong></div>
      <div class="scene-transcription">
        <div class="scene-seq-row"><span>DNA</span><div class="scene-base-list">${["T","A","C","G","G","A","C","T","T"].map(ch=>`<div class="scene-base">${nucleotideSvg(ch)}</div>`).join("")}</div></div>
        <div class="scene-arrow-band">RNA polimerase menyalin untai cetakan</div>
        <div class="scene-seq-row"><span>mRNA</span><div class="scene-base-list">${["A","U","G","C","C","U","G","A","A"].map(ch=>`<div class="scene-base">${nucleotideSvg(ch)}</div>`).join("")}</div></div>
      </div>
    </section>`;
  }
  if(station.id==="classify"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Perbedaan DNA dan RNA</strong></div>
      <div class="scene-pair">
        <div class="scene-card-mini"><div class="scene-card-art">${strandSvg("double")}</div><b>DNA</b><p>Dua untai, deoksiribosa, timin.</p></div>
        <div class="scene-card-mini"><div class="scene-card-art">${strandSvg("single")}</div><b>RNA</b><p>Satu untai, ribosa, urasil.</p></div>
      </div>
    </section>`;
  }
  if(station.id==="monohybrid"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Persilangan Bunga Ercis</strong></div>
      <div class="scene-parents">
        <div class="scene-parent-card"><div class="scene-card-art">${flowerSvg("Pp")}</div><b>Induk 1 · Pp</b></div>
        <div class="scene-cross">×</div>
        <div class="scene-parent-card"><div class="scene-card-art">${flowerSvg("Pp")}</div><b>Induk 2 · Pp</b></div>
      </div>
      <div class="scene-ratio">Target fenotipe: <strong>3 ungu : 1 putih</strong></div>
    </section>`;
  }
  if(station.id==="dihybrid"){
    return `<section class="lab-scene-card">
      <div class="lab-scene-head"><span>ILUSTRASI LAB</span><strong>Persilangan Dua Sifat</strong></div>
      <div class="scene-parents">
        <div class="scene-parent-card"><div class="scene-card-art">${seedSvg("RrYy")}</div><b>Induk 1 · RrYy</b></div>
        <div class="scene-cross">×</div>
        <div class="scene-parent-card"><div class="scene-card-art">${seedSvg("RrYy")}</div><b>Induk 2 · RrYy</b></div>
      </div>
      <div class="scene-ratio">Target fenotipe: <strong>9 : 3 : 3 : 1</strong></div>
    </section>`;
  }
  return "";
}


function getGameActivity(g,stationId){
  g.activityState=g.activityState||{};
  if(!g.activityState[stationId])g.activityState[stationId]={};
  return g.activityState[stationId];
}
function shuffleList(items){
  const out=items.slice();
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  return out;
}
function matchingPairsFor(station){
  const definitions={
    packaging:{
      dna:"Molekul utama yang menyimpan informasi genetik.",
      histone:"Protein yang menjadi tempat DNA melilit.",
      nucleosome:"Unit yang terbentuk ketika DNA melilit protein histon.",
      chromatin:"Susunan DNA dan protein yang tersusun dari nukleosom.",
      chromosome:"Struktur padat pembawa informasi genetik di dalam sel."
    },
    geneallele:{
      gene:"Segmen DNA yang membawa instruksi untuk menghasilkan produk fungsional.",
      allele:"Bentuk alternatif dari suatu gen pada lokus yang sama."
    }
  };
  return station.tokens.map(t=>({id:t.id,label:t.label,definition:definitions[station.id][t.id],art:tokenArt("puzzle",station.id,t)}));
}
function renderMatchingStation(station,g){
  const a=getGameActivity(g,station.id),pairs=matchingPairsFor(station),matched=new Set(a.matched||[]);
  if(!a.definitionOrder)a.definitionOrder=shuffleList(pairs.map(p=>p.id));
  const selectedImage=a.selectedImage||"",selectedDefinition=a.selectedDefinition||"";
  return `<div class="visual-game-panel">
    <div class="visual-game-heading"><span class="visual-game-kicker">COCOKKAN GAMBAR DAN KONSEP</span><strong>Pilih satu gambar, lalu pilih definisi yang sesuai.</strong><small>Pasangan yang benar akan terkunci dan menampilkan nama komponennya.</small></div>
    <div class="matching-board">
      <section class="matching-column"><h3><span>01</span> Kartu bergambar</h3><div class="matching-card-grid">
        ${pairs.map((p,i)=>`<button type="button" class="matching-image-card ${matched.has(p.id)?"matched":""} ${selectedImage===p.id?"selected":""}" data-match-image="${p.id}" ${matched.has(p.id)?"disabled":""}>
          <span class="matching-card-art">${p.art}</span><span class="matching-card-label">${matched.has(p.id)?esc(p.label):`Gambar ${i+1}`}</span>${matched.has(p.id)?'<span class="match-status">✓ Cocok</span>':""}
        </button>`).join("")}
      </div></section>
      <section class="matching-column"><h3><span>02</span> Kartu definisi</h3><div class="matching-definition-list">
        ${a.definitionOrder.map((id,i)=>{const p=pairs.find(x=>x.id===id);return `<button type="button" class="matching-definition-card ${matched.has(id)?"matched":""} ${selectedDefinition===id?"selected":""}" data-match-definition="${id}" ${matched.has(id)?"disabled":""}>
          <span class="definition-number">${String.fromCharCode(65+i)}</span><span>${matched.has(id)?`<b>${esc(p.label)}</b><small>Pasangan berhasil ditemukan</small>`:esc(p.definition)}</span>${matched.has(id)?'<span class="match-check">✓</span>':""}
        </button>`;}).join("")}
      </div></section>
    </div>
    <div class="matching-progress"><span>Pasangan ditemukan</span><strong>${matched.size} / ${pairs.length}</strong><div class="matching-progress-track"><i style="width:${matched.size/pairs.length*100}%"></i></div></div>
  </div>`;
}
function hotspotTasks(){
  return [
    {id:"telomere",name:"Telomer",prompt:"Temukan bagian ujung kromosom yang membantu melindungi DNA."},
    {id:"centromere",name:"Sentromer",prompt:"Temukan daerah penyempitan yang menghubungkan kromatid saudara."},
    {id:"chromatid",name:"Kromatid",prompt:"Temukan salah satu lengan/sisi dari kromosom yang telah mengganda."}
  ];
}
function renderHotspotStation(station,g){
  const a=getGameActivity(g,station.id),tasks=hotspotTasks(),step=Math.min(a.step||0,tasks.length),task=tasks[step]||null;
  return `<div class="visual-game-panel">
    <div class="visual-game-heading"><span class="visual-game-kicker">IDENTIFIKASI HOTSPOT</span><strong>Ketuk lokasi yang sesuai pada ilustrasi kromosom.</strong><small>Marker A, B, dan C mewakili lokasi yang berbeda. Nama bagian tidak ditampilkan pada gambar.</small></div>
    <div class="hotspot-game-layout">
      <div class="hotspot-figure-card"><div class="hotspot-figure-title">PETA BAGIAN KROMOSOM</div>
        <div class="hotspot-figure">${chromosomeSvg("full")}
          <button type="button" class="hotspot-marker marker-telomere" data-hotspot="telomere" aria-label="Marker A">A</button>
          <button type="button" class="hotspot-marker marker-centromere" data-hotspot="centromere" aria-label="Marker B">B</button>
          <button type="button" class="hotspot-marker marker-chromatid" data-hotspot="chromatid" aria-label="Marker C">C</button>
        </div>
        <div class="hotspot-legend"><span><b>A</b> Lokasi 1</span><span><b>B</b> Lokasi 2</span><span><b>C</b> Lokasi 3</span></div>
      </div>
      <div class="hotspot-question-card">
        <span class="hotspot-step">TANTANGAN ${Math.min((a.step||0)+1,tasks.length)} / ${tasks.length}</span>
        ${task?`<h3>${esc(task.prompt)}</h3><p>Pilih marker pada gambar yang menunjukkan bagian tersebut.</p>`:`<h3>Semua bagian berhasil diidentifikasi!</h3><p>Telomer, sentromer, dan kromatid sudah ditemukan.</p>`}
        <div class="hotspot-task-list">${tasks.map((t,i)=>`<div class="hotspot-task-item ${i<(a.step||0)?"done":i===(a.step||0)?"current":""}"><span>${i<(a.step||0)?"✓":i+1}</span><div><b>${i<(a.step||0)?esc(t.name):`Bagian ${i+1}`}</b><small>${i<(a.step||0)?"Berhasil diidentifikasi":i===(a.step||0)?"Sedang dicari":"Belum dibuka"}</small></div></div>`).join("")}</div>
      </div>
    </div>
  </div>`;
}
function sequenceConfig(station){
  if(station.id==="complement")return {template:["T","A","C","G","G","T"],target:["A","T","G","C","C","A"],options:["A","T","G","C"],caption:"Untai DNA cetakan ditampilkan dari arah 3′ ke 5′. Susun pasangan komplementer dari arah 5′ ke 3′."};
  return {template:["T","A","C","G","G","A","C","T","T"],target:["A","U","G","C","C","U","G","A","A"],options:["A","U","G","C"],caption:"Gunakan aturan transkripsi. RNA menggunakan urasil (U), bukan timin (T)."};
}
function renderSequenceStation(station,g){
  const a=getGameActivity(g,station.id),cfg=sequenceConfig(station),letters=a.letters||Array(cfg.target.length).fill(""),filled=letters.filter(Boolean).length;
  return `<div class="visual-game-panel">
    <div class="visual-game-heading"><span class="visual-game-kicker">SEQUENCE BUILDER</span><strong>${station.id==="complement"?"Bangun untai DNA komplementer":"Transkripsikan DNA menjadi mRNA"}</strong><small>${esc(cfg.caption)} Ketuk kartu basa untuk mengisi posisi kosong. Ketuk posisi yang terisi untuk menghapusnya.</small></div>
    <div class="sequence-reference-card">
      <div class="sequence-reference-label">${station.id==="complement"?"UNTAI DNA CETAKAN":"DNA CETAKAN"}</div>
      <div class="sequence-base-row">${cfg.template.map((ch,i)=>`<div class="sequence-base-item"><span>${i+1}</span>${nucleotideSvg(ch)}</div>`).join("")}</div>
      ${station.id==="transcription"?'<div class="sequence-process-arrow">RNA polimerase → mRNA</div>':""}
    </div>
    <div class="sequence-answer-card">
      <div class="sequence-reference-label">${station.id==="complement"?"UNTAI DNA BARU · 5′ → 3′":"URUTAN mRNA · 5′ → 3′"}</div>
      <div class="sequence-slot-row">${cfg.target.map((_,i)=>`<button type="button" class="sequence-slot ${letters[i]?"filled":""} ${a.checked?(letters[i]===cfg.target[i]?"correct":"wrong"):""}" data-seq-slot="${i}" aria-label="Posisi ${i+1}, ${letters[i]||"kosong"}"><span>${i+1}</span>${letters[i]?nucleotideSvg(letters[i]):'<b class="sequence-empty">?</b>'}</button>`).join("")}</div>
      <div class="sequence-fill-status">${filled} dari ${cfg.target.length} basa tersusun</div>
    </div>
    <div class="sequence-bank"><div class="sequence-bank-title">BANK BASA NITROGEN</div><div class="sequence-bank-cards">${cfg.options.map(ch=>`<button type="button" class="sequence-base-card" data-seq-base="${ch}">${nucleotideSvg(ch)}<b>${ch}</b></button>`).join("")}</div></div>
  </div>`;
}
function sortingCategories(){
  return {thymine:"DNA",uracil:"RNA",deoxyribose:"DNA",ribose:"RNA",double:"DNA",single:"RNA"};
}
function renderSortingStation(station,g){
  const a=getGameActivity(g,station.id),assigned=a.assigned||{},selected=a.selectedCard||"",tokenById=Object.fromEntries(station.tokens.map(t=>[t.id,t]));
  const unassigned=station.tokens.filter(t=>!assigned[t.id]);
  const renderAssigned=(category)=>Object.entries(assigned).filter(([id,value])=>value===category).map(([id])=>{
    const token=tokenById[id];return `<button type="button" class="sorting-assigned-card" data-sort-remove="${id}" title="Ketuk untuk mengembalikan kartu"><span>${tokenArt("dna",station.id,token)}</span><b>${esc(token.label)}</b><small>↶ Ubah kategori</small></button>`;
  }).join("");
  return `<div class="visual-game-panel">
    <div class="visual-game-heading"><span class="visual-game-kicker">SORTING / CLASSIFICATION</span><strong>Kelompokkan ciri yang termasuk DNA dan RNA.</strong><small>Pilih satu kartu bergambar, lalu ketuk kelompok DNA atau RNA. Kartu dapat dikembalikan jika ingin mengubah jawaban.</small></div>
    <div class="sorting-bank"><div class="sorting-bank-title">KARTU CIRI MOLEKUL (${unassigned.length} tersisa)</div><div class="sorting-card-tray">
      ${unassigned.map(t=>`<button type="button" class="sorting-card ${selected===t.id?"selected":""}" data-sort-card="${t.id}"><span class="sorting-card-art">${tokenArt("dna",station.id,t)}</span><b>${esc(t.label)}</b><small>${selected===t.id?"Terpilih · pilih kelompok":"Ketuk untuk memilih"}</small></button>`).join("")}
      ${unassigned.length===0?'<div class="sorting-all-placed">Semua kartu sudah dikelompokkan.</div>':""}
    </div></div>
    <div class="sorting-targets">
      <section class="sorting-target dna-target"><button type="button" class="sorting-target-head" data-sort-category="DNA"><span>${strandSvg("double")}</span><span><b>DNA</b><small>Ketuk untuk menempatkan kartu terpilih</small></span><strong>${Object.values(assigned).filter(x=>x==="DNA").length}</strong></button><div class="sorting-assigned-list">${renderAssigned("DNA")||'<span class="sorting-empty">Belum ada kartu</span>'}</div></section>
      <section class="sorting-target rna-target"><button type="button" class="sorting-target-head" data-sort-category="RNA"><span>${strandSvg("single")}</span><span><b>RNA</b><small>Ketuk untuk menempatkan kartu terpilih</small></span><strong>${Object.values(assigned).filter(x=>x==="RNA").length}</strong></button><div class="sorting-assigned-list">${renderAssigned("RNA")||'<span class="sorting-empty">Belum ada kartu</span>'}</div></section>
    </div>
  </div>`;
}
function alleleCardSvg(letter){
  const fill=letter==="P"?"#9c6bff":"#e7eaf0",stroke=letter==="P"?"#6c46cb":"#aab3c2",text=letter==="P"?"#fff":"#657080";
  return svgArt("0 0 84 84",`Alel ${letter}`,`<circle cx="42" cy="42" r="29" fill="${fill}" stroke="${stroke}" stroke-width="4"/><text x="42" y="53" text-anchor="middle" font-size="34" font-family="Arial" font-weight="900" fill="${text}">${letter}</text>`);
}
function gameteSvg(label){
  const a=String(label||"").split("");
  return svgArt("0 0 100 76",`Gamet ${label}`,`
    <rect x="5" y="7" width="90" height="62" rx="18" fill="#fff6e9" stroke="#efd3b0" stroke-width="2"/>
    <circle cx="34" cy="38" r="18" fill="${a[0]===a[0]?.toUpperCase()?"#8d6bdb":"#d9c9f5"}" stroke="#fff" stroke-width="3"/>
    <circle cx="67" cy="38" r="18" fill="${a[1]===a[1]?.toUpperCase()?"#e7b93e":"#dcebbf"}" stroke="#fff" stroke-width="3"/>
    <text x="34" y="44" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">${esc(a[0]||"")}</text>
    <text x="67" y="44" text-anchor="middle" font-size="18" font-weight="900" fill="#526a32">${esc(a[1]||"")}</text>
  `);
}
function punnettOptions(station){
  return station.id==="monohybrid"?["P","p"]:["RY","Ry","rY","ry"];
}
function isGameteSetCorrect(values,stationId){
  if(!Array.isArray(values)||values.some(v=>!v))return false;
  if(stationId==="monohybrid")return values.length===2&&values.slice().sort().join("")==="Pp";
  return values.length===4&&values.slice().sort().join("|")==["RY","Ry","rY","ry"].sort().join("|");
}
function orderedAlleles(a,b){
  return [a,b].sort((x,y)=>x===y?0:(x===x.toUpperCase()?-1:1)).join("");
}
function combineDihybridGametes(a,b){
  return orderedAlleles(a[0],b[0])+orderedAlleles(a[1],b[1]);
}
function phenotypeDihybrid(genotype){
  return `${genotype.slice(0,2).includes("R")?"Bulat":"Keriput"}-${genotype.slice(2,4).includes("Y")?"Kuning":"Hijau"}`;
}
function renderPunnettMatrix(station,a){
  const mono=station.id==="monohybrid",top=a.top||[],left=a.left||[],count=mono?2:4;
  const allReady=top.length===count&&left.length===count&&top.every(Boolean)&&left.every(Boolean);
  if(!allReady)return "";
  const cell=(rowGamete,colGamete)=>{
    if(mono){
      const genotype=orderedAlleles(rowGamete,colGamete),phenotype=genotype.includes("P")?"Ungu":"Putih";
      return `<div class="punnett-result-cell"><span class="punnett-result-art">${flowerSvg(genotype)}</span><b>${genotype}</b><small>${phenotype}</small></div>`;
    }
    const genotype=combineDihybridGametes(rowGamete,colGamete),phenotype=phenotypeDihybrid(genotype);
    return `<div class="punnett-result-cell"><span class="punnett-result-art">${seedSvg(genotype)}</span><b>${genotype}</b><small>${esc(phenotype)}</small></div>`;
  };
  return `<div class="punnett-result-wrap"><div class="punnett-result-title">HASIL KOMBINASI KETURUNAN</div><div class="punnett-table-scroll"><table class="visual-punnett-table"><thead><tr><th>×</th>${top.map(g=>`<th>${mono?alleleCardSvg(g):gameteSvg(g)}</th>`).join("")}</tr></thead><tbody>${left.map(r=>`<tr><th>${mono?alleleCardSvg(r):gameteSvg(r)}</th>${top.map(c=>`<td>${cell(r,c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}
function renderRatioOptions(station,a){
  const mono=station.id==="monohybrid";
  const options=mono?[
    {value:"3:1",label:"3 ungu : 1 putih",counts:[3,1]},
    {value:"1:3",label:"1 ungu : 3 putih",counts:[1,3]},
    {value:"2:2",label:"2 ungu : 2 putih",counts:[2,2]}
  ]:[
    {value:"9:3:3:1",label:"9 : 3 : 3 : 1",counts:[9,3,3,1]},
    {value:"3:1:3:1",label:"3 : 1 : 3 : 1",counts:[3,1,3,1]},
    {value:"1:1:1:1",label:"1 : 1 : 1 : 1",counts:[1,1,1,1]}
  ];
  const art=mono?[flowerSvg("PP"),flowerSvg("pp")]:[seedSvg("RrYy"),seedSvg("Rryy"),seedSvg("rrYy"),seedSvg("rryy")];
  return `<div class="punnett-ratio-section"><div class="punnett-result-title">PILIH RASIO FENOTIPE KETURUNAN</div><div class="punnett-ratio-options">${options.map(o=>`<button type="button" class="punnett-ratio-card ${a.ratio===o.value?"selected":""}" data-punnett-ratio="${o.value}"><span class="ratio-art-row">${art.map((svg,i)=>`<span>${svg}<small>${o.counts[i]}</small></span>`).join("")}</span><b>${esc(o.label)}</b></button>`).join("")}</div></div>`;
}
function renderPunnettStation(station,g){
  const a=getGameActivity(g,station.id),mono=station.id==="monohybrid",count=mono?2:4,options=punnettOptions(station),top=a.top||Array(count).fill(null),left=a.left||Array(count).fill(null);
  const active=a.activeSlot||"top:0";
  const parentSlots=(side,values,label)=>`<div class="punnett-parent-row"><div class="punnett-parent-label">${label}</div><div class="punnett-gamete-slots">${values.map((v,i)=>`<button type="button" class="punnett-gamete-slot ${active===`${side}:${i}`?"active":""} ${v?"filled":""}" data-punnett-slot="${side}" data-index="${i}"><span>${i+1}</span>${v?(mono?alleleCardSvg(v):gameteSvg(v)):'<b>?</b>'}<small>${v?esc(v):"Pilih gamet"}</small></button>`).join("")}</div></div>`;
  return `<div class="visual-game-panel">
    <div class="visual-game-heading"><span class="visual-game-kicker">INTERACTIVE PUNNETT SQUARE</span><strong>${mono?"Simulasikan persilangan monohibrid Pp × Pp":"Simulasikan persilangan dihibrid RrYy × RrYy"}</strong><small>${mono?"P dominan (bunga ungu), p resesif (bunga putih).":"R = bulat, r = keriput, Y = kuning, y = hijau. Kedua gen diasumsikan tidak terpaut."} Pilih slot gamet, lalu pilih kartu alel/gamet di bawahnya.</small></div>
    <div class="punnett-parent-visual">${mono?`<div>${flowerSvg("Pp")}<b>Induk 1 · Pp</b></div><span>×</span><div>${flowerSvg("Pp")}<b>Induk 2 · Pp</b></div>`:`<div>${seedSvg("RrYy")}<b>Induk 1 · RrYy</b></div><span>×</span><div>${seedSvg("RrYy")}<b>Induk 2 · RrYy</b></div>`}</div>
    <div class="punnett-gamete-builder">${parentSlots("top",top,"GAMET INDUK 1 · BAGIAN ATAS")}${parentSlots("left",left,"GAMET INDUK 2 · BAGIAN SAMPING")}</div>
    <div class="punnett-option-bank"><div class="sequence-bank-title">PILIH KARTU ${mono?"ALEL":"GAMET"}</div><div class="punnett-option-cards">${options.map(v=>`<button type="button" class="punnett-option-card" data-punnett-option="${v}">${mono?alleleCardSvg(v):gameteSvg(v)}<b>${v}</b></button>`).join("")}</div></div>
    ${renderPunnettMatrix(station,a)}
    ${(top.every(Boolean)&&left.every(Boolean))?renderRatioOptions(station,a):""}
  </div>`;
}
function renderVisualActivity(station,g){
  if(station.id==="packaging"||station.id==="geneallele")return renderMatchingStation(station,g);
  if(station.id==="chromosome")return renderHotspotStation(station,g);
  if(station.id==="complement"||station.id==="transcription")return renderSequenceStation(station,g);
  if(station.id==="classify")return renderSortingStation(station,g);
  if(station.id==="monohybrid"||station.id==="dihybrid")return renderPunnettStation(station,g);
  return '<div class="visual-game-panel">Aktivitas belum tersedia.</div>';
}
function renderGame(){
  const g=state.game;if(!g)return renderGameMenu();
  const set=gameSets[g.id],stations=labSpecs[g.id]||[];
  const index=Math.min(g.activeStation||0,stations.length-1),station=stations[index];
  if(!station)return renderGameResult();
  const completed=stations.filter(s=>g.stationCompleted?.[s.id]).length;
  const remaining=g.mode==="challenge"?Math.max(0,Math.ceil((g.deadline-Date.now())/1000)):Math.max(0,Math.floor((Date.now()-g.startedAt)/1000));
  const check=g.stationChecks?.[station.id],feedback=g.stationFeedback?.[station.id];
  const isStationComplete=!!g.stationCompleted?.[station.id];
  const progress=getStationProgress(g,station);
  return `${heading("VIRTUAL BIOLOGY LAB",set.title,`Pemain: ${esc(g.name)} · ${g.mode==="challenge"?"Mode tantangan":"Mode latihan"}`)}
  <div class="lab-topline"><div class="lab-progress"><strong>${completed} / ${stations.length}</strong><span>stasiun selesai</span><div class="lab-progress-track"><i style="width:${completed/stations.length*100}%"></i></div></div><div class="lab-clock"><span>${g.mode==="challenge"?"Sisa waktu":"Waktu praktikum"}</span><strong id="gameTimer">${formatTime(remaining)}</strong></div></div>
  <div class="lab-station-nav">${stations.map((s,i)=>`<span class="lab-station-step ${i===index?"active":""} ${g.stationCompleted?.[s.id]?"done":""}"><b>${i+1}</b>${esc(s.title.split("·")[1]?.trim()||s.title)}</span>`).join("")}</div>
  <section class="card lab-station-card">
    <div class="lab-station-heading"><div><span class="eyebrow">STASIUN ${index+1} DARI ${stations.length}</span><h2>${esc(station.title.split("·")[1]?.trim()||station.title)}</h2></div><span class="badge ${isStationComplete?"easy":"neutral"}">${isStationComplete?"Selesai":"Sedang dikerjakan"}</span></div>
    <p class="lab-description">${esc(station.description)}</p>
    <p class="lab-instruction"><strong>Instruksi:</strong> ${esc(station.instruction)}</p>
    ${renderVisualActivity(station,g)}
    <div class="visual-activity-progress"><span>Aktivitas benar</span><strong>${progress.correct} / ${progress.total}</strong></div>
    ${feedback?`<div class="lab-feedback ${check?.complete?"success":"warning"}"><strong>${check?.complete?"Eksperimen berhasil!":"Perlu diperbaiki"}</strong><span>${esc(feedback)}</span></div>`:""}
    ${check?.complete?`<div class="lab-output"><span>HASIL / KESIMPULAN</span><strong>${esc(station.output||"Seluruh aktivitas berhasil diselesaikan.")}</strong></div>`:""}
    <div class="lab-actions">${isStationComplete?(index<stations.length-1?`<button class="primary-btn" data-game-next-station type="button">Lanjut ke Stasiun ${index+2} →</button>`:`<button class="primary-btn" data-game-finish type="button">Selesaikan Praktikum →</button>`):`<button class="primary-btn" data-game-check="${station.id}" type="button">Periksa Hasil Praktikum</button>`}<button class="secondary-btn" data-route="game-menu" type="button">Keluar ke Menu</button></div>
  </section>`;
}
function getStationProgress(g,station){
  const a=getGameActivity(g,station.id);
  if(station.id==="packaging"||station.id==="geneallele"){
    const total=matchingPairsFor(station).length,filled=(a.matched||[]).length;
    return {total,filled,correct:filled};
  }
  if(station.id==="chromosome"){
    const total=hotspotTasks().length,filled=Math.min(a.step||0,total);
    return {total,filled,correct:filled};
  }
  if(station.id==="complement"||station.id==="transcription"){
    const cfg=sequenceConfig(station),letters=a.letters||[];
    const filled=letters.filter(Boolean).length,correct=letters.reduce((sum,v,i)=>sum+(v===cfg.target[i]?1:0),0);
    return {total:cfg.target.length,filled,correct};
  }
  if(station.id==="classify"){
    const cats=sortingCategories(),assigned=a.assigned||{},filled=Object.keys(assigned).length;
    const correct=Object.entries(assigned).filter(([id,value])=>cats[id]===value).length;
    return {total:station.tokens.length,filled,correct};
  }
  if(station.id==="monohybrid"||station.id==="dihybrid"){
    const n=station.id==="monohybrid"?2:4,top=a.top||[],left=a.left||[];
    const expected=station.id==="monohybrid"?["P","p"]:["RY","Ry","rY","ry"];
    const rowCorrect=values=>{
      if(values.length===n&&values.every(Boolean)&&isGameteSetCorrect(values,station.id))return n;
      return values.reduce((sum,v,i)=>sum+(v===expected[i]?1:0),0);
    };
    const filled=top.filter(Boolean).length+left.filter(Boolean).length+(a.ratio?1:0);
    const correct=rowCorrect(top)+rowCorrect(left)+(a.ratio===(station.id==="monohybrid"?"3:1":"9:3:3:1")?1:0);
    return {total:n*2+1,filled,correct};
  }
  return {total:station.slots?.length||1,filled:0,correct:0};
}
function getLabStats(g){
  const stations=labSpecs[g.id]||[];
  let totalSlots=0,filledSlots=0,correctSlots=0,completedStations=0;
  stations.forEach(s=>{
    const p=getStationProgress(g,s);
    totalSlots+=p.total;filledSlots+=p.filled;correctSlots+=p.correct;
    if(g.stationCompleted?.[s.id])completedStations++;
  });
  const accuracy=totalSlots?correctSlots/totalSlots:0;
  const completion=stations.length?completedStations/stations.length:0;
  const consistency=filledSlots?correctSlots/filledSlots:0;
  const efficiency=totalSlots?(filledSlots/totalSlots)*(1-Math.min(1,(g.mistakes||0)/totalSlots)):0;
  const breakdown={placement:Math.round(40*accuracy),completion:Math.round(25*completion),consistency:Math.round(20*consistency),efficiency:Math.round(15*efficiency)};
  return {totalSlots,filledSlots,correctSlots,completedStations,totalStations:stations.length,mistakes:g.mistakes||0,breakdown,score:Math.min(100,Object.values(breakdown).reduce((a,b)=>a+b,0))};
}
function renderGameResult(){
  const g=state.game;if(!g)return renderGameMenu();
  const set=gameSets[g.id],stats=getLabStats(g);
  const stations=labSpecs[g.id]||[];
  return `${heading("HASIL PRAKTIKUM","Laboratorium Selesai!",g.timedOut?"Waktu tantangan telah berakhir. Berikut hasil pekerjaanmu.":"Berikut laporan hasil praktikum yang sudah kamu kerjakan.")}
  <div class="result-hero"><div class="eyebrow">LAPORAN ${set.title.toUpperCase()}</div><h2>${esc(g.name)}</h2><div class="result-score">${stats.score}</div><p>Skor praktikum dari 100 poin</p></div>
  <div class="stat-grid" style="margin-top:15px"><div class="card stat-card"><div class="stat-value">${stats.correctSlots}/${stats.totalSlots}</div><div class="stat-label">Aktivitas benar</div></div><div class="card stat-card"><div class="stat-value">${stats.completedStations}/${stats.totalStations}</div><div class="stat-label">Stasiun selesai</div></div><div class="card stat-card"><div class="stat-value">${formatTime(g.elapsed||0)}</div><div class="stat-label">Waktu digunakan</div></div></div>
  <div class="card lab-score-card"><h3>Rincian penilaian</h3><div class="lab-score-row"><span>Ketepatan aktivitas</span><strong>${stats.breakdown.placement}/40</strong></div><div class="lab-score-row"><span>Ketuntasan stasiun</span><strong>${stats.breakdown.completion}/25</strong></div><div class="lab-score-row"><span>Konsistensi hasil eksperimen</span><strong>${stats.breakdown.consistency}/20</strong></div><div class="lab-score-row"><span>Efisiensi pengerjaan</span><strong>${stats.breakdown.efficiency}/15</strong></div><p class="muted">Jumlah koreksi saat pemeriksaan: ${stats.mistakes}. Skor dihitung dari ketepatan aktivitas visual, stasiun yang dituntaskan, konsistensi jawaban, dan efisiensi pengerjaan.</p></div>
  <div class="card lab-score-card"><h3>Rekap stasiun</h3>${stations.map((s,i)=>`<div class="lab-score-row"><span>${i+1}. ${esc(s.title.split("·")[1]?.trim()||s.title)}</span><strong>${g.stationCompleted?.[s.id]?"Selesai":"Belum selesai"}</strong></div>`).join("")}</div>
  <div class="btn-row"><button class="secondary-btn" data-route="game-menu" type="button">← Kembali ke Laboratorium IPA</button><button class="primary-btn" data-game-retry="${g.id}" type="button">Ulangi Praktikum</button></div>`;
}
function shuffleQuizOrder(previousOrder=[]){
  const order=Array.from({length:quizBank.length},(_,i)=>i);
  for(let i=order.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [order[i],order[j]]=[order[j],order[i]];
  }
  const sameAsPrevious=Array.isArray(previousOrder)&&previousOrder.length===order.length&&order.every((value,index)=>value===previousOrder[index]);
  if(sameAsPrevious&&order.length>1)[order[0],order[1]]=[order[1],order[0]];
  return order;
}
function quizQuestionsFor(qz){
  const order=Array.isArray(qz?.questionOrder)&&qz.questionOrder.length===quizBank.length
    ?qz.questionOrder
    :Array.from({length:quizBank.length},(_,i)=>i);
  return order.map(index=>quizBank[index]).filter(Boolean);
}
function quizIllustration(q,index){
  const filename=q.image||`quiz-${String(index+1).padStart(2,"0")}.png`;
  return `<div class="quiz-illustration">
    <img src="assets/images/quiz/${esc(filename)}" alt="${esc(q.imageAlt||"Ilustrasi soal quiz")}" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
    <div class="quiz-image-placeholder" hidden>
      <div class="quiz-placeholder-art" aria-hidden="true">
        <svg viewBox="0 0 120 90"><rect x="8" y="8" width="104" height="74" rx="12" fill="#fff4e6" stroke="#e7cba9" stroke-width="2"/><circle cx="42" cy="34" r="10" fill="#f4bd75"/><path d="M18 70l24-24 15 14 15-18 30 28" fill="none" stroke="#69a77e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M80 20h17M88.5 11.5v17" stroke="#f28c28" stroke-width="4" stroke-linecap="round"/></svg>
      </div>
      <strong>Placeholder ilustrasi</strong>
      <span>${esc(q.imageHint||"Tambahkan ilustrasi yang sesuai dengan cerita soal.")}</span>
      <small>Tambahkan file: <b>assets/images/quiz/${esc(filename)}</b></small>
    </div>
  </div>`;
}

function renderQuizIntro(){
  return `${heading("EVALUASI PEMBELAJARAN","Quiz Pewarisan Sifat","Kerjakan 20 soal berbasis cerita, data, dan penalaran. Setiap peserta memperoleh urutan soal yang diacak saat memulai sesi.")}
  <div class="card form-card">
    <div class="field-group"><label for="quizName">Nama lengkap siswa</label><input id="quizName" class="text-input" placeholder="Masukkan nama lengkap" value="${esc(state.quiz?.name||"")}"></div>
    <div class="stat-grid" style="margin:18px 0"><div class="card stat-card"><div class="stat-value">${quizBank.length}</div><div class="stat-label">Jumlah soal</div></div><div class="card stat-card"><div class="stat-value">20</div><div class="stat-label">Menit</div></div><div class="card stat-card"><div class="stat-value">100</div><div class="stat-label">Skor maksimal</div></div></div>
    <div class="prototype-note"><strong>Petunjuk:</strong><br>• Baca cerita dan informasi pada setiap soal sebelum menjawab.<br>• Gunakan data dalam cerita untuk menentukan jawaban paling logis.<br>• Setiap jawaban benar bernilai 5 poin.<br>• Urutan soal diacak untuk setiap sesi peserta.<br>• Kamu dapat berpindah nomor soal sebelum mengumpulkan jawaban.<br>• Quiz otomatis dikumpulkan ketika waktu habis.<br>• Pembahasan ditampilkan setelah quiz selesai.</div>
    <button class="primary-btn" style="width:100%;margin-top:18px" data-quiz-start type="button">MULAI QUIZ →</button>
  </div>`;
}
function formatTime(seconds){
  const s=Math.max(0,Math.floor(seconds));return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}
function renderQuiz(){
  const qz=state.quiz;if(!qz)return renderQuizIntro();
  const questions=quizQuestionsFor(qz);
  const i=qz.index||0,q=questions[i],remaining=Math.max(0,Math.ceil((qz.deadline-Date.now())/1000));
  const answered=qz.answers.filter(v=>v!==null).length;
  return `${heading("QUIZ PEWARISAN SIFAT",`Soal ${i+1} dari ${questions.length}`,`Peserta: ${esc(qz.name)}`)}
  <div class="quiz-topline"><span class="timer-pill ${remaining<=120?"warning":""}" id="quizTimer">◷ ${formatTime(remaining)}</span><span class="badge neutral">${q.level}</span><span class="progress-label">${answered}/${questions.length} dijawab</span></div>
  <div class="card quiz-question">
    <div class="quiz-nav-grid">${questions.map((_,n)=>`<button class="quiz-number ${qz.answers[n]!==null?"answered":""} ${n===i?"current":""}" data-quiz-jump="${n}" type="button" aria-label="Ke soal ${n+1}">${n+1}</button>`).join("")}</div>
    <div class="quiz-context-layout">
      ${quizIllustration(q,i)}
      <div class="scenario">${esc(q.scenario)}</div>
    </div>
    <h2>${esc(q.stem)}</h2>
    <div class="question-options">${q.options.map((o,n)=>`<button class="option-btn ${qz.answers[i]===n?"selected":""}" data-quiz-option="${n}" type="button">${String.fromCharCode(65+n)}. ${esc(o)}</button>`).join("")}</div>
    <div class="screen-nav"><button class="secondary-btn" data-quiz-prev type="button" ${i===0?"disabled":""}>← Sebelumnya</button><button class="primary-btn nav-next" data-quiz-next type="button">${i===questions.length-1?"Periksa & Kumpulkan":"Selanjutnya →"}</button></div>
    <div class="prototype-note">Pilih nomor pada kotak di atas untuk berpindah soal. Jawaban tersimpan selama sesi aktif. Jika ilustrasi belum tersedia, area gambar menampilkan placeholder beserta nama file yang perlu ditambahkan.</div>
  </div>`;
}
function renderQuizResult(){
  const qz=state.quiz;if(!qz)return renderQuizIntro();
  const questions=quizQuestionsFor(qz);
  const correct=questions.reduce((sum,q,i)=>sum+(qz.answers[i]===q.answer?1:0),0);
  const score=correct*5;
  const elapsed=Math.min(1200,Math.max(0,Math.floor((qz.finishedAt-qz.startedAt)/1000)));
  const review=questions.map((q,i)=>{
    const a=qz.answers[i],ok=a===q.answer;
    return `<article class="card review-item ${ok?"correct-review":"wrong-review"}"><span class="badge ${ok?"easy":"hard"}">${ok?"Benar":"Belum tepat"} · ${q.level}</span><h3>${i+1}. ${esc(q.stem)}</h3><p><strong>Jawaban kamu:</strong> ${a===null?"Tidak dijawab":esc(q.options[a])}</p><p><strong>Kunci jawaban:</strong> ${esc(q.options[q.answer])}</p><p>${esc(q.explanation)}</p></article>`;
  }).join("");
  return `${heading("HASIL EVALUASI","Quiz Selesai!","Berikut nilai dan pembahasan jawaban kamu.")}
  <div class="result-hero"><div class="eyebrow">HASIL QUIZ PEWARISAN SIFAT</div><h2>${esc(qz.name)}</h2><div class="result-score">${score}</div><p>Nilai akhir dari 100</p></div>
  <div class="stat-grid" style="margin-top:15px"><div class="card stat-card"><div class="stat-value">${correct}</div><div class="stat-label">Benar</div></div><div class="card stat-card"><div class="stat-value">${questions.length-correct}</div><div class="stat-label">Salah / kosong</div></div><div class="card stat-card"><div class="stat-value">${formatTime(elapsed)}</div><div class="stat-label">Waktu digunakan</div></div></div>
  <div class="btn-row"><button class="secondary-btn" data-export-xlsx type="button">⬇ Ekspor Excel (.xlsx)</button><button class="primary-btn" data-quiz-retry type="button">Ulangi Quiz</button></div>
  <h2 style="margin-top:28px">Pembahasan ${questions.length} Soal</h2><div class="review-list">${review}</div>`;
}

function render(){
  const r=state.route||{screen:"home",index:0};
  let html="";
  switch(r.screen){
    case "home":html=renderHome();break;
    case "apersepsi":html=renderApersepsi();break;
    case "tujuan":html=renderObjectives();break;
    case "material":html=renderMaterial();break;
    case "game-menu":html=renderGameMenu();break;
    case "game":html=renderGame();break;
    case "game-result":html=renderGameResult();break;
    case "quiz-intro":html=renderQuizIntro();break;
    case "quiz":html=renderQuiz();break;
    case "quiz-result":html=renderQuizResult();break;
    case "profile":html=renderDeveloperProfile();break;
    default:html=renderHome();state.route={screen:"home",index:0};
  }
  appView.innerHTML=html;
  progressFill.style.width=`${progressPercent()}%`;
  $$(".menu-link").forEach(b=>{
    const active=b.dataset.route===r.screen||(r.screen==="material"&&b.dataset.route==="material"&&Number(b.dataset.index)===r.index);
    b.classList.toggle("active",active);
  });
  if(r.screen==="quiz")startQuizClock();
  else stopQuizClock();
  if(r.screen==="game")startGameClock();
  else stopGameClock();
  if(r.screen==="profile")startProfileSlideshow();
  else stopProfileSlideshow();
}

function setFeedback(message,ok){
  const box=$("#activityFeedback");if(box)box.innerHTML=`<div class="feedback ${ok?"success":"try-again"}">${message}</div>`;
}
function normalizeSeq(s){return String(s||"").toUpperCase().replace(/[^A-Z]/g,"");}
function getGametesMono(genotype){return genotype.split("");}
function renderPunnettMono(a,b){
  const ga=getGametesMono(a),gb=getGametesMono(b);
  const rows=gb.map(y=>ga.map(x=>x+y));
  const all=rows.flat();
  const counts={};all.forEach(x=>{const key=x.split("").sort().join("");counts[key]=(counts[key]||0)+1;});
  const dominant=all.filter(x=>x.includes("P")).length, recessive=all.length-dominant;
  return `<div class="data-table-wrap"><table class="data-table"><tr><th>×</th>${ga.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map((row,i)=>`<tr><th>${gb[i]}</th>${row.map(x=>`<td><strong>${x}</strong><br><small>${x.includes("P")?"Ungu":"Putih"}</small></td>`).join("")}</tr>`).join("")}</table></div><p><strong>Rasio genotipe:</strong> ${Object.entries(counts).map(([k,v])=>`${v} ${k}`).join(" : ")}.</p><p><strong>Rasio fenotipe:</strong> ${dominant} ungu : ${recessive} putih.</p>`;
}
function gametesDihybrid(g){return ["RY","Ry","rY","ry"];}
function renderPunnettDihybrid(){
  const gs=gametesDihybrid();
  const cells=gs.map(a=>gs.map(b=>{
    const r=[a[0],b[0]].sort().join(""),y=[a[1],b[1]].sort().join("");
    const genotype=r+y;const phenotype=(genotype.includes("R")?"Bulat":"Keriput")+" "+(genotype.includes("Y")?"Kuning":"Hijau");
    return {genotype,phenotype};
  }));
  return `<div class="data-table-wrap"><table class="data-table"><tr><th>×</th>${gs.map(x=>`<th>${x}</th>`).join("")}</tr>${cells.map((row,i)=>`<tr><th>${gs[i]}</th>${row.map(c=>`<td><strong>${c.genotype}</strong><br><small>${c.phenotype}</small></td>`).join("")}</tr>`).join("")}</table></div><p><strong>Rasio fenotipe:</strong> 9 bulat kuning : 3 bulat hijau : 3 keriput kuning : 1 keriput hijau.</p>`;
}
function parseABO(g){
  if(g==="IAIA")return ["IA","IA"];if(g==="IBIB")return ["IB","IB"];if(g==="IAIB")return ["IA","IB"];
  if(g==="IAi")return ["IA","i"];if(g==="IBi")return ["IB","i"];return ["i","i"];
}
function bloodType(a,b){
  if((a==="IA"&&b==="IB")||(a==="IB"&&b==="IA"))return "AB";
  if(a==="IA"||b==="IA")return "A";
  if(a==="IB"||b==="IB")return "B";
  return "O";
}

function startGame(id,nameOverride="",modeOverride=""){
  const name=(nameOverride||$("#gamePlayerName")?.value||state.game?.name||"").trim();
  if(!name){alert("Masukkan nama pemain terlebih dahulu.");$("#gamePlayerName")?.focus();return;}
  const set=gameSets[id];
  const mode=modeOverride||$("#gameMode")?.value||state.game?.mode||"practice";
  const startedAt=Date.now();
  state.game={id,name,mode,score:0,activeStation:0,placements:{},stationChecks:{},stationCompleted:{},stationFeedback:{},activityState:{},mistakes:0,attempts:{},startedAt,deadline:mode==="challenge"?startedAt+set.duration*1000:null,elapsed:0,timedOut:false};
  state.route={screen:"game",index:0};persist();render();
}
function startGameClock(){
  stopGameClock();
  if(!state.game||state.route.screen!=="game")return;
  gameTimerHandle=setInterval(()=>{
    if(!state.game)return;
    const g=state.game;
    if(g.mode==="challenge"){
      const remaining=Math.max(0,Math.ceil((g.deadline-Date.now())/1000));
      const el=$("#gameTimer");if(el)el.textContent=formatTime(remaining);
      if(remaining<=0){finishGame(true);return;}
    }else{
      const elapsed=Math.max(0,Math.floor((Date.now()-g.startedAt)/1000));
      const el=$("#gameTimer");if(el)el.textContent=formatTime(elapsed);
      g.elapsed=elapsed;
    }
    if(Date.now()-(g.lastPersistAt||0)>5000){g.lastPersistAt=Date.now();persist();}
  },500);
}
function stopGameClock(){if(gameTimerHandle){clearInterval(gameTimerHandle);gameTimerHandle=null;}}
function clearStationCheck(stationId){
  const g=state.game;if(!g)return;
  delete g.stationChecks[stationId];delete g.stationCompleted[stationId];
}
function handleMatchingChoice(stationId,side,id){
  const g=state.game,station=(labSpecs[g?.id]||[]).find(s=>s.id===stationId);
  if(!g||!station)return;
  const a=getGameActivity(g,stationId),matched=new Set(a.matched||[]);
  if(matched.has(id))return;
  if(side==="image")a.selectedImage=id;else a.selectedDefinition=id;
  if(a.selectedImage&&a.selectedDefinition){
    if(a.selectedImage===a.selectedDefinition){
      a.matched=[...(a.matched||[]),id];
      a.feedback="Pasangan tepat! Gambar dan definisi berhasil dicocokkan.";
    }else{
      g.mistakes=(g.mistakes||0)+1;
      a.feedback="Belum cocok. Perhatikan kembali bentuk dan fungsi komponen biologis tersebut.";
    }
    a.selectedImage=null;a.selectedDefinition=null;
  }else{
    a.feedback=side==="image"?"Gambar dipilih. Sekarang pilih definisi yang sesuai.":"Definisi dipilih. Sekarang pilih gambar yang sesuai.";
  }
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function handleHotspotChoice(stationId,id){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId),tasks=hotspotTasks(),step=a.step||0;
  if(step>=tasks.length)return;
  if(id===tasks[step].id){
    a.step=step+1;a.feedback=`Benar! ${tasks[step].name} berhasil ditemukan pada ilustrasi kromosom.`;
  }else{
    g.mistakes=(g.mistakes||0)+1;
    a.feedback="Lokasi belum tepat. Perhatikan bentuk dan letak bagian kromosom, lalu coba lagi.";
  }
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function handleSequenceBase(stationId,letter){
  const g=state.game,station=(labSpecs[g?.id]||[]).find(s=>s.id===stationId);if(!g||!station)return;
  const a=getGameActivity(g,stationId),cfg=sequenceConfig(station);
  a.letters=a.letters||Array(cfg.target.length).fill("");
  const index=a.letters.findIndex(v=>!v);
  if(index<0){a.feedback="Semua posisi sudah terisi. Ketuk salah satu posisi untuk mengubahnya.";g.stationFeedback[stationId]=a.feedback;persist();render();return;}
  a.letters[index]=letter;a.checked=false;a.feedback=`Basa ${letter} ditempatkan pada posisi ${index+1}.`;
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function clearSequenceSlot(stationId,index){
  const g=state.game,station=(labSpecs[g?.id]||[]).find(s=>s.id===stationId);if(!g||!station)return;
  const a=getGameActivity(g,stationId),cfg=sequenceConfig(station);
  a.letters=a.letters||Array(cfg.target.length).fill("");a.letters[index]="";a.checked=false;
  a.feedback="Posisi dikosongkan. Pilih basa nitrogen yang benar.";clearStationCheck(stationId);
  g.stationFeedback[stationId]=a.feedback;persist();render();
}
function handleSortingCard(stationId,id){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId);
  if(a.assigned?.[id])return;
  a.selectedCard=a.selectedCard===id?null:id;
  a.feedback=a.selectedCard?"Kartu dipilih. Sekarang tentukan apakah ciri tersebut termasuk DNA atau RNA.":"Pilihan kartu dibatalkan.";
  g.stationFeedback[stationId]=a.feedback;persist();render();
}
function handleSortingCategory(stationId,category){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId),id=a.selectedCard;if(!id){a.feedback="Pilih salah satu kartu ciri terlebih dahulu.";g.stationFeedback[stationId]=a.feedback;persist();render();return;}
  a.assigned=a.assigned||{};
  const correct=sortingCategories()[id]===category;
  a.assigned[id]=category;a.selectedCard=null;
  if(!correct)g.mistakes=(g.mistakes||0)+1;
  a.feedback=correct?`Tepat! Kartu berhasil dimasukkan ke kelompok ${category}.`:`Kartu ditempatkan pada ${category}, tetapi perlu ditinjau kembali. Kamu masih dapat memindahkannya.`;
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function removeSortingCard(stationId,id){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId);if(!a.assigned?.[id])return;
  delete a.assigned[id];a.selectedCard=id;a.feedback="Kartu dikembalikan ke bank. Pilih kelompok yang tepat.";
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function setPunnettSlot(stationId,side,index){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId);a.activeSlot=`${side}:${index}`;clearStationCheck(stationId);
  a.feedback="Slot dipilih. Sekarang ketuk kartu alel atau gamet yang sesuai.";
  g.stationFeedback[stationId]=a.feedback;persist();render();
}
function choosePunnettOption(stationId,value){
  const g=state.game,station=(labSpecs[g?.id]||[]).find(s=>s.id===stationId);if(!g||!station)return;
  const a=getGameActivity(g,stationId),n=stationId==="monohybrid"?2:4;
  a.top=a.top||Array(n).fill(null);a.left=a.left||Array(n).fill(null);
  let active=a.activeSlot;
  if(!active){
    let i=a.top.findIndex(v=>!v);if(i>=0)active=`top:${i}`;
    else{i=a.left.findIndex(v=>!v);if(i>=0)active=`left:${i}`;}
  }
  if(!active){a.feedback="Semua slot gamet sudah terisi. Ketuk slot untuk mengganti isinya.";g.stationFeedback[stationId]=a.feedback;persist();render();return;}
  const [side,indexText]=active.split(":"),index=Number(indexText);
  if(!["top","left"].includes(side)||!Number.isInteger(index)||index<0||index>=n)return;
  a[side][index]=value;
  let next=a[side].findIndex(v=>!v);
  if(next>=0)a.activeSlot=`${side}:${next}`;
  else{
    const other=side==="top"?"left":"top";next=a[other].findIndex(v=>!v);
    a.activeSlot=next>=0?`${other}:${next}`:null;
  }
  a.feedback=`Gamet ${value} ditempatkan pada ${side==="top"?"baris atas":"kolom samping"}.`;
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function choosePunnettRatio(stationId,value){
  const g=state.game;if(!g)return;
  const a=getGameActivity(g,stationId);a.ratio=value;a.feedback=`Rasio fenotipe ${value} dipilih. Periksa kembali hasil persilangan.`;
  clearStationCheck(stationId);g.stationFeedback[stationId]=a.feedback;persist();render();
}
function checkGameStation(stationId){
  const g=state.game;if(!g)return;
  const station=(labSpecs[g.id]||[]).find(s=>s.id===stationId);if(!station)return;
  const a=getGameActivity(g,stationId),progress=getStationProgress(g,station),total=progress.total,filled=progress.filled;
  let complete=false,message="";
  if(stationId==="packaging"||stationId==="geneallele"){
    const pairs=matchingPairsFor(station);
    complete=(a.matched||[]).length===pairs.length;
    message=complete?`Semua ${pairs.length} pasangan gambar dan definisi berhasil dicocokkan.`:`Baru ${(a.matched||[]).length} dari ${pairs.length} pasangan yang benar. Cocokkan semua kartu terlebih dahulu.`;
  }else if(stationId==="chromosome"){
    complete=(a.step||0)===hotspotTasks().length;
    message=complete?"Semua bagian kromosom berhasil diidentifikasi.":"Selesaikan identifikasi telomer, sentromer, dan kromatid terlebih dahulu.";
  }else if(stationId==="complement"||stationId==="transcription"){
    const cfg=sequenceConfig(station),letters=a.letters||[];
    complete=letters.length===cfg.target.length&&letters.every(Boolean)&&letters.every((v,i)=>v===cfg.target[i]);
    a.checked=true;
    if(letters.filter(Boolean).length<cfg.target.length)message=`Urutan belum lengkap. Baru ${letters.filter(Boolean).length} dari ${cfg.target.length} posisi terisi.`;
    else if(complete)message=`Urutan tepat: ${cfg.target.join("")}. Semua basa nitrogen berada pada posisi yang benar.`;
    else{g.mistakes=(g.mistakes||0)+1;message="Masih ada basa yang tidak sesuai. Periksa aturan pasangan basa, lalu ubah posisi yang keliru.";}
  }else if(stationId==="classify"){
    const assigned=a.assigned||{},cats=sortingCategories();
    complete=Object.keys(assigned).length===station.tokens.length&&station.tokens.every(t=>assigned[t.id]===cats[t.id]);
    message=complete?"Semua ciri berhasil dikelompokkan dengan benar ke dalam DNA dan RNA.":`${progress.correct} dari ${total} kartu sudah berada pada kelompok yang tepat. Periksa kartu yang masih salah atau belum dikelompokkan.`;
  }else if(stationId==="monohybrid"||stationId==="dihybrid"){
    const expectedRatio=stationId==="monohybrid"?"3:1":"9:3:3:1",n=stationId==="monohybrid"?2:4;
    a.top=a.top||[];a.left=a.left||[];
    const gametesReady=a.top.length===n&&a.left.length===n&&a.top.every(Boolean)&&a.left.every(Boolean);
    const gametesCorrect=isGameteSetCorrect(a.top,stationId)&&isGameteSetCorrect(a.left,stationId);
    complete=gametesReady&&gametesCorrect&&a.ratio===expectedRatio;
    if(!gametesReady)message="Lengkapi seluruh gamet pada bagian atas dan samping tabel Punnett.";
    else if(!gametesCorrect){g.mistakes=(g.mistakes||0)+1;message="Kombinasi gamet belum tepat. Pastikan setiap induk menghasilkan seluruh jenis gamet yang mungkin.";}
    else if(a.ratio!==expectedRatio){g.mistakes=(g.mistakes||0)+1;message=`Gamet sudah benar, tetapi rasio fenotipe belum tepat. Hitung kembali hasil pada tabel Punnett.`;}
    else message=`Persilangan benar. Rasio fenotipe keturunan adalah ${expectedRatio}.`;
  }
  g.attempts[stationId]=(g.attempts[stationId]||0)+1;
  g.stationChecks[stationId]={correct:progress.correct,filled,total,complete};
  g.stationCompleted[stationId]=complete;
  g.stationFeedback[stationId]=message;
  persist();render();
}
function nextGameStation(){
  const g=state.game;if(!g)return;
  const stations=labSpecs[g.id]||[],current=stations[g.activeStation||0];
  if(!current||!g.stationCompleted[current.id])return;
  if(g.activeStation<stations.length-1){g.activeStation++;g.selectedToken=null;persist();render();}
  else finishGame(false);
}
function finishGame(timedOut=false){
  if(!state.game)return;
  stopGameClock();
  const g=state.game;
  g.timedOut=!!timedOut;
  g.elapsed=g.mode==="challenge"?Math.max(0,Math.min(gameSets[g.id].duration,Math.floor((Date.now()-g.startedAt)/1000))):Math.max(0,Math.floor((Date.now()-g.startedAt)/1000));
  const stats=getLabStats(g);g.score=stats.score;
  state.route={screen:"game-result",index:0};persist();render();
}
function startQuiz(){
  const name=($("#quizName")?.value||"").trim();
  if(!name){alert("Masukkan nama lengkap siswa terlebih dahulu.");$("#quizName")?.focus();return;}
  const questionOrder=shuffleQuizOrder(state.lastQuizOrder||[]);
  state.lastQuizOrder=questionOrder.slice();
  state.quiz={name,questionOrder,answers:Array(questionOrder.length).fill(null),index:0,startedAt:Date.now(),deadline:Date.now()+20*60*1000,finishedAt:null};
  state.route={screen:"quiz",index:0};persist();render();
}
function startQuizClock(){
  stopQuizClock();
  if(!state.quiz||state.route.screen!=="quiz")return;
  quizTimerHandle=setInterval(()=>{
    const qz=state.quiz;if(!qz)return;
    const remaining=Math.max(0,Math.ceil((qz.deadline-Date.now())/1000));
    const el=$("#quizTimer");if(el){el.textContent=`◷ ${formatTime(remaining)}`;el.classList.toggle("warning",remaining<=120);}
    persist();
    if(remaining<=0)finishQuiz(true);
  },500);
}
function stopQuizClock(){if(quizTimerHandle){clearInterval(quizTimerHandle);quizTimerHandle=null;}}
function finishQuiz(auto=false){
  if(!state.quiz||state.route.screen==="quiz-result")return;
  stopQuizClock();state.quiz.finishedAt=Date.now();state.quiz.autoSubmitted=auto;
  state.route={screen:"quiz-result",index:0};persist();render();window.scrollTo({top:0,behavior:"smooth"});
}
function exportXlsx(){
  const qz=state.quiz;if(!qz)return;
  const questions=quizQuestionsFor(qz);
  const correct=questions.reduce((sum,q,i)=>sum+(qz.answers[i]===q.answer?1:0),0);
  const score=correct*5;const elapsed=Math.min(1200,Math.max(0,Math.floor((qz.finishedAt-qz.startedAt)/1000)));
  const summary=[
    ["HASIL QUIZ PEWARISAN SIFAT"],["Nama siswa",qz.name],["Nilai",score],["Jawaban benar",correct],["Jawaban salah/kosong",questions.length-correct],["Waktu pengerjaan",formatTime(elapsed)],["Status",qz.autoSubmitted?"Dikumpulkan otomatis karena waktu habis":"Dikumpulkan oleh siswa"]
  ];
  const details=[["No","Level","Pertanyaan","Jawaban siswa","Kunci jawaban","Status","Pembahasan"]];
  questions.forEach((q,i)=>{const a=qz.answers[i];details.push([i+1,q.level,q.stem,a===null?"Tidak dijawab":q.options[a],q.options[q.answer],a===q.answer?"Benar":"Salah/kosong",q.explanation]);});
  const blob=makeXlsx([["Rekap Nilai",summary],["Detail Jawaban",details]]);
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`Hasil_Quiz_Pewarisan_Sifat_${safeFilename(qz.name)}.xlsx`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function safeFilename(s){return String(s).normalize("NFKD").replace(/[^a-zA-Z0-9_-]+/g,"_").replace(/^_+|_+$/g,"")||"Siswa";}
function xmlEsc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}
function colName(n){let s="";while(n>0){let r=(n-1)%26;s=String.fromCharCode(65+r)+s;n=Math.floor((n-1)/26);}return s;}
function sheetXml(rows){
  const body=rows.map((row,ri)=>`<row r="${ri+1}">${row.map((v,ci)=>{
    const ref=`${colName(ci+1)}${ri+1}`;
    if(typeof v==="number")return `<c r="${ref}"><v>${v}</v></c>`;
    return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(v)}</t></is></c>`;
  }).join("")}</row>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${body}</sheetData></worksheet>`;
}
function crc32(bytes){
  let crc=-1;for(let i=0;i<bytes.length;i++){crc^=bytes[i];for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xEDB88320:0);}
  return (crc^-1)>>>0;
}
function u16(n){return [n&255,(n>>>8)&255];}function u32(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];}
function concatBytes(parts){let total=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(total),off=0;for(const p of parts){out.set(p,off);off+=p.length;}return out;}
function zipStore(files){
  const enc=new TextEncoder(),locals=[],centrals=[];let offset=0;
  const now=new Date(),dosTime=(now.getHours()<<11)|(now.getMinutes()<<5)|Math.floor(now.getSeconds()/2),dosDate=((Math.max(1980,now.getFullYear())-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
  for(const file of files){
    const name=enc.encode(file.name),data=typeof file.data==="string"?enc.encode(file.data):file.data,crc=crc32(data);
    const local=concatBytes([new Uint8Array([0x50,0x4b,0x03,0x04,...u16(20),...u16(0),...u16(0),...u16(dosTime),...u16(dosDate),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0)]),name,data]);
    locals.push(local);
    const central=concatBytes([new Uint8Array([0x50,0x4b,0x01,0x02,...u16(20),...u16(20),...u16(0),...u16(0),...u16(dosTime),...u16(dosDate),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset)]),name]);
    centrals.push(central);offset+=local.length;
  }
  const centralBytes=concatBytes(centrals),localBytes=concatBytes(locals);
  const end=new Uint8Array([0x50,0x4b,0x05,0x06,...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(centralBytes.length),...u32(localBytes.length),...u16(0)]);
  return new Blob([localBytes,centralBytes,end],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}
function makeXlsx(sheets){
  const files=[
    {name:"[Content_Types].xml",data:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`},
    {name:"_rels/.rels",data:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},
    {name:"xl/workbook.xml",data:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s,i)=>`<sheet name="${xmlEsc(s[0])}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join("")}</sheets></workbook>`},
    {name:"xl/_rels/workbook.xml.rels",data:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join("")}</Relationships>`}
  ];
  sheets.forEach((s,i)=>files.push({name:`xl/worksheets/sheet${i+1}.xml`,data:sheetXml(s[1])}));
  return zipStore(files);
}

function closeMenu(){menuPanel.hidden=true;menuBackdrop.hidden=true;menuToggle.setAttribute("aria-expanded","false");}
function openMenu(){menuPanel.hidden=false;menuBackdrop.hidden=false;menuToggle.setAttribute("aria-expanded","true");}

document.addEventListener("click",event=>{
  const routeBtn=event.target.closest("[data-route]");
  if(routeBtn){routeTo(routeBtn.dataset.route,Number(routeBtn.dataset.index||0));return;}
  const action=event.target.closest("[data-action]");
  if(action){
    switch(action.dataset.action){
      case "back-home":routeTo("home");break;
      case "next-objectives":routeTo("tujuan");break;
      case "back-apersepsi":routeTo("apersepsi");break;
      case "first-material":routeTo("material",0);break;
      case "material-prev":if(state.route.index===0)routeTo("tujuan");else routeTo("material",state.route.index-1);break;
      case "material-next":if(state.route.index<materials.length-1)routeTo("material",state.route.index+1);else routeTo("game-menu");break;
    }return;
  }
  if(event.target.closest("[data-profile-prev]")){
    state.profileIndex=(Number(state.profileIndex||0)-1+developerProfiles.length)%developerProfiles.length;
    persist();render();return;
  }
  if(event.target.closest("[data-profile-next]")){
    state.profileIndex=(Number(state.profileIndex||0)+1)%developerProfiles.length;
    persist();render();return;
  }
  const profileDot=event.target.closest("[data-profile-dot]");
  if(profileDot){
    state.profileIndex=Number(profileDot.dataset.profileDot)||0;
    persist();render();return;
  }
  if(event.target.closest("[data-profile-toggle]")){
    state.profilePaused=!state.profilePaused;
    persist();render();return;
  }
  const ap=event.target.closest("[data-apersepsi]");
  if(ap){
    const fb=$("#apersepsiFeedback");const correct=ap.dataset.apersepsi==="B";
    $$(".answer-btn[data-apersepsi]").forEach(b=>{b.classList.remove("correct","incorrect");if(b.dataset.apersepsi==="B"&&correct)b.classList.add("correct");});
    if(correct){state.apersepsiCorrect=true;persist();ap.classList.add("correct");fb.innerHTML='<div class="feedback success">Benar! Anak mewarisi informasi genetik dari kedua orang tuanya. Informasi tersebut berperan dalam membentuk berbagai karakteristik individu.</div>';}
    else{ap.classList.add("incorrect");fb.innerHTML='<div class="feedback try-again">Belum tepat. Coba pikirkan apakah anak selalu memiliki seluruh sifat yang sama persis dengan orang tuanya.</div>';}
    return;
  }
  const check=event.target.closest("[data-activity-check]");
  if(check){checkActivity(check.dataset.activityCheck);return;}
  const gene=event.target.closest("[data-gene-choice]");
  if(gene){setFeedback(gene.dataset.geneChoice==="B"?"Tepat! Gen merupakan bagian DNA yang membawa informasi biologis tertentu.":"Belum tepat. Ingat, gen merupakan segmen dari DNA.",gene.dataset.geneChoice==="B");return;}
  const rrna=event.target.closest("[data-rrna-choice]");
  if(rrna){setFeedback(rrna.dataset.rrnaChoice==="B"?"Benar! rRNA menjadi komponen utama ribosom dan membantu translasi.":"Belum tepat. tRNA membawa asam amino, sedangkan rRNA merupakan bagian ribosom.",rrna.dataset.rrnaChoice==="B");return;}
  if(event.target.closest("[data-mono-calc]")){
    const a=$("#monoA").value,b=$("#monoB").value;if(!a||!b){setFeedback("Pilih genotipe kedua induk terlebih dahulu.",false);return;}
    $("#monoResult").innerHTML=renderPunnettMono(a,b);setFeedback("Tabel persilangan berhasil dibuat. Amati kombinasi gamet dan keturunannya.",true);return;
  }
  if(event.target.closest("[data-dihybrid-calc]")){$("#dihybridResult").innerHTML=renderPunnettDihybrid();setFeedback("Tabel Punnett dihibrid berhasil dibuat.",true);return;}
  if(event.target.closest("[data-abo-calc]")){
    const a=$("#aboA").value,b=$("#aboB").value;if(!a||!b){setFeedback("Pilih genotipe kedua orang tua terlebih dahulu.",false);return;}
    const ga=parseABO(a),gb=parseABO(b),out={};
    ga.forEach(x=>gb.forEach(y=>{const bt=bloodType(x,y);const genotype=[x,y].sort().join("");out[genotype]={blood:bt,count:(out[genotype]?.count||0)+1};}));
    const bloodCounts={};Object.values(out).forEach(x=>bloodCounts[x.blood]=(bloodCounts[x.blood]||0)+x.count);
    $("#aboResult").innerHTML=`<div class="data-table-wrap"><table class="data-table"><tr><th>Golongan darah</th><th>Kemungkinan</th></tr>${Object.entries(bloodCounts).map(([k,v])=>`<tr><td>${k}</td><td>${v}/4 (${v*25}%)</td></tr>`).join("")}</table></div>`;
    setFeedback("Kemungkinan golongan darah keturunan berhasil dihitung.",true);return;
  }
  if(state.route.screen==="game"){
    const activeGameStation=(labSpecs[state.game.id]||[])[state.game.activeStation||0];
    const stationId=activeGameStation?.id;
    if(!stationId)return;
    const matchImage=event.target.closest("[data-match-image]");
    if(matchImage){handleMatchingChoice(stationId,"image",matchImage.dataset.matchImage);return;}
    const matchDefinition=event.target.closest("[data-match-definition]");
    if(matchDefinition){handleMatchingChoice(stationId,"definition",matchDefinition.dataset.matchDefinition);return;}
    const hotspot=event.target.closest("[data-hotspot]");
    if(hotspot){handleHotspotChoice(stationId,hotspot.dataset.hotspot);return;}
    const sequenceBase=event.target.closest("[data-seq-base]");
    if(sequenceBase){handleSequenceBase(stationId,sequenceBase.dataset.seqBase);return;}
    const sequenceSlot=event.target.closest("[data-seq-slot]");
    if(sequenceSlot){clearSequenceSlot(stationId,Number(sequenceSlot.dataset.seqSlot));return;}
    const sortCard=event.target.closest("[data-sort-card]");
    if(sortCard){handleSortingCard(stationId,sortCard.dataset.sortCard);return;}
    const sortCategory=event.target.closest("[data-sort-category]");
    if(sortCategory){handleSortingCategory(stationId,sortCategory.dataset.sortCategory);return;}
    const sortRemove=event.target.closest("[data-sort-remove]");
    if(sortRemove){removeSortingCard(stationId,sortRemove.dataset.sortRemove);return;}
    const punnettSlot=event.target.closest("[data-punnett-slot]");
    if(punnettSlot){setPunnettSlot(stationId,punnettSlot.dataset.punnettSlot,Number(punnettSlot.dataset.index));return;}
    const punnettOption=event.target.closest("[data-punnett-option]");
    if(punnettOption){choosePunnettOption(stationId,punnettOption.dataset.punnettOption);return;}
    const punnettRatio=event.target.closest("[data-punnett-ratio]");
    if(punnettRatio){choosePunnettRatio(stationId,punnettRatio.dataset.punnettRatio);return;}
  }
  const gameCheck=event.target.closest("[data-game-check]");
  if(gameCheck){checkGameStation(gameCheck.dataset.gameCheck);return;}
  if(event.target.closest("[data-game-next-station]")){nextGameStation();return;}
  if(event.target.closest("[data-game-finish]")){finishGame(false);return;}
  const gameStart=event.target.closest("[data-game-start]");
  if(gameStart){startGame(gameStart.dataset.gameStart);return;}
  const retry=event.target.closest("[data-game-retry]");
  if(retry){const previousName=state.game?.name||"",previousMode=state.game?.mode||"practice";startGame(retry.dataset.gameRetry,previousName,previousMode);return;}
  if(event.target.closest("[data-quiz-start]")){startQuiz();return;}
  const quizOption=event.target.closest("[data-quiz-option]");
  if(quizOption&&state.quiz){state.quiz.answers[state.quiz.index]=Number(quizOption.dataset.quizOption);persist();$$("[data-quiz-option]").forEach(b=>b.classList.toggle("selected",b===quizOption));$$(".quiz-number").forEach((b,i)=>b.classList.toggle("answered",state.quiz.answers[i]!==null));return;}
  const jump=event.target.closest("[data-quiz-jump]");
  if(jump&&state.quiz){state.quiz.index=Number(jump.dataset.quizJump);persist();render();return;}
  if(event.target.closest("[data-quiz-prev]")&&state.quiz){state.quiz.index=Math.max(0,state.quiz.index-1);persist();render();return;}
  if(event.target.closest("[data-quiz-next]")&&state.quiz){
    if(state.quiz.index===quizBank.length-1){if(confirm("Kumpulkan jawaban quiz sekarang?"))finishQuiz(false);}
    else{state.quiz.index++;persist();render();}return;
  }
  if(event.target.closest("[data-quiz-retry]")){state.quiz=null;routeTo("quiz-intro");return;}
  if(event.target.closest("[data-export-xlsx]")){exportXlsx();return;}
});


function checkActivity(type){
  let ok=false,msg="Periksa kembali jawabanmu.";
  const val=id=>$("#"+id)?.value||"";
  if(type==="match"){const ans=["b","a","c","d"];ok=ans.every((x,i)=>val("match"+i)===x);msg=ok?"Tepat! Kromosom mengemas DNA, DNA menyimpan informasi, gen adalah bagian DNA, dan RNA membantu penggunaan informasi genetik.":"Masih ada pasangan yang belum tepat. Perhatikan perbedaan struktur, molekul, segmen, dan peran.";}
  if(type==="chromosome"){const ans=["sentromer","telomer","kromatid"];ok=ans.every((x,i)=>val("chrom"+i)===x);msg=ok?"Benar! Kamu sudah mengenali sentromer, telomer, dan kromatid.":"Coba cocokkan kembali deskripsi setiap bagian kromosom.";}
  if(type==="dna"){ok=normalizeSeq(val("dnaAnswer"))==="TACGGT";msg=ok?"Benar! Pasangan basa DNA adalah A-T dan G-C.":"Belum tepat. Gunakan A-T dan G-C untuk melengkapi urutan.";}
  if(type==="rna"){const ans=["DNA","RNA","DNA","RNA"];ok=ans.every((x,i)=>val("rna"+i)===x);msg=ok?"Tepat! Kamu dapat membedakan karakteristik DNA dan RNA.":"Periksa kembali gula, jumlah untai, dan basa nitrogen pada DNA serta RNA.";}
  if(type==="genotype"){const ans=["homod","hetero","homor"];ok=ans.every((x,i)=>val("geno"+i)===x);msg=ok?"Benar! AA homozigot dominan, Aa heterozigot, dan aa homozigot resesif.":"Perhatikan apakah kedua alelnya sama atau berbeda.";}
  if(type==="phenotype"){const ans=["ungu","ungu","putih"];ok=ans.every((x,i)=>val("pheno"+i)===x);msg=ok?"Tepat! Pada model dominansi penuh, PP dan Pp ungu, sedangkan pp putih.":"Ingat bahwa alel P dominan penuh terhadap p.";}
  if(type==="expression"){ok=val("expressionOrder")==="dna-transcription-mrna-translation-protein";msg=ok?"Benar! Informasi DNA ditranskripsikan menjadi mRNA, lalu diterjemahkan menjadi polipeptida.":"Urutannya dimulai dari DNA, transkripsi, mRNA, translasi, lalu polipeptida.";}
  if(type==="mrna"){ok=normalizeSeq(val("mrnaAnswer"))==="AUGCCUGAA";msg=ok?"Benar! DNA cetakan TAC-GGA-CTT menghasilkan mRNA AUG-CCU-GAA.":"Perhatikan pasangan transkripsi: T-A, A-U, C-G, G-C.";}
  if(type==="trna"){ok=normalizeSeq(val("trnaAnswer"))==="UAC";msg=ok?"Tepat! Antikodon UAC berpasangan dengan kodon AUG.":"Antikodon harus komplementer dengan AUG, yaitu UAC.";}
  setFeedback(msg,ok);
  if(ok){state.activityDone[state.route.index]=true;persist();}
}


menuToggle.addEventListener("click",()=>menuPanel.hidden?openMenu():closeMenu());
menuClose.addEventListener("click",closeMenu);
menuBackdrop.addEventListener("click",closeMenu);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});

musicToggle.addEventListener("click",async()=>{
  if(backgroundMusic.paused){
    try{await backgroundMusic.play();}
    catch(e){musicLabel.textContent="Periksa audio";}
  }else backgroundMusic.pause();
});
backgroundMusic.addEventListener("play",()=>{
  musicToggle.setAttribute("aria-pressed","true");
  musicIcon.textContent="Ⅱ";
  musicLabel.textContent="Jeda";
});
backgroundMusic.addEventListener("pause",()=>{
  musicToggle.setAttribute("aria-pressed","false");
  musicIcon.textContent="▶";
  musicLabel.textContent="Musik";
});
musicUpload.addEventListener("click",()=>musicFile.click());
musicFile.addEventListener("change",()=>{
  const file=musicFile.files?.[0];
  if(!file)return;
  if(customMusicUrl)URL.revokeObjectURL(customMusicUrl);
  customMusicUrl=URL.createObjectURL(file);
  backgroundMusic.src=customMusicUrl;
  backgroundMusic.load();
  backgroundMusic.pause();
  musicUpload.textContent="Dipilih";
  musicUpload.title=`Musik pilihan: ${file.name}`;
});

render();
})();
