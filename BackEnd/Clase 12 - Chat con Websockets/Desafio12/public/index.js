var socket = io();

socket.on("server_sendProducts", (arrProducts) => {
  renderTable(arrProducts);
});

socket.on("server_sendMessages", (arrChat) => {
  renderMessages(arrChat);
  console.log(arrChat);
});

//Funciones CHAT

const addInfo = () => {
  let objMessage = {
    user: document.querySelector("#user").value,
    content: document.querySelector("#content").value,
  };
  console.log(objMessage);
  socket.emit("client_newMessage", objMessage);
  document.querySelector("#content").value = "";
  return false;
};

const renderMessages = (arrChat) => {
  let html = arrChat.map((message) => {
    return `<p> <strong style="color: blue">${message.user}: </strong> <span style="color: brown">[${message.date}]</span> <span style="color: green"> <em>${message.content} </em> </span> </p>`;
  }).join("");

  document.querySelector("#boxMessages").innerHTML = html;
};

//funciones PRODUCTOS

const addProduct = () => {
  let objMsn =
  {
      title: document.querySelector("#title").value,
      price:document.querySelector("#price").value,
      thumbnail:"https://picsum.photos/50"
    };

  socket.emit("client_newProduct", objMsn)

  document.querySelector("#title").value ="";
  document.querySelector("#price").value ="";
  document.querySelector("#thumbnail").value ="";

  return false;
}

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
