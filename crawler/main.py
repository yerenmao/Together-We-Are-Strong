import os
import json
import time
import pickle
import psycopg2
import requests
import pandas as pd

DB_CONFIG = {
    "dbname": "postgres",
    "user": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": 5432,  # Default PostgreSQL port
}

path = os.getcwd()

DIR = "pickle"
ADMIN_PKL = f"{path}/crawler/{DIR}/NTU_Admin.pkl"
COURSE_PKL = f"{path}/crawler/{DIR}/NTU_Course.pkl"
DEPERTMENT_PKL = f"{path}/crawler/{DIR}/NTU_Department.pkl"
PROFESSOR_PKL = f"{path}/crawler/{DIR}/NTU_Professor.pkl"
STUDENT_PKL = f"{path}/crawler/{DIR}/NTU_Student.pkl"
SYLLABUS_PKL = f"{path}/crawler/{DIR}/NTU_Syllabus.pkl"


def execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(
            f"Execution time for {func.__name__}: {end_time - start_time:.4f} seconds"
        )
        return result

    return wrapper


@execution_time
def init():
    time.sleep(1)
    connected = False
    while not connected:
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()
            connected = True
        except Exception as e:
            pass  # print(f"ERROR: {e}")
    time.sleep(1)
    return conn, cursor


@execution_time
def department(conn, cursor):
    with open(DEPERTMENT_PKL, "rb") as f:
        df = pickle.load(f)
    departments = [tuple(row) for row in df.to_records(index=False)]
    for d in departments:
        insert_query = """
            INSERT INTO "department" (id, name, trivial_name)
            VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, d)
    conn.commit()


@execution_time
def admin():
    with open(ADMIN_PKL, "rb") as f:
        df = pickle.load(f)
    data = []
    for _, row in df.iterrows():
        data.append(
            {
                "id": row["id"],
                "name": row["部門名稱"],
                "email": row["email"],
                "passwd": row["密碼"],
                "role": row["身份"],
                "department_id": row["科系代碼"],
            }
        )
    body = {"bulk": data}
    response = requests.post("http://localhost:8080/api/create/bulkuser", json=body)
    if response.status_code != 200:
        raise Exception("professor failed.")


@execution_time
def professor():
    with open(PROFESSOR_PKL, "rb") as f:
        df = pickle.load(f)
    data = []
    for _, row in df.iterrows():
        data.append(
            {
                "id": row["id"],
                "name": row["姓名"],
                "email": row["E-Mail地址"],
                "passwd": row["密碼"],
                "role": row["身份"],
                "department_id": row["dptname"],
            }
        )
    body = {"bulk": data}
    response = requests.post("http://localhost:8080/api/create/bulkuser", json=body)
    if response.status_code != 200:
        raise Exception("professor failed.")


@execution_time
def student(conn, cursor):
    with open(STUDENT_PKL, "rb") as f:
        df = pickle.load(f)
    df = df[["student_id", "姓名", "email", "身份", "dept_code"]]
    result_tuples = df.apply(tuple, axis=1).tolist()

    for r in result_tuples:
        insert_query = """
            INSERT INTO "user" (id, name, email, role, department_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, r)
    conn.commit()


