const Contenedor = require('./class/Contenedor');

const app = async () => {
  const contenedor = new Contenedor("./desafio4/db/productos.txt");
  const testObject = {
    title: "testObject",
    price: 100,
    thumbnail: "https://cdn3.iconfinder.com/data...",
  };

  console.log("EJECUCION deleteAll()\n", await contenedor.deleteAll());

  console.log("EJECUCION getAll()\n", await contenedor.getAll());

  for (let i = 0; i < 10; i++)
    console.log("EJECUCION save(item)\nID:", await contenedor.save(testObject));

  console.log("EJECUCION getAll()\n", await contenedor.getAll());

  for (let i = 0; i < 5; i++) await contenedor.deleteById(i + 1);

  console.log(
    "EJECUCION getAll() al eliminar los primeros 6 elementos\n",
    await contenedor.getAll()
  );

  for (let i = 0; i < 10; i++)
    console.log("EJECUCION getById(id)\n", await contenedor.getById(i + 1));

  console.log("EJECUCION deleteAll()\n", await contenedor.deleteAll());
  console.log("EJECUCION getAll()\n", await contenedor.getAll());

  for (let i = 0; i < 10; i++)
    console.log("EJECUCION save(item)\nID:", await contenedor.save(testObject));

  console.log("EJECUCION getAll()\n", await contenedor.getAll());
};

app();
