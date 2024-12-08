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
    path="crawler/pickle/"
    prefix="NTU_"
    files=('Admin' 'Course' 'Department' 'Professor' 'Student' 'Syllabus')
    for file in "${files[@]}"; do
        if [[ ! -e "${path}${prefix}${file}.pkl" ]]; then
            unzip "${path}${prefix}${file}.pkl.zip" -d "${path}"
        fi
    done
    if [[ -d "crawler/.venv" ]]; then
        source crawler/.venv/bin/activate
    else
        python3 -m venv crawler/.venv
        source crawler/.venv/bin/activate
        pip3 install -r crawler/requirements.txt
    fi
    python3 crawler/main.py
    echo "crawler finished"
fi