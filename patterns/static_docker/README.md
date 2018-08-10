The Docker setup for PHP applications using PHP7-FPM and Nginx described in http://geekyplatypus.com/dockerise-your-php-application-with-nginx-and-php7-fpm

## Instructions
1. Start Docker
  ```
  docker-compose up
  ```

  Sstart in detached mode
  ```
  docker-compose up -d
  ```

2. Navigate to localhost:8080

3. Stop Docker
  ```
  docker-compose stop
  ```

4. To clear cache
  ```
  docker system prune -a
  ```

That's it! You have your local PHP setup using Docker

*Example of activated PHP logging* - https://github.com/mikechernev/dockerised-php/tree/feature/log-to-stdout