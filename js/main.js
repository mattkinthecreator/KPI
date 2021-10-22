const API = `http://localhost:8000/students`
let userName = $('#name')
let lastName = $('#lastName')
let number = $('#phoneNumber')
let wKPI = $('#weeklyKPI')

$('.btn-add').on('click', async function(){
    let obj = {
        name: userName.val()
    }
})