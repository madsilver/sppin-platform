#!/bin/bash
MYSQL_HOST=172.26.0.2
DB_USER=sppin_user
DB_MODULE=sppin_module

# create databases
mysql -u root -p -e "create database $DB_USER; create database $DB_MODULE;" --host $MYSQL_HOST; 

# user
knex migrate:latest
cd ../microservices/ms-user  
knex seed:run

# module
cd ../microservices/ms-module  
knex migrate:latest
knex seed:run