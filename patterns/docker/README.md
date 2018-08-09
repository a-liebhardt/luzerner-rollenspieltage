# docker-static-files-serve
A simple docker ngnix webserver

Run this command to build
```
docker build -t some-name .
```

Once the build is complete run docker

```
docker run -p 5000:90 some-name
```

and to stop it use a new terminal window and type

```
docker ps # get the id of the running container
docker stop <container> # to kill it (gracefully)
```

Navigate to http://localhost:5000 to see the changes

Based on
https://github.com/arunkumars08/docker-static-files-serve

For detailed reference, visit this link
https://www.linkedin.com/pulse/serve-static-files-from-docker-via-nginx-basic-example-arun-kumar