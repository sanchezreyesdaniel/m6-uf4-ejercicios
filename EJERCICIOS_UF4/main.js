document.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      console.log(users);
      let html = '';
      for (let i = 0; i < 5; i++) {
        html += `
          <tr>
            <th scope="row">${users[i].id}</th>
            <td>${users[i].name}</td>
            <td>${users[i].username}</td>
            <td>${users[i].email}</td>
            <td><button data-id="${users[i].id}" class="btn btn-primary">DETALLE</button></td>
          </tr>
        `;
      }
      document.querySelector('tbody').innerHTML = html;

      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
          const userId = event.target.getAttribute('data-id');
          const selectedUser = users.find(user => user.id == userId);

          let html2 = `<div class="card">
            <div class="card-body">
              <h5 class="card-title">${selectedUser.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Detalles</h6>
              <p><strong>Usuario: </strong> ${selectedUser.username}</p>
              <p><strong>Correo Electrónico: </strong> ${selectedUser.email}</p>
              <a href="#" class="card-link">Página web</a>
            </div>
          </div>`;

          document.querySelector('#detalleUsuario').innerHTML = html2;
        });
      });
    });

  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
      console.log(comments);
      let accordionHtml = '';
      for (let i = 0; i < 5; i++) {
        accordionHtml += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                PostId: ${comments[i].postId}
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionPosts">
              <div class="accordion-body">
                ${comments[i].body}
              </div>
            </div>
          </div>
        `;
      }
      document.querySelector('#accordionPosts').innerHTML = accordionHtml;
    })
    .catch(error => console.log(error))
    .finally(() => console.log('Se cargaron los comentarios'));

  document.querySelector('#tablaUsuarios').addEventListener('click', (e) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.getAttribute('data-id')}`)
      .then(response => response.json())
      .then(posts => {
        console.log(posts);
        document.querySelector('#listaPublicaciones').innerHTML = '';
        for (let i = 0; i < 5; i++) {
          document.querySelector('#listaPublicaciones').innerHTML +=
            `
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div id="${posts[i].id}" class="ms-2 me-auto">
                <div id="${posts[i].id}" class="fw-bold">${posts[i].title}</div>
                <div id="${posts[i].id}" >${posts[i].body}</div>
              </div>
              <span class="badge bg-primary rounded-pill">5</span>
            </li>
          `;
        }
      })
      .catch(error => console.log(error));

    document.querySelector('#listaPublicaciones').addEventListener('click', (event) => {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${event.target.id}`)
        .then(response => response.json())
        .then(comments => {
          console.log(comments);
          document.querySelector('#listaComentariosPublicacion').innerHTML = '';
          for (let i = 0; i < 5; i++) {
            document.querySelector('#listaComentariosPublicacion').innerHTML +=
              `
              <div class="card mt-2">
                <div class="card-body">
                  <h5 class="card-title">${comments[i].name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${comments[i].email}</h6>
                  <p class="card-text">${comments[i].body}</p> 
                </div>
              </div>
            `;
          }
        })
        .catch(error => console.log(error));
    });
  });
});