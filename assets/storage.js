const CACHE_KEY = "calculation_history";

function checkForStorage() {
    // Untuk penulisan "storage" seharusnya diawali dengan huruf kapital "Storage"
    // return typeof(storage) !== "undefined"
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
    if(checkForStorage()) {
        let historyData = null;

        if(localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.lengt > 5){
            historyData.pop();
        }

        // Gunakan tanda "." (titik) untuk memanggil fungsi "setItem"
        // localStorage,setItem(CACHE_KEY,JSON.stringify(historyData));
        localStorage.setItem(CACHE_KEY,JSON.stringify(historyData));
    }
}

function showHistory() {
    if(checkForStorage) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    //oke
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');

        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        // Gunakan "+=" bukan hanya "=" saja
        // row.innerHTML = "<td>" + history.operator + "</td>";
        // row.innerHTML = "<td>" + history.secondNumber + "</td>";
        // row.innerHTML = "<td>" + history.result + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();