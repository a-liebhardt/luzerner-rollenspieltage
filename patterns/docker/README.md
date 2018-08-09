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

Navigate to http://localhost:5000 to see the changes

To stop it use a new terminal window and type in
```
docker ps # get the id of the running container
docker stop <container> # to kill it (gracefully)
```

Is based on
https://github.com/arunkumars08/docker-static-files-serve

For detailed reference, visit this link
https://www.linkedin.com/pulse/serve-static-files-from-docker-via-nginx-basic-example-arun-kumar