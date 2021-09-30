class User {
      constructor(name, lastName, books, pets){
            this.name = name;
            this.lastName = lastName;
            this.books = books || [];
            this.pets = pets || [];
      }

      getFullname(){
            return `${this.name} ${this.lastName}`;
      }

      addPet(petName){
            this.pets = [...this.pets, petName];
      }

      countPets(){
            return this.pets.length;
      }

      addBook(bookName, authorName){
            const newBook = { name:bookName, author:authorName };
            this.books = [...this.books, newBook];
      }

      getBookNames(){
            return this.books.map(book => book.name);
      }
}

const user = new User('Elon', 'Musk');
user.addPet('cat');
user.addPet('dog');
user.addBook('El señor de las moscas','William Golding');
user.addBook('Fundacion','Isaac Asimov');
console.log('Propiedades del objeto tipo User 1',user);
console.log('Nombre completo: ',user.getFullname());
console.log("Cantidad de mascotas: ", user.countPets());
console.log("Array de nombres de libros: ", user.getBookNames());


const user2 = new User('Matias', 'Aguilera');
user2.addPet('golden fish');
user2.addPet('hamster');
user2.addPet('bird');
user2.addBook('El último viaje de ulises','Claudia Cardozo');
user2.addBook('El camino del artista','Cameron Julia  ');
user2.addBook('En el limbo','Bachrach Estanislao');
user2.addBook('Nosotros en la luna','Alice Kellen');
console.log('Propiedades del objeto tipo User 2',user2);
console.log('Nombre completo: ',user2.getFullname());
console.log("Cantidad de mascotas: ", user2.countPets());
console.log("Array de nombres de libros: ", user2.getBookNames());