kubectl create -f mysql-deploy.yml
kubectl create -f mysql-svc.yml

kubectl create -f seed-jee-deploy.yml
kubectl create -f seed-jee-svc.yml

kubectl create -f seed-angular-deploy.yml
kubectl create -f seed-angular-svc.yml
