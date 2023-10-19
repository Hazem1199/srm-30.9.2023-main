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

const pushObj = [];

async function showDeadlines(id) {
  change();
  const students = await getInfoDeadlines(id);
  const tableBody = document.querySelector('.tbody1');
  tableBody.innerHTML = '';

  for (let i = 0; i < students.length; i++) {
    if (id == students[i].ID) {
      const student = {
        DueDate: students[i]['Due Date'],
        Amount: students[i].Amount,
        Status: students[i].Status,
      };

      pushObj.push(students[i]['Due Date'])
      console.log(pushObj);
      const newRow = document.createElement('tr');
      console.log(student.DueDate);
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
                        <input name="Amount" type="number" placeholder="Amount" id="floatingInput" class="form-control"  required>
                        <label for="floatingInput">Amount</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" name="Cash type">
                          <option selected></option>
                          <option value="Cash">Cash</option>
                          <option value="Vodafone Cash">Vodafone Cash</option>
                          <option value="Bank Account">Bank Account</option>
                          <option value="Online Payment">Online Payment</option>
                        </select>
                        <label for="floatingSelect">select cash type</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" name="type">
                          <option selected>Payment</option>
                        </select>
                        <label for="floatingSelect">select invoice type</label>
                      </div>
                      <div class="form-floating mt-3">
                        <select class="form-select" id="floatingSelect" name="payment sub cat">
                          <option selected>Deadline</option>
                        </select>
                        <label for="floatingSelect">select Payment Sub-categories</label>
                      </div>

                      <div class="form-group form-floating" style="display: ;">
                        <input name="Deadline Date" type="text" placeholder="Amount" id="SelectDueDate" class="form-control"  value =${students[i]['Due Date']} >
                        <label for="SelectDueDate">Amount</label>
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

      // const btndanger = newRow.querySelector('.btn-danger');
      // const btnoutlinesuccess = newRow.querySelector('.btn-outline-success');
      if (student.Status === "paid") {
        payBtn.innerText = 'Paid';
        // const renderedText = htmlElement.innerText;
        payBtn.disabled = true;
        payBtn.classList.add('btn-success');
      } else {
        payBtn.classList.add('btn-danger');
        // floatingInput.value = students[i].Amount
        // SelectDueDate.value=students[i]['Due Date']

      }

      // Add a click event listener to the button.
    payBtn.addEventListener('click', () => {
      // Get the "SelectDueDate" element.
      const selectDueDate = document.querySelector('#SelectDueDate');
      const floatingInput = document.querySelector('#floatingInput');

      // Set the value of the "SelectDueDate" element to the due date of the student in the current row.
      selectDueDate.value = students[i]['Due Date'];
        floatingInput.value = students[i].Amount

    });

      tableBody.appendChild(newRow);
    }

    


  };


  const frmSubmit = document.querySelector("#frmSubmit")
  jQuery(frmSubmit).on('submit', function (e) {
    e.preventDefault();
    jQuery.ajax({
      url: 'https://script.google.com/macros/s/AKfycbytlYxtnL1itZablK2TT4B6Mm2e6EWFSn-PYrVtIb5hT43gsJR1cqa3zR-C80UpNe6sVQ/exec',
      type: 'post',
      data: jQuery('#frmSubmit').serialize(),
      beforeSend: function () {
        var spinner = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        jQuery('#spinner-container').html(spinner);
      },
      success: function (result) {
        jQuery('#frmSubmit')[0].reset();
        // Display success message here
        jQuery('#msg').html('Data sent successfully.');
      },
      error: function () {
        jQuery('#msg').html('An error occurred. Please try again.');
      },
      complete: function () {
        jQuery('#spinner-container').empty();
      }
    });
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