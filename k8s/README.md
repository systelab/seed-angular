# Kubernetes

In order to run the seed in Kubernetes in your laptop, download and start kubectl and Minikube.

If you are on macOS and using Homebrew package manager, you can install kubectl with:

```bash
brew install kubectl
```

Install Minikube according to the instructions for the [latest release](https://github.com/kubernetes/minikube/releases). Once installed, run

```bash
minikube start --vm-driver=virtualbox
```

In order to create the Deployments and services, run:

```bash
kubectl create -f mysql-deploy.yml
kubectl create -f mysql-svc.yml
kubectl create -f sedd-jee-deploy.yml
kubectl create -f seed-jee-svc.yml
kubectl create -f seed-angular-deploy.yml
kubectl create -f seed-angular-svc.yml
```

> Before running, update the file seed-angular-deploy.yml and set the seed-angular-pod environment BACKEND variable to reflect your cluster IP value.

Get the minikube ip with the following command:

```bash
minikube ip
```

Browse to http://minikubeip:30001 in order to get the landing page. The following command will open the Kubernetes dashboard:

```bash
minikube dashboard
```