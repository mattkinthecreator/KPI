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
let modal = $('.modal-add')
let page = 1
let pageCount = 1

$('#btn_add').on('click', function () {
  if (
    userName.val().trim() === '' ||
    lastName.val().trim() === '' ||
    number.val().trim() === '' ||
    wKPI.val().trim() === '' ||
    mKPI.val().trim() === ''
  ) {
    alert('Заполните форму')
    return
  }

  let obj = {
    name: userName.val(),
    lastName: lastName.val(),
    phone: number.val(),
    weeklyKpi: wKPI.val(),
    monthlyKpi: mKPI.val(),
  }
  addInfo(obj)
  modal.toggleClass('active')
  $('#background').toggleClass('active')
})

function addInfo(obj) {
  fetch(API, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then(() => render())
  getPagination()
}

$('body').on('click', '.btn-delete', (e) => {
  let id = e.target.parentNode.id
  deleteStudent(id)
})

function deleteStudent(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  }).then(() => {
    render()
    getPagination()
  })
}

$('body').on('click', '.btn-edit', (e) => {
  let id = e.target.parentNode.id
  editModal.attr('id', id)
  editModal.toggleClass('active')
  $('#background').toggleClass('active')
  fetch(`${API}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      editName.val(data.name)
      editLastName.val(data.lastName)
      editPhone.val(data.phone)
      editWeekly.val(data.weeklyKpi)
      editMonthly.val(data.monthlyKpi)
    })
})

$('#btn-save').on('click', (e) => {
  if (
    editName.val().trim() === '' ||
    editLastName.val().trim() === '' ||
    editPhone.val().trim() === '' ||
    editWeekly.val().trim() === '' ||
    editMonthly.val().trim() === ''
  ) {
    alert('Заполните форму')
    return
  }
  let id = e.target.parentNode.id
  editStudent(id)
  editModal.toggleClass('active')
  $('#background').toggleClass('active')
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
  let res = await fetch(`${API}?_limit=5&_page=${page}`)
  let data = await res.json()
  contacts.html('')
  data.forEach((item) => {
    contacts.append(
      `<div class="student">
        <div class="edit-wrapper" id="${item.id}">
          <img class="btn-edit" src="./img/pen.png">
        </div>
        <div class="student-info">
          <p>${item.name}</p>
          <p>${item.lastName}</p>
          <p>${item.phone}</p>
          <p>${item.weeklyKpi}</p>
          <p>${item.monthlyKpi}</p>
        </div>
        <div class="delete-wrapper" id="${item.id}">
          <img class="btn-delete" src="./img/delete.png">
        </div>
      </div>`
    )
  })
  // getPagination()
}

$('#background').on('click', () => {
  $('#background').removeClass('active')
  modal.removeClass('active')
  editModal.removeClass('active')
})

search.on('input', async function () {
  let res = await fetch(`${API}?q=${search.val()}`)
  console.log(search.val())
  let data = await res.json()
  contacts.html('')
  data.forEach((item) => {
    contacts.append(
      `<div class="student">
        <div class="edit-wrapper" id="${item.id}">
          <img class="btn-edit" src="./img/pen.png">
        </div>
        <div class="student-info">
          <p>${item.name}</p>
          <p>${item.lastName}</p>
          <p>${item.phone}</p>
          <p>${item.weeklyKpi}</p>
          <p>${item.monthlyKpi}</p>
        </div>
        <div class="delete-wrapper" id="${item.id}">
          <img class="btn-delete" src="./img/delete.png">
        </div>
      </div>`
    )
  })
})

$('#open-modal-add').on('click', () => {
  modal.toggleClass('active')
  $('#background').toggleClass('active')
  userName.val('')
  lastName.val('')
  number.val('')
  wKPI.val('')
  mKPI.val('')
})

function getPagination() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      pageCount = Math.ceil(data.length / 5)
      $('.pagination-page').remove()
      for (let i = pageCount; i >= 1; i--) {
        $('#previous').after(`
          <button class="pagination-page">${i}</button>
        `)
      }
    })
}

$('#next').on('click', () => {
  if (page >= pageCount) return
  page++
  render()
})
$('#previous').on('click', () => {
  if (page <= 1) return
  page--
  render()
})
$('body').on('click', '.pagination-page', (e) => {
  page = e.target.innerText
  render()
})
render()
getPagination()
