# Together-We-Are-Strong

很好聽的歌～

[![Together We're Strong](https://img.youtube.com/vi/5TJebt_lUmk/0.jpg)](https://www.youtube.com/watch?v=5TJebt_lUmk)

## 專案簡介

「Together we are strong」是一個為大學生設計的多功能選課系統，不僅提供基本的選課以及查詢功能，還提供了互動性極高的揪團修課以及群聊功能。該平台的設計宗旨在於協助學生在選課過程中可以互相合作，讓每位學生可以發起揪團修課活動，甚至在群組聊天室中即時交流想法，讓學生在選課階段就可以方便地找到修課夥伴。

「Together we are strong」讓選課不再是單純的選課，而是創造一個能讓學生和朋友一起學習、共同修課的選課系統！

:link: **[展示影片連結]([https://youtu.be/](https://youtu.be/HeTcHs37qjo))**

## Prerequisite

- 請確定有安裝好 docker 與 docker-compose
- 請確定 port `3000`, `8080`, `5432` 是空的，因為這些 port 分別會被 `next`, `flask`, `pgdb` 三個 docker container 使用
- 請確定 `python3` 與 `pip3` 是合法的指令，如果不是請自行建立 symbolic link

## Run
- 如果是第一次執行此專案，請執行以下指令：
  - 此指令會建置一份全新的資料庫，並會自動把爬蟲爬下來的資料 insert 進資料庫
```bash
./run.sh new
```
- 如果資料庫已建置完成，請執行以下指令：
  - 此指令將使用已經建置好的資料庫
```bash
./run.sh
```
- 可以使用以下指令將服務下線：
```bash
docker-compose down
```

**Notes:** `./run.sh new` 會自動執行 `crawler/main.py`，需要約 10 分多鐘，以下為各個部分大概的執行時間：
```txt
Execution time for init: 2.1874 seconds
Execution time for department: 0.0485 seconds
Execution time for admin: 13.2256 seconds
Execution time for professor: 618.0152 seconds
Execution time for student: 9.4557 seconds
Execution time for course: 1.1863 seconds
Execution time for section: 11.6261 seconds
Execution time for syllabus: 17.1852 seconds
```

## 技術細節

- 使用 PostgreSQL 為資料庫
- 使用 Next.js 為前端框架
- 使用 Flask 為後端框架，並使用 Flask-SQLAlchemy (wrapper around SQLAlchemy ORM) 對資料庫進行操作
- 使用 docker 將服務 containerize
- 使用 docker-compose 來控管所有 docker container

- **併行控制**：因為使用了 SQLAlchemy，預設就會是 transaction，因此所有 endpoint 的操作都能確保正確。

## 資料夾說明

- **`backend/`**
  - 包含所有後端程式碼
  - `backend/application/route/` 中有各種提供的 route
  - `backend/applciation/route/` 中的各個檔案中描述了該 route 之下的 endpoint
  - `backend/application/models.py` 有對 database schema 的描述
- **`frontend/`**
  - 包含所有前端程式碼

