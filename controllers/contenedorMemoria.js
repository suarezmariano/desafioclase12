const knex = require('knex');

class ContenedorMemoria {
  constructor(options, table) {
    this.elementos = options;
    this.table = table;
  }

  listar(id) {
    knex
      .from(this.table)
      .select('name', 'price', 'thumbnail')
      .where('id', '==', id)
      .then((data) => {
        for (registro of data) {
          console.log(
            `${registro['name']} ${registro['price']} ${registro['thumbnail']}`
          );
          return registro;
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  listarAll() {
    knex
      .from(this.table)
      .select('*')
      .then((data) => {
        for (registro of data) {
          console.log(
            `${registro['id']} ${registro['name']} ${registro['price']} ${registro['thumbnail']}`
          );
          return registro;
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  guardar(elem) {
    knex(this.table)
      .insert(elem)
      .then(() => console.log('values inserted'))
      .catch(() => {
        console.log(err);
        throw err;
      });
  }

  actualizar(elem, id) {
    knex
      .from(this.table)
      .where('id', id)
      .update(elem)
      .then(() => console.log('product updated'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  borrar(id) {
    knex
      .from(this.table)
      .where('id', '==', id)
      .del()
      .then(() => console.log('product deleted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  borrarAll() {
    knex
      .from(this.table)
      .del()
      .then(() => console.log('all products deleted'))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = ContenedorMemoria;
