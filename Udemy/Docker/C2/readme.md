C2 Manipulating Containers uising docker client





# Key takeaways



```js
docker run

docker ps

docker create

docker start

docker stop
docker kill
```











## docker run in detail

```sh
docker run <iamge name>
```

what's behind the scene of running it



## overriding default command

P13

```sh
docker run <iamge name> <command>
```



e.g.

```sh
(base) ➜  ~ docker run busybox echo hi there
hi there
```



```sh
(base) ➜  ~ docker run busybox ls
bin
dev
etc
home
lib
lib64
proc
root
sys
tmp
usr
var
```

you see a lot of folders, they are coming from the file system snapshot in busybox image

+ but if you run `docker run hello-world ls`, it will pops error as hello-world image's file system snapshot has no `ls` command program 

what behind the scene is: 

+ first loaded the file system snapshot to your disk `docker create <image name>`
+ then run the 'startup command' in your running process `docker start <container id>`

![](./src_md/busybox1.png)



## list all running containers

```js
// firstly start a long-running docker instance
docker run busybox ping google.com

// then in another terminal run below to check all docker container running
docker ps
```



```js
// run below to check all container created 
docker ps --all
```





## container lifecycle



```js
docker run = docker create + docker start
```

```js
docker create <image name>
```

```js
docker start <container id>
```

e.g.

```js
docker create hello-world
<container-id> // returned here

docker start -a <container-id>		// -a means watch for this container's output and print it in terminal, if no '-a' in this command container's output will not be displayed in terminal
```



restarting stopped container

```js
(base) ➜  ~ docker run busybox echo hi there
hi there

(base) ➜  ~ docker ps --all
CONTAINER ID   IMAGE     COMMAND           CREATED          STATUS                      PORTS     NAMES
21095999b08d   busybox   "echo hi there"   15 seconds ago   Exited (0) 14 seconds ago             flamboyant_galileo

(base) ➜  ~ docker start -a 21095999b08d v   // this re-issue the startup command which restart the container
hi there
 
```

remove stopped containers

```js
(base) ➜  ~ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] 
```



retrive logs

+ not running container again but just retrive logs

```js
(base) ➜  ~ docker create busybox echo hi there
dda0062b60a5d0db85be941e9258d95bd2b8efdcc97109e652f1d486d71ae68e
(base) ➜  ~ docker start dda0062b60a5d0db85be941e9258d95bd2b8efdcc97109e652f1d486d71ae68e
dda0062b60a5d0db85be941e9258d95bd2b8efdcc97109e652f1d486d71ae68e
(base) ➜  ~ docker logs dda0062b60a5d0db85be941e9258d95bd2b8efdcc97109e652f1d486d71ae68e
hi there

```



stopping a running container 

```js
docker stop <container id>		// give some grace time for the container to stop
// or   
docker kill <container id>		// stop the container immediately
```





## Multi-command container 

p20





Executing command in running container







IT flag





getting a command prompt in a container 





starting with a shell





container isolation