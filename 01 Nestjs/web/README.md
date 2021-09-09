
#Comandos Docker
docker run --name web-mysql -e MYSQL_ROOT_PASSWORD=123456789 -e MYSQL_DATABASE=web -e MYSQL_USER=epn -e MYSQL_PASSWORD=epn12345678  -p 3010:3306 -d mysql:5.7 

