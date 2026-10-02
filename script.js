// =====================================
// DATA SOAL
// =====================================

const soal = [

    {
        pertanyaan: "Apa yang dimaksud dengan komputer?",

        pilihan: [
            "Alat untuk memasak",
            "Perangkat elektronik untuk mengolah data",
            "Alat untuk mencetak kertas saja",
            "Perangkat untuk bermain musik saja"
        ],

        jawaban: 1
    },


    {
        pertanyaan: "Manakah yang termasuk perangkat keras?",

        pilihan: [
            "Microsoft Word",
            "Google Chrome",
            "Keyboard",
            "Windows"
        ],

        jawaban: 2
    },


    {
        pertanyaan: "Perangkat lunak disebut juga dengan istilah...",

        pilihan: [
            "Hardware",
            "Software",
            "Brainware",
            "Keyboard"
        ],

        jawaban: 1
    },


    {
        pertanyaan: "Manusia yang menggunakan atau mengoperasikan komputer disebut...",

        pilihan: [
            "Hardware",
            "Software",
            "Brainware",
            "Database"
        ],

        jawaban: 2
    },


    {
        pertanyaan: "Manakah yang termasuk sistem operasi?",

        pilihan: [
            "Windows",
            "Keyboard",
            "Mouse",
            "Monitor"
        ],

        jawaban: 0
    },


    {
        pertanyaan: "Apa fungsi jaringan komputer?",

        pilihan: [
            "Menghubungkan dan berbagi data antarperangkat",
            "Mengubah komputer menjadi televisi",
            "Menghapus semua data",
            "Mematikan internet"
        ],

        jawaban: 0
    },


    {
        pertanyaan: "Manakah contoh jaringan komputer?",

        pilihan: [
            "LAN",
            "CPU",
            "RAM",
            "Keyboard"
        ],

        jawaban: 0
    },


    {
        pertanyaan: "Salah satu cara menjaga keamanan komputer adalah...",

        pilihan: [
            "Membagikan password kepada semua orang",
            "Menggunakan password yang kuat",
            "Membuka semua tautan yang diterima",
            "Mengabaikan pembaruan sistem"
        ],

        jawaban: 1
    },


    {
        pertanyaan: "Sikap yang baik ketika menggunakan internet adalah...",

        pilihan: [
            "Menyebarkan informasi palsu",
            "Menghina pengguna lain",
            "Menjaga sopan santun",
            "Membagikan data pribadi"
        ],

        jawaban: 2
    },


    {
        pertanyaan: "Contoh penggunaan komputer dalam kegiatan belajar adalah...",

        pilihan: [
            "Membuat tugas dan mencari informasi",
            "Merusak data sekolah",
            "Menyebarkan password",
            "Menghapus file orang lain"
        ],

        jawaban: 0
    }

];


// =====================================
// VARIABEL
// =====================================

let nomorSekarang = 0;
let skor = 0;
let sudahMenjawab = false;
let namaSiswa = "";


// =====================================
// MENAMPILKAN SOAL
// =====================================

// =====================================
// MULAI KUIS
// =====================================

function mulaiKuis() {

    const inputNama =
        document.getElementById("nama-siswa");

    namaSiswa =
        inputNama.value.trim();


    if (namaSiswa === "") {

        alert("Silakan masukkan nama terlebih dahulu.");

        inputNama.focus();

        return;
    }


    document.getElementById("nama-tampil")
        .textContent = namaSiswa;

    document.getElementById("form-nama")
        .style.display = "none";

    document.getElementById("bagian-kuis")
        .style.display = "block";


    tampilkanSoal();
}
function tampilkanSoal() {

    const data = soal[nomorSekarang];

    document.getElementById("pertanyaan").textContent =
        data.pertanyaan;

    document.getElementById("nomor-soal").textContent =
        "Soal " +
        (nomorSekarang + 1) +
        " dari " +
        soal.length;

    document.getElementById("nilai-sementara").textContent =
        "Nilai: " + skor;


    // Progress bar

    const progress =
        ((nomorSekarang + 1) / soal.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";


    const tempatJawaban =
        document.getElementById("pilihan-jawaban");

    tempatJawaban.innerHTML = "";

    sudahMenjawab = false;


    // Membuat tombol jawaban

    data.pilihan.forEach(function (pilihan, index) {

        const tombol =
            document.createElement("button");

        tombol.classList.add("answer-button");

        tombol.textContent =
            pilihan;

        tombol.onclick = function () {

            pilihJawaban(index, tombol);

        };

        tempatJawaban.appendChild(tombol);

    });

}


// =====================================
// MEMILIH JAWABAN
// =====================================

function pilihJawaban(index, tombol) {

    if (sudahMenjawab) {
        return;
    }

    sudahMenjawab = true;

    const jawabanBenar =
        soal[nomorSekarang].jawaban;


    const semuaTombol =
        document.querySelectorAll(".answer-button");


    semuaTombol.forEach(function (btn) {

        btn.disabled = true;

    });


    if (index === jawabanBenar) {

        skor++;

        tombol.classList.add("correct");

    } else {

        tombol.classList.add("wrong");

        semuaTombol[jawabanBenar]
            .classList.add("correct");

    }


    document.getElementById("nilai-sementara")
        .textContent =
        "Nilai: " + skor;

}


// =====================================
// SOAL BERIKUTNYA
// =====================================

function soalBerikutnya() {

    if (!sudahMenjawab) {

        alert("Silakan pilih jawaban terlebih dahulu.");

        return;

    }


    nomorSekarang++;


    if (nomorSekarang < soal.length) {

        tampilkanSoal();

    } else {

        tampilkanHasil();

    }

}


// =====================================
// HASIL KUIS
// =====================================

function tampilkanHasil() {
    document.getElementById("nama-hasil")
    .textContent = namaSiswa;

    document.querySelector(".quiz-info")
        .style.display = "none";

    document.querySelector(".progress-container")
        .style.display = "none";

    document.querySelector(".question-card")
        .style.display = "none";

    document.getElementById("next-button")
        .style.display = "none";


    document.getElementById("hasil")
        .style.display = "block";


    const nilai =
        Math.round(
            (skor / soal.length) * 100
        );


    document.getElementById("nilai-akhir")
        .textContent = nilai;


    let pesan = "";


    if (nilai >= 80) {

        pesan =
            "🎉 Hebat! Kamu sangat memahami materi.";

    } else if (nilai >= 60) {

        pesan =
            "👍 Bagus! Tetap belajar agar lebih baik.";

    } else {

        pesan =
            "💪 Jangan menyerah! Pelajari kembali materinya.";

    }


    document.getElementById("pesan-hasil")
        .textContent = pesan;

}


// =====================================
// MENGULANGI KUIS
// =====================================

function ulangKuis() {

    nomorSekarang = 0;

    skor = 0;

    document.querySelector(".quiz-info")
        .style.display = "flex";

    document.querySelector(".progress-container")
        .style.display = "block";

    document.querySelector(".question-card")
        .style.display = "block";

    document.getElementById("next-button")
        .style.display = "inline-block";

    document.getElementById("hasil")
        .style.display = "none";

    tampilkanSoal();

}


// =====================================
// JALANKAN SOAL PERTAMA
// =====================================

// Kuis akan dimulai setelah nama dimasukkan