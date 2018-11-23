# Sppin Platform

## AWS Settings
```
Public DNS IPv4 : ec2-54-233-210-125.sa-east-1.compute.amazonaws.com
IPv4 Public IP  : 54.233.210.125
Private DNS     : ip-172-31-3-192.sa-east-1.compute.internal
Zone            : sa-east-1a
Private IPs     : 172.31.3.192
VPC ID          : vpc-c43156a3
Key pair name   : sppin-ecs
```

## Init Database
```sh
cd env
./knex.sh
```
## Start
```sh
docker-compose up
docker-compose -f docker-compose.log.yml up
```