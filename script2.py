import sys
import mariadb
import requests,json

headers = {'Content-Type' : 'application/json'}
try:
    conn = mariadb.connect(
        user="student",
        password="Tk0Uc2o2mwqcnIA",
        host="unixshell.hetic.glassworks.tech",
        port=27116,
        database="sakila"

    )
    cursor = conn.cursor()
    query2 = "SELECT name FROM category"
    url = "https://localhost/categories"
    cursor.execute(query2.format())
    while True:
        result = cursor.fetchmany(64)
        if not result:
            break
        for list_app in result:
            payload={"name":list_app[0]}
            print(json.dumps(payload))
            r = requests.post(url, headers=headers,data=json.dumps(payload), verify = False)
            body = r.json()
            print(body)
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)