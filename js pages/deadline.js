const searchInput = document.getElementsByName("search");
const searchButton = document.querySelector('.search-button');


async function getInfoDeadlines(id) {
  const baseUrl = `https://script.google.com/macros/s/AKfycbxTI9S1emlI6Vls1ZVLIDRCpPlxKEXf7mRTjc8XaG7zXsXAVAGfhLeTUfoTnCfYQ2LlAQ/exec`;
  let url = baseUrl;
  if (id) {
    url += `?id=${id}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


var loadingDiv = document.querySelector('.loading-div')

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
  loadingDiv.style.display = "block";
  overlay.style.display = "block";
}

function hide() {
  overlay.style.display = "none";
  loadingDiv.style.display = "none";
}


async function showDeadlines(id) {
  change();
  const students = await getInfoDeadlines(id);
  const tableBody = document.querySelector('.tbody1');
  tableBody.innerHTML = '';

  
  students.forEach((element) => {
    if (id == element.ID ) {
      const student = { DueDate: element[`Due Date`] , Amount: element.Amount , Status: element.Status };
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${student.DueDate}</td>
        <td>${student.Amount}</td>
        
        <td>
          <button id="payBtn" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            pay now!
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Please Fillfull All Inputs</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form method="POST" id="frmSubmit" >
                      <div class="form-group form-floating">
                        <input name="Name" type="number" placeholder="Amount" id="floatingInput" class="form-control"  required>
                        <label for="floatingInput">Amount</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" >
                          <option selected></option>
                          <option value="1">Cash</option>
                          <option value="2">Vodafone Cash</option>
                          <option value="3">Bank Account</option>
                          <option value="3">Online Payment</option>
                        </select>
                        <label for="floatingSelect">select cash type</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" >
                          <option selected>Payment</option>
                        </select>
                        <label for="floatingSelect">select invoice type</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" >
                          <option selected>Deadline</option>
                        </select>
                        <label for="floatingSelect">select Payment Sub-categories</label>
                      </div>
                      <div class="form-group mt-3 form-floating">
                        <textarea name="Consultations" class="form-control" placeholder="Nots" id="Textarea" rows="5"></textarea>
                        <label for="Textarea" class="form-label">Nots</label>
                      </div>
                      <div class="my-3">
                        <div class="error-message"></div>
                        <div dir="ltr" class="sent-message text-center alert alert-success d-none" id="success-msg">We will
                          connect to you , Thank's</div>
                        <div id="spinner-container"></div>
                      </div>
                      <div class="d-flex justify-content-center ">
                        <button class="btn btn-primary scrollto btn-info text-light" id="btnSubmit"
                          type="submit">Send</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </td>
      `;
      
      const payBtn = newRow.querySelector('#payBtn');
      const floatingInput = document.querySelector('#floatingInput');
      // const btndanger = newRow.querySelector('.btn-danger');
      // const btnoutlinesuccess = newRow.querySelector('.btn-outline-success');
      if (student.Status === "paid") {
        payBtn.innerText = 'Paid';
        // const renderedText = htmlElement.innerText;
        payBtn.disabled = true;
        payBtn.classList.add('btn-success');
      }else{
        payBtn.classList.add('btn-danger');
        floatingInput.value = student.Amount
      }

      tableBody.appendChild(newRow);
    }
  });

  hide(); // hide the loading overlay once the requests are shown
}

var paramsDead = new URLSearchParams(window.location.search);
var id = paramsDead.get('id');
showDeadlines(id);

// add an event listener to the window object to run the `change()` function when a new window is opened
window.addEventListener('open', change);

window.onload = function () {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search")

  closeBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open")
    menuBtnChange()
  })

  // searchBtn.addEventListener("click", function () {
  //   sidebar.classList.toggle("open")
  //   menuBtnChange()
  // })

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
    }
  }
}






// <td>
//           <img src="${student.Status === "paid" ? "../imgs/correct.png" : "./imgs/png-transparent-computer-icons-ok-miscellaneous-trademark-cross.png"}" alt="${student.Status}" style="width: 7%">
//         </td>