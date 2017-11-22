# `seed-angular` — Seed for Angular Systelab projects

This project is an application skeleton for a typical [Angular][Angular] frontend application. You can use it
to quickly bootstrap your projects and dev environment.

The seed contains a Patient Management sample application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant development gratification.

The app doesn't do much, just shows how to use different Angular standards and other suggested tools together, including the utilization of the libraries created by Systelab.

## Getting Started

To get you started you can simply clone the `seed-angular` repository and install the dependencies:

### Prerequisites

You need [git][git] to clone the `seed-angular` repository.

You will need [Node.js][node] and [npm][npm].

### Clone `seed-angular`

Clone the `seed-angular` repository using git:

```
git clone https://github.com/systelab/seed-angular.git
cd seed-angular
```

If you just want to start a new project without the `seed-angular` commit history then you can do:

```
git clone --depth=1 https://github.com/systelab/seed-angular.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

In order to install the dependencies you must run:

```
npm install
```

To launch the application you must run:

```
ng serve
```

[git]: https://git-scm.com/
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[Angular]: https://angular.io/
