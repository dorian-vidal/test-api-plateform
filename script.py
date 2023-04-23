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
    query = "SELECT film.title,film.rental_rate,film.rating,category.category_id, count(inventory.film_id) from film_category  JOIN film ON film_category.film_id = film.film_id JOIN category on film_category.category_id = category.category_id JOIN inventory ON film.film_id = inventory.film_id GROUP BY film.film_id"
    url = "https://localhost/movies"
    cursor.execute(query.format())
    while True:
        result = cursor.fetchmany(64)
        if not result:
            break
        for list_app in result:
            some = list_app[3] + 16
            link = "/categories/" + str(some) 

            payload={"title":list_app[0],"rentalRate":float(list_app[1]),"rating":list_app[2],"category":link,"rental":list_app[4]}
            print(json.dumps(payload))
            r = requests.post(url, headers=headers,data=json.dumps(payload), verify = False)
            body = r.json()
            print(body)
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)