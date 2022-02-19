#!/bin/bash
# Utils group executor.sh

#Paths services
services_path=("catalog" "logistic" "users" "cache" )

for str in ${services_path[@]}; do
    cd $PWD/$str 
    npm install
    eval "$1"
    cd ..
done
