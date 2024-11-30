# Usage: run.sh [new]

new=$1

if [[ "$new" = "new" ]]; then
    rm -rf data/postgres-database/*
    echo "removed previous database"
fi

docker-compose down
docker-compose build
docker-compose up -d

if [[ "$new" = "new" ]]; then
    if [[ -d "crawler/.venv" ]]; then
        echo ".venv exist"
        source crawler/.venv/bin/activate
    else
        echo ".venv not exist"
        python3 -m venv crawler/.venv
        source crawler/.venv/bin/activate
        pip3 install -r crawler/requirements.txt
    fi
    python3 crawler/setup.py
    echo "crawler finished"
fi