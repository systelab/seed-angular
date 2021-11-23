[![Build Status](https://travis-ci.org/systelab/seed-angular.svg?branch=master)](https://travis-ci.org/systelab/seed-angular)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/88aef97b995c4bd0ae6e7e615b663ec5)](https://www.codacy.com/app/alfonsserra/seed-angular?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=systelab/seed-angular&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/seed-angular/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/seed-angular?targetFile=package.json)

# `seed-angular` — Seed for Angular Systelab projects

This project is an application skeleton for a typical [Angular][Angular] frontend application. You can use it
to quickly bootstrap your projects and dev environment.

The seed contains a Patient Management sample application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant development gratification.

The app just shows how to use different Angular standards and other suggested tools together, including the utilization of the libraries created by Systelab.

## Getting Started
### Prerequisites

You need to install [git][git], [Node.js][node] 10 and [npm][npm].

### Clone `seed-angular`

Clone the `seed-angular` repository using git:

```bash
git clone https://github.com/systelab/seed-angular.git
cd seed-angular
```

### Install Dependencies

To install the dependencies you must run:

```bash
npm install
```
> In case you have any issue, remove the "node_modules" folder and execute the previous command again.

### Set the Server URL

In order to login, you need a backend. A JEE Backend is implemented in the https://github.com/systelab/seed-jee repository. A .net Backend is implemented in the https://github.com/systelab/seed-dotnet repository.

Check that the variable API_BASE_PATH in the file "environment.ts" contains your Server url and port. For example: http://127.0.0.1:13080/seed/v1'

### Run

To run the application use the following command:

```bash
ng serve
```

By default, the Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/

## Docker

### Build docker image

There is an Automated Build Task in Docker Cloud in order to build the Docker Image. 
This task, triggers a new build with every git push to your source code repository to create a 'latest' image.
There is another build rule to trigger a new tag and create a 'version-x.y.z' image

You can always manually create the image with the following command:

```bash
docker build -t systelab/seed-angular . 
```

The image created, will contain a [nginx server][nginx] with the application files.

Nginx (pronounced engine-x) is a free, open-source, high-performance HTTP server and reverse proxy, as well as an IMAP/POP3 proxy server. It's known for its high performance, stability, rich feature set, simple configuration, and low resource consumption.

As of September 2015, Nginx hosts nearly 12.18% (22.2M) of active sites across all domains. It powers several high-visibility sites, such as Netflix, Hulu, Pinterest, Cloudflare, Airbnb, WordPress.com, GitHub, ...

You can easily tweak the nginx config in [nginx/default.conf](nginx/default.conf), for example to [configure the server as https](http://nginx.org/en/docs/http/configuring_https_servers.html)

### Run the container

```bash
docker run -d -p 8081:80 systelab/seed-angular
```

The app will be available at http://localhost:8081

In order to change the backend server, you can set the variable BACKEND, for example:

```bash
docker run -d -e BACKEND='http://www.dep.com:8080' -p 8081:80 systelab/seed-angular
```

If not set, the default value will be http://localhost:8080

## Going native

Follow the [instructions](ELECTRON.md) to generate native desktop applications.

## Scaffolding

Take a look at [generator-systelab-angular repository](https://github.com/systelab/generator-systelab-angular), a [Yeoman ][yo] generator to scaffold a project based on the libraries and best practices used in this project.


[git]: https://git-scm.com/
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[Angular]: https://angular.io/
[nginx]: https://nginx.org/
[yo]: http://yeoman.io/
