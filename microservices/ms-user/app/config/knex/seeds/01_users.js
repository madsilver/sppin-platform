const p = [
    {
        "module":"home",
        "read":1,
        "write":1
    },
    {
        "module":"users",
        "read":1,
        "write":1
    },
    {
        "module":"logs",
        "read":1,
        "write":1
    },
    {
        "module":"settings",
        "read":1,
        "write":1
    }
];

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    name: 'Administrator',
                    username: 'admin',
                    password: 'aba29239b2aa27824be878c795129d6d',
                    email: 'admin@sppin.com',
                    department: 0,
                    permissions: JSON.stringify(p)
                },
            ]);
        });
};
