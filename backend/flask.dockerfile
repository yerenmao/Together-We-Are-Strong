FROM python:3.14.0a1-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    postgresql-server-dev-all

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD [ "flask", "--app", "main", "run", "--host=0.0.0.0", "--port=8080"]