@execution_time
def course(conn, cursor):
    with open(COURSE_PKL, "rb") as f:
        course_df = pickle.load(f)

    with open(DEPERTMENT_PKL, "rb") as f:
        dept_df = pickle.load(f)

    merged_df = pd.merge(
        course_df, dept_df, left_on="授課對象", right_on="部門名稱", how="left"
    )
    unique_df = merged_df.drop_duplicates(subset=["課號"], keep="first").copy()
    unique_df["學分"] = unique_df["學分"].astype(float).astype(int)
    filtered_df = unique_df[["課號", "課程名稱", "學分", "必/選修", "科系代碼"]]
    result_tuples = filtered_df.apply(tuple, axis=1).tolist()

    for r in result_tuples:
        insert_query = """
            INSERT INTO "course" (id, name, credits, type, department_id)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, r)
    conn.commit()


@execution_time
def section(conn, cursor):
    with open(COURSE_PKL, "rb") as f:
        section_df = pickle.load(f)

    with open(PROFESSOR_PKL, "rb") as f:
        prof_df = pickle.load(f)

    chr2num = {"A": 11, "B": 12, "C": 13, "D": 14}

    def process_number(number_str):
        if number_str == "10":
            return [10]
        else:
            return [int(digit) for digit in number_str]

    def parse_time(time_str):

        if not time_str:
            return {}
        result = {}
        current_key = None
        current_number = ""

        for part in time_str:
            # 如果是中文字符，作為 key
            if "\u4e00" <= part <= "\u9fff":
                if current_number:
                    result[current_key].extend(process_number(current_number))
                    current_number = ""
                current_key = part
                if current_key not in result:
                    result[current_key] = []
            # 如果是數字，直接加入當前 key 的值
            elif part.isdigit():
                current_number += part
                # result[current_key].append(int(part))
            # 如果是 A, B, C，轉換後加入當前 key 的值
            elif part in chr2num:
                if current_number:
                    result[current_key].extend(process_number(current_number))
                    current_number = ""
                result[current_key].append(chr2num[part])
        if current_number:
            result[current_key].extend(process_number(current_number))

        return result

    merged_df = pd.merge(
        section_df, prof_df, how="left", left_on="授課教師", right_on="姓名"
    )
    merged_df = merged_df[
        ["流水號", "學年-學期", "時間", "教室", "總人數", "課號", "id"]
    ]
    merged_df["總人數"] = merged_df["總人數"].astype(int)
    merged_df["時間"] = merged_df["時間"].apply(parse_time)
    merged_df["時間"] = merged_df["時間"].apply(
        lambda x: json.dumps(x, ensure_ascii=False)
    )
    result_tuples = merged_df.apply(tuple, axis=1).tolist()
    for r in result_tuples:
        insert_query = """
            INSERT INTO "section" ("section_id", "semester", "time", "classroom", "max_students", "course_id", "professor_id")
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, r)
    conn.commit()


@execution_time
def syllabus(conn, cursor):
    with open(SYLLABUS_PKL, "rb") as f:
        syllabus_df = pickle.load(f)

    with open(COURSE_PKL, "rb") as f:
        course_df = pickle.load(f)

    with open(PROFESSOR_PKL, "rb") as f:
        professor_df = pickle.load(f)

    num_list = course_df["流水號2.0"].drop_duplicates().to_list()
    professor_df = professor_df[["姓名", "id"]]
    filtered_df = syllabus_df[syllabus_df["流水號"].isin(num_list)]
    merged_df = pd.merge(
        filtered_df, professor_df, how="left", left_on="授課教師", right_on="姓名"
    )
    selected_columns = [
        "課程概述",
        "課程目標",
        "課程要求",
        "預期每週課後學習時數",
        "Office Hours",
        "指定閱讀",
        "參考書目",
        "id",
        "流水號",
    ]
    merged_df = merged_df[selected_columns]
    merged_df = merged_df[~merged_df["id"].isna()]

    query = """
        SELECT id, section_id, semester FROM "section";
    """
    cursor.execute(query)
    result = cursor.fetchall()
    df = pd.DataFrame(result, columns=["ID", "section_id", "semester"])
    df["section_id"] = df["semester"].str.replace("-", "") + df["section_id"].astype(
        str
    )
    merged_df = pd.merge(
        merged_df, df, how="left", left_on="流水號", right_on="section_id"
    )
    selected_columns = [
        "課程概述",
        "課程目標",
        "課程要求",
        "預期每週課後學習時數",
        "Office Hours",
        "指定閱讀",
        "參考書目",
        "ID",
    ]
    final_df = merged_df[selected_columns]
    result_tuples = final_df.apply(tuple, axis=1).tolist()

    for r in result_tuples:
        insert_query = """
            INSERT INTO "syllabus" ("overview", "objective", "requirement", "expected_weekly_study_hours", "office_hours", "textbook", "reference", "section_id")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, r)
    conn.commit()


if __name__ == "__main__":
    conn, cursor = init()
    department(conn, cursor)
    admin()
    professor()
    student(conn, cursor)
    course(conn, cursor)
    section(conn, cursor)
    syllabus(conn, cursor)
