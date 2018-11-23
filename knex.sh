#!/bin/bash
MYSQL_HOST=172.26.0.2
DB_USER=sppin_user
DB_MODULE=sppin_module
PATH=$(pwd)

# create databases
mysql -u root -p -e "create database if not exists $DB_USER; create database if not exists $DB_MODULE;" --host $MYSQL_HOST; 

# user
knex migrate:latest --knexfile $PATH/microservices/ms-user/knexfile.js
knex seed:run --knexfile $PATH/microservices/ms-module/knexfile.js

# module
knex migrate:latest --knexfile $PATH/microservices/ms-module/knexfile.js
knex seed:run --knexfile $PATH/microservices/ms-module/knexfile.js