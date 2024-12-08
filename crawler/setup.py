import psycopg2
import time

db_config = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": 5432,  # Default PostgreSQL port
}

connected = False
while not connected:
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        connected = True
    except Exception as e:
        print(f"ERROR: {e}")

time.sleep(2)

# departments
departments = [
    {"id": "9020", "name": "資訊工程學系", "trivial_name": "資工系"},
    {"id": "3030", "name": "經濟學系", "trivial_name": "經濟系"},
    {"id": "7020", "name": "會計學系", "trivial_name": "會計系"},
    {"id": "1010", "name": "法律學系", "trivial_name": "法律系"},
    {"id": "4040", "name": "心理學系", "trivial_name": "心理系"},
    {"id": "6060", "name": "國際企業學系", "trivial_name": "國企系"},
    {"id": "8080", "name": "電機工程學系", "trivial_name": "電機系"},
]

for d in departments:
    insert_query = """
        INSERT INTO "department" (id, name, trivial_name)
        VALUES (%s, %s, %s)
    """
    data_tuple = tuple(d.values())
    cursor.execute(insert_query, data_tuple)

conn.commit()

# course
courses = [
    {
        "id": "CSIE5043",
        "name": "機器學習",
        "credits": 3,
        "type": "選修",
        "department_id": "9020",
    },
    {
        "id": "CSIE1010",
        "name": "程式設計導論",
        "credits": 3,
        "type": "必修",
        "department_id": "9020",
    },
    {
        "id": "ECON2021",
        "name": "微觀經濟學",
        "credits": 3,
        "type": "必修",
        "department_id": "3030",
    },
    {
        "id": "ECON3045",
        "name": "國際貿易",
        "credits": 3,
        "type": "選修",
        "department_id": "3030",
    },
    {
        "id": "ACC3012",
        "name": "成本會計",
        "credits": 3,
        "type": "必修",
        "department_id": "7020",
    },
    {
        "id": "ACC4018",
        "name": "審計學",
        "credits": 3,
        "type": "選修",
        "department_id": "7020",
    },
    {
        "id": "LAW2020",
        "name": "憲法學",
        "credits": 3,
        "type": "必修",
        "department_id": "1010",
    },
    {
        "id": "LAW3040",
        "name": "智慧財產權法",
        "credits": 2,
        "type": "選修",
        "department_id": "1010",
    },
    {
        "id": "PSY1011",
        "name": "心理學概論",
        "credits": 3,
        "type": "必修",
        "department_id": "4040",
    },
    {
        "id": "PSY2022",
        "name": "社會心理學",
        "credits": 3,
        "type": "選修",
        "department_id": "4040",
    },
    {
        "id": "IBUS5010",
        "name": "國際市場行銷",
        "credits": 3,
        "type": "選修",
        "department_id": "6060",
    },
    {
        "id": "IBUS6015",
        "name": "跨文化管理",
        "credits": 2,
        "type": "必修",
        "department_id": "6060",
    },
    {
        "id": "EE3020",
        "name": "電磁學",
        "credits": 3,
        "type": "必修",
        "department_id": "8080",
    },
    {
        "id": "EE4050",
        "name": "類比電路設計",
        "credits": 3,
        "type": "選修",
        "department_id": "8080",
    },
]

for c in courses:
    insert_query = """
        INSERT INTO "course" (id, name, credits, type, department_id)
        VALUES (%s, %s, %s, %s, %s)
    """
    data_tuple = tuple(c.values())
    cursor.execute(insert_query, data_tuple)

conn.commit()
