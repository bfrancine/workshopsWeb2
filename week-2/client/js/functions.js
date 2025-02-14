function assignEditEvents() {
  for (let el of document.getElementsByClassName('edit_button')) {
    el.addEventListener('click', (e) => {
      console.log(e.target.id);
      alert(`element with id ${e.target.id} clicked`);
      e.preventDefault();
    });
  }

}


async function getTeachers() {
  const response = await fetch("http://localhost:3001/teachers/id");
  const teachers = await response.json();
  console.log('teachers:', teachers);

  if(teachers) {
    const container = document.getElementById('result');
    container.innerHTML = '';
    teachers.forEach(element => {
      const item = document.createElement('li');
      item.innerHTML = `${element.first_name} ${element.last_name} <a href="" class="edit_button" id="${element._id}">Edit</a>`;
      item.setAttribute('data-id',element._id);
      container.appendChild(item)
    });

    assignEditEvents();
  }
}

async function createTeacher() {
  let teacher =  {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  }

  const response = await fetch("http://localhost:3001/teachers",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacher)
  });

  debugger;
  if(response && response.status == 201){
    teacher = await response.json();
    console.log('Teacher saved', teacher);
    alert('Usuario guardado');
  } else {
    alert("No se guardó el usuario ");
  }

  async function createCourse(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional
  
    const name = document.getElementById('name').value;
    const credits = document.getElementById('credits').value;
    const teacher = document.getElementById('teacher').value;
  
    const courseData = {
      name: name,
      credits: credits,
      teacher: teacher
    };
  
    try {
      const response = await fetch('/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData) // Asegúrate de enviar los datos como JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Curso creado exitosamente');
        // Aquí podrías agregar lógica para manejar la respuesta, como redirigir al usuario o limpiar el formulario
      } else {
        alert('Hubo un error al crear el curso');
      }
    } catch (error) {
      console.error('Error al crear el curso:', error);
    }
  }
  
  // Asignar el manejador al formulario
  document.getElementById('courseForm').addEventListener('submit', createCourse);
  

}
