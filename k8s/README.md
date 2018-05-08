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

In order to create the Deployment, run:

```bash
kubectl create -f seed-angular-deploy.yml
```

To create the Service, run:

```bash
kubectl create -f seed-angular-svc.yml
```

Get the minikube ip with the following command:

```bash
minikube ip
```

Browse to http://minikubeip:30001 in order to get the landing page. The following command will open the Kubernetes dashboard:

```bash
minikube dashboard
```