docker
https://www.youtube.com/watch?v=pg19Z8LL06w



Course website:  https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide

22 hrs course

+ a fruitful diagrams for explaination
+ a lot addresses on multiple container app





# Contents


+ [docker hands-on experiences](./hands-on/readme.md)
  + focus on common docker command used in practice


Part1: docker basics for single container

C2-C4

| Class               | Topic                                     | Description |
| ------------------- | ----------------------------------------- | ----------- |
| [2](./C2/readme.md) | Manipulating Container with docker client |             |
| [3](./C3/readme.md) | Build custom image through docker server  |             |
| 4                   | Make real project with docker             |             |



Part2: multiple containers & CI/CD & AWS

C5-C11

| Class | Topic                                                 | Description |
| ----- | ----------------------------------------------------- | ----------- |
| 5     | Docker composed of multiple local containers          |             |
| 6     | Create Production-Grade workflow                      |             |
| 7     | Continuous Integration & Deployment with AWS          |             |
| 8     | Building a Multi-Container Application                |             |
| 9     | 'Dokcerizing' multiple services                       |             |
| 10    | A continuous integration workflow for multiple images |             |
| 11    | Multi-Containers deployment to AWS                    |             |





Part3: K8S

C12-

| Class | Topic | Description |
| ----- | ----- | ----------- |
|       |       |             |
|       |       |             |
|       |       |             |









# Intro 

why use Docker

 



## what is Docker

+ image: single file that has all dependencies & configs  requried to run a program
+ Container: instance of an image, runs a program





behind the scenes of running 

```sh
docker run hello-world
```

+ docker server will firstly try to seek local image 'hello-world', if not find, it will try to seek one from Docker Hub (a remote repository)



## :bangbang: what really is container?

P10

+ operating system basics
  + kernel
  + linux-exclusive feature
    + namspacing: isolating resources per process
    + control groups: limit amount of resources used per resources

a pic here



relationnship between image and container





## how is docker running on my computer?

+ installing docker also installs a linux virtual machine, it runs on top of that linux virual machine
