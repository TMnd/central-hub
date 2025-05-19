docker run --rm -d --name postgres -e POSTGRES_PASSWORD=Pokemon123 -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres:17
