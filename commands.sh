#!/bin/bash
# Utils group executor.sh

#Paths services
services_path=("catalog" "logistic" "users" "cache" "common/auth" "common/database" "common/controllers" "common/interfaces")

for str in ${services_path[@]}; do
    cd $PWD/$str 
    npm install
    sudo chown admin:admin -R dist
    eval "$1"
    cd ..
done
