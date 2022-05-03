#!/bin/bash
# Utils group executor.sh

services_path=("catalog" "logistic" "users" "cache" "common/auth" "database" "controllers" "interfaces")

for str in ${services_path[@]}; do
    cd $PWD/$str 
    npm install
    eval "$1"
    cd ..
done
