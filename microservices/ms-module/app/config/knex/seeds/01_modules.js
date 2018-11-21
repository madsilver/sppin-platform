
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('modules').del()
      .then(function () {
          // Inserts seed entries
          return knex('modules').insert([
              {
                  name: 'home',
                  label: 'Início',
                  icon: 'icons:dashboard',
                  color: 'blue'
              },
              {
                name: 'users',
                label: 'Usuários',
                icon: 'icons:face',
                color: 'orange'
              },
              {
                name: 'settings',
                label: 'Configurações',
                icon: 'icons:settings',
                color: 'grey'
              }
          ]);
      });
};
