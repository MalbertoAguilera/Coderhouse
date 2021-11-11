var socket = io();

//le digo a cliente que va a recibir un mensaje
socket.on("message_client", (data) => {
  console.log("mensaje recibido desde el server:", data);
  renderTable(data);
  //responder del cliente al server
  socket.emit("message_back", "gracias por el mensaje");
});

const renderMessages = (data) => {
  let html = data.map((item) => {
    return `<p>${item.user}: ${item.msg} <p>`;
  }).join("");

  document.querySelector("#caja").innerHTML = html;
};

const renderTable = (data) => {
  let table = data
    .map((item) => {
      return `
        <tr>
          <th scope="row">${item.title}</th>
          <td>$${item.price}</td>
          <td>
            <img
              src="${item.thumbnail}"
              alt="${item.title}"
            />
          </td>
        </tr>`;
    })
    .join(" ");
  document.querySelector("#itemsTable").innerHTML = table;
};

const addProduct = () => {
  let objMsn =
    {
      title: document.querySelector("#title").value,
      price:document.querySelector("#price").value,
      thumbnail:"https://picsum.photos/50"
    };

  socket.emit("message_client", objMsn)

  document.querySelector("#title").value ="";
  document.querySelector("#price").value ="";
  document.querySelector("#thumbnail").value ="";

  return false;
}

