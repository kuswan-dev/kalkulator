const CACHE_KEY = "calculation_history";

function chekckForStorage() {
    return typeof (Storage) !== "undefined"
}

function putHistory(data) {
    if (chekckForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
            //ntuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
        }

        historyData.unshift(data);
        //unshift : untuk menambahkan nilai baru pada array yang ditempatkan pada awal index. Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru
        if (historyData.length > 5) {
            historyData.pop();
            //pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5.
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
        //untuk mengubah objek JavaScript ke dalam bentuk String
    }
}

function showHistory() {
    if (chekckForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];

    } else {
        return [];
        //Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}
renderHistory();