# /bin/bash

echo "==============================="
echo " Rebuild postgres database "
echo "==============================="

cd ./trips-stack

echo "Stop postgres container"
docker container stop postgres-trips
echo "Remove postgres container"
docker container rm postgres-trips
echo "Remove postgres data (volume)"
docker volume rm postgres-trips
echo "Relaunch stack"
docker compose up -d