Contributions to ScienceHub are highly encouraged and greatly appreciated. Whether you've found a bug, have a feature in mind, or see a need for documentation improvements, your input is valuable. We will soon add a roadmap covering the most pressing issues to work on, as well as our long-term goals.

## Github Workflow
1. Fork and fetch the frontend or backend repository.
2. Create a branch for your work with a suggestive name, eg `feature-add-x`.
3. Make your changes in your branch, keeping commits small and focused. Aim for clear commit messages that explain the "why" behind your changes.
4. Submit a pull request (PR) to the main repository once you're ready to share your contributions. Describe the changes you've made and any additional context that might help the review process.

## Get started developing
To run ScienceHub locally, follow these steps:
1. Ensure you have installed: Docker, Minikube/Docker Compose and a newer version of Node.
2. Fetch the [backend](https://github.com/TudorOrban/ScienceHub-Backend). From the root, run `cd scripts` and then the `StartMinikube` script, depending on your operating system. This will build the images for the backend microservices and register corresponding deployments and services in Minikube.
3. Expose the API Gateway with `kubectl port-forward sciencehub-backend-api-gateway 8082:8082`. If you need to work with a service's database, also expose `postgresql-core 5432:5432` or `postgresql-community 5433:5433`.
4. Fetch the [frontend](https://github.com/TudorOrban/ScienceHub-Frontend) and run from the root `npm install`, `npm run dev`. Now you can use the app by accessing it in the browser at `http://localhost:3000`.

## Style guides
We aim to maintain a clean and consistent codebase. Detailed style guides will be added soon. In the meantime, please adhere to the following general principles:

- Follow existing code conventions in the project.
- Use clear and descriptive names for variables, functions, and classes.
- Comment your code where necessary to explain complex logic.

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. We expect all participants to adhere to our Code of Conduct. Please read [Code of Conduct](https://github.com/TudorOrban/ScienceHub-Frontend/blob/main/CODE_OF_CONDUCT.md) to understand what behaviors will not be tolerated.

## Reporting Bugs or Requesting Features

### Bugs
If you encounter a bug, please report it to us by opening an issue. Provide as much detail as possible, including steps to reproduce the bug and any error messages or screenshots.

### Feature Requests
We welcome suggestions for new features. If there's something you'd like to see added to ScienceHub, please open a new issue, describe your idea, and explain how it would benefit users.

## Community and Support

Join us on Slack! It's a place for discussions, questions, and connecting with other contributors. Whether you need help getting started, have a question about a feature, or want to share ideas, our chat server is the place to be.

- [Join our Slack workspace](https://join.slack.com/t/sciencehub-hq/shared_invite/zt-2c1y5113m-FSpAPKQj4okKt8u6a3sEQw)
