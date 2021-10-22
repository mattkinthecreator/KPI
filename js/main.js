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
