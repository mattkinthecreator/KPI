const API = 'http://localhost:8000/students'
let userName = $('#name')
let lastName = $('#lastName')
let number = $('#phoneNumber')
let wKPI = $('#weeklyKPI')
let mKPI = $('#monthlyKPI')
let contacts = $('.contacts')
let search = $('#search-bar')
let editName = $('#name_edit')
let editLastName = $('#lastName_edit')
let editPhone = $('#phoneNumber_edit')
let editWeekly = $('#weeklyKPI_edit')
let editMonthly = $('#monthlyKPI_edit')
let editModal = $('.modal-edit')

$('#btn_add').on('click', function () {
  let obj = {
    name: userName.val(),
    lastName: lastName.val(),
    phone: number.val(),
    weeklyKpi: wKPI.val(),
    monthlyKpi: mKPI.val(),
  }
  addInfo(obj)
})

function addInfo(obj) {
  fetch(API, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
}

$('body').on('click', '.btn-delete', (e) => {
  let id = e.target.parentNode.id
  deleteStudent(id)
})

function deleteStudent(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  }).then(() => render())
}

$('body').on('click', '.btn-edit', (e) => {
  let id = e.target.parentNode.id
  editModal.attr('id', id)
})

$('#btn-save').on('click', (e) => {
  let id = e.target.parentNode.id
  editStudent(id)
})

function editStudent(id) {
  let obj = {
    name: editName.val(),
    lastName: editLastName.val(),
    phone: editPhone.val(),
    weeklyKpi: editWeekly.val(),
    monthlyKpi: editMonthly.val(),
  }
  fetch(`${API}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then(() => render())
}

async function render() {
  let res = await fetch(API)
  let data = await res.json()
  contacts.html('')
  data.forEach((item) => {
    contacts.append(
      `<div class="student">
        <div class="edit-wrapper" id="${item.id}">
          <img class="btn-edit" src="./img/pen.png">
        </div>
        <div className="student-info">
          <p>${item.name}</p>
          <p>${item.lastName}</p>
          <p>${item.phone}</p>
          <p>${item.weeklyKpi}</p>
          <p>${item.monthlyKpi}</p>
        </div>
        <div className="delete-wrapper" id="${item.id}">
          <img class="btn-delete" src="./img/delete.png">
        </div>
      </div>`
    )
  })
  console.log(data)
}

search.on('input', async function () {
  let res = await fetch(`${API}?q=${search.val()}`)
  let data = await res.json()
  contacts.html('')
  data.forEach((item) => {
    contacts.append(
      `<div id="${item.id}">
        <div class="edit-wrapper">
          <img class="btn-edit" src="./img/pen.png">
        </div>
        <div className="student-info">
          <p>${item.name}</p>
          <p>${item.lastName}</p>
          <p>${item.phone}</p>
          <p>${item.weeklyKpi}</p>
          <p>${item.monthlyKpi}</p>
        </div>
        <div className="delete-wrapper">
          <img class="btn-delete" src="./img/delete.png">
        </div>
      </div>`
    )
  })
})
render()
