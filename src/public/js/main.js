const socket = io();

const form = document.getElementById("productForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.elements.title.value;
  const price = form.elements.price.value;
  const description = form.elements.description.value;
  const code = form.elements.code.value;
  const stock = form.elements.stock.value;
  const thumbnail = form.elements.thumbnail.value;

  console.log(event);
  socket.emit("nuevoProducto", {
    title,
    price,
    description,
    code,
    stock,
    thumbnail,
  });
});

const form2 = document.getElementById("productForm2");

form2.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = parseInt(form2.elements.id.value);

  console.log(event);
  socket.emit("quitarProducto", { id });
});

socket.on("actualizarTabla", (data) => {
  renderizarTabla(data);
});

const renderizarTabla = (data) => {
  const tbody = document.getElementById("prodDisplay");

  const productsMap = data
    .map((item) => {
      return `<tr>
  <th scope="row">${item.id}</th>
  <td>${item.title}</td>
  <td>${item.price}</td>
  <td>${item.stock}</td>
  <td><img src="${item.thumbnail}" width="50"></td>
  </tr>
  `;
    })
    .join("");
  tbody.innerHTML = productsMap;
};