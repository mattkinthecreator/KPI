const API = 'http://localhost:8000/students'
let userName = $('#name')
let lastName = $('#lastName')
let number = $('#phoneNumber')
let wKPI = $('#weeklyKPI')
let mKPI = $('#monthlyKPI')
let contacts = $('.contacts')

$('#btn_add').on('click', function(){
    let obj = {
        name: userName.val(),
        lastName: lastName.val(),
        phone: number.val(),
        weeklyKpi: wKPI.val(),
        monthlyKpi: mKPI.val()
    }
    addInfo(obj)
})


function addInfo(obj){  
    fetch('http://localhost:8000/students' ,{
        method: "POST", 
        body: JSON.stringify(obj), 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
 }}) 
}

$('body').on('click', '.btn-delete', (e) => {
  let id = e.target.parentNode.id
  deleteStudent(id)
})

function deleteStudent(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
}

function editStudent(id) {
  let obj = {
    name: '',
    lastName: '',
    phone: '',
    weeklyKpi: '',
    monthlyKpi: '',
  }
}

async function render() {
   let res = await fetch(API)
   let data = await res.json();

    data.forEach(item => {
        contacts.append(
        `<div id="${item.id}">
            <img class="btn-edit" src="./img/pen.png">
            <p>${item.name}</p>
            <p>${item.lastName}</p>
            <p>${item.phone}</p>
            <p>${item.weeklyKpi}</p>
            <p>${item.monthlyKpi}</p>
            <img class="btn-delete" src="./img/delete.png">
        </div>`)
    });
   console.log(data)
}

render()