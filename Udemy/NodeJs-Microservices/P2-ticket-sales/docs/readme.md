note install specific version of express and ts

# pre-requisite

Install skaffold, kubectl, docker

```shell
brew install skaffold
```

Start a local Kubernetes cluster (e.g., Docker Desktop → enable Kubernetes)

```shell
minikube start
```

Install the NGINX Ingress Controller

```shell
minikube addons enable ingress

# need this to route request into minikube k8s cluster:
minikube tunnel
# need this because minikube tunnel only works with LoadBalancer type services, while The ingress-nginx-controller service is of type NodePort, not LoadBalancer.
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p '{"spec": {"type": "LoadBalancer"}}'
```

Add 127.0.0.1 ticketing.dev to hosts

```shell
echo "127.0.0.1  ticketing.dev" | sudo tee -a /etc/hosts
```

![](./img/ingress.svg)

```shell
# 5. Run skaffold
# skaffold dev:
#   - builds Docker image for each artifact (e.g. shawn/auth) locally
#   - applies all k8s manifests in ./infra/k8s/* via kubectl
#   - watches for file changes (including package.json): syncs .ts files directly into the running container (no rebuild)
#   - streams logs from all pods to the terminal
#   - tears everything down on Ctrl+C
cd /Users/lixueshuo/spoonlee/spoonlee1/Udemy/NodeJs-Microservices/P2-ticket-sales
skaffold dev



# visist ticketing.dev/api/users/currentuser

# if minikube tunnel approach not work, do this:
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8080:80
curl http://localhost:8080/api/users/currentuser -H "Host: ticketing.dev"
```
