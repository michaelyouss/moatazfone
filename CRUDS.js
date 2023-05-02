// get total
// create product
// save localstorage
// clear inputs 
// read
// count
// Delete
// updite
// search
// clean data
// ===================Start input======================
let titel = document.getElementById("title");
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discound = document.getElementById("discound")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let mood = 'create';
let tmb;


// console.log(titel,price,taxes,ads,discound,total,count,category,submit)

function getTotal() {
    if (price.value != "") {
        let redult = (+price.value + +taxes.value + +ads.value) - +discound.value;
        total.innerHTML = redult;
        total.style.background = "#4409a3"
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02"
    }
}

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


submit.onclick = function () {
    let newPro = {
        titel: titel.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discound: discound.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    //==================== count =========================
    if (titel.value != "" && price.value != "") {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmb] = newPro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
    }




    // Save localstorage
    localStorage.setItem("product", JSON.stringify(dataPro))
    clearData()
    showData()
}

function clearData() {
    titel.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discound.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData() {
    getTotal()
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].titel}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discound}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>

        <td><button onclick="updateData(${i})" id="update">update</button></td>

        <td><button onclick="deletData( ${i} )" id="delet">delet</button></td>
      </tr>
      `;

    }

    document.getElementById("tbody").innerHTML = table;
    let deletAll = document.getElementById("deleteAll")
    if (dataPro.length > 1) {
        deletAll.innerHTML = `
        <button onclick="deleteAll()">delet All(${dataPro.length})</button>
        `
    } else {
        deletAll.innerHTML = "";
    }

}

showData()


function deletData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(1);
    showData()
}


// ===================End input========================

//==================== updite ==========================
function updateData(i) {
    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discound.value = dataPro[i].discound;
    getTotal()
    count.style.display = "none"
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "Update";
    tmb = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

}

//======================== search ====================
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == 'searchTiile') {
        searchMood = " titel ";

    } else {
        searchMood = " category "

    }
    search.placeholder = "Seatch By " + searchMood;
    search.focus()
    search.value = "";
    showData()
}

function searchData(value) {
    let table = "";
    if (searchMood == "title") {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].titel.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].titel}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discound}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
        
                <td><button onclick="updateData(${i})" id="update">update</button></td>
        
                <td><button onclick="deletData( ${i} )" id="delet">delet</button></td>
              </tr>
              `;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].titel}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discound}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
        
                <td><button onclick="updateData(${i})" id="update">update</button></td>
        
                <td><button onclick="deletData( ${i} )" id="delet">delet</button></td>
              </tr>
              `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

//==================== clean data =================


