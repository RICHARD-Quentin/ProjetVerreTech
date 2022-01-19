#!/bin/bash
# Utils group executor.sh

<<<<<<< Updated upstream
#Paths services
services_path=("catalog" "logistic" "users" "common/auth" "common/database")
=======
services_path=("catalog" "logistic" "users")
>>>>>>> Stashed changes

for str in ${services_path[@]}; do
    cd $PWD/$str 
    npm install
    eval "$1"
    cd ..
done
