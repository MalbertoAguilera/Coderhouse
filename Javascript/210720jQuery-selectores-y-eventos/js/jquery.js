$(() => {

      $('#menuFiltrar li:has(ul)').click( evento => {
            desplegarSubMenu(evento);
      })

})

const desplegarSubMenu = evento => {

      evento.preventDefault();
      const li = evento.currentTarget;
      //reemplazo de THIS, pierdo el contexto al pasar una funcion me devuelve WINDOWS
      const opcion = evento.target
      //enlace que despliega el Submenu

      if (opcion.classList.contains('subMenu')) {
            if($(li).hasClass('activado')){
                  $(li).removeClass('activado');
                  $(li).children('ul').slideUp();
            } else {
                  $('.segundoNivel li ul').slideUp();
                  $('.segundoNivel li').removeClass('activado');
                  $(li).addClass('activado');
                  $(li).children('ul').slideDown();
            }

      }

      seleccionarFiltro(opcion);
      evento.stopPropagation();
}


const seleccionarFiltro = opcion => {

      const ulCategoria = $(opcion).parent().parent();

      if (opcion.classList.contains('categoria')){
            metodo.ordenarPorCategoria(opcion.textContent);
            $(ulCategoria).find('a').removeClass('activado')
            $(opcion).addClass('activado');
      }

      if (opcion.classList.contains('precio')) {
            $(ulCategoria).find('a').removeClass('activado')
            $(opcion).addClass('activado');
            metodo.ordenarPorPrecio(opcion.textContent);
      }
}