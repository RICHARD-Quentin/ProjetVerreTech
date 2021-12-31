#!/bin/bash
# Utils group executor.sh

#Paths services
services_path=("catalog" "logistic" "users" "common/auth" "common/database")

for str in ${services_path[@]}; do
    cd $PWD/$str 
    npm install
    eval "$1"
    cd ..
done
