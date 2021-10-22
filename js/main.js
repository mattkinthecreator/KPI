const API = 'http://localhost:8000/students'
let userName = $('#name')
let lastName = $('#lastName')
let number = $('#phoneNumber')
let wKPI = $('#weeklyKPI')
let mKPI = $('#monthlyKPI')

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