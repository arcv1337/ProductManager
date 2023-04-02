function generateTable(products, limit) {
    let table = '<table><thead><tr><th>Id</th><th>Título</th><th>Descripción</th><th>Precio</th><th>Thumbnail</th><th>Código</th><th>Stock</th></tr></thead><tbody>';
    for(let i = 0; i < Math.min(products.length, limit); i++) {
      table += `<tr><td>${products[i].id}</td><td>${products[i].titulo}</td><td>${products[i].descripcion}</td><td>${products[i].precio}</td><td><img src="${products[i].thumbnail}" alt="${products[i].titulo}" width="50" height="50"/></td><td>${products[i].code}</td><td>${products[i].stock}</td></tr>`;
    }
    table += '</tbody></table>';
    return table;
  }
  
  export default { generateTable };