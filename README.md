# ScienceHub
ScienceHub is a platform aiming to provide a unified space for sharing, exploring, managing and discussing scientific research.

## Status
The codebase is in the process of rewriting, transitioning from Supabase to a fully-fledged [.NET backend](https://github.com/TudorOrban/ScienceHub-Backend) and plain PostgreSQL database. This repository contains the frontend code (Next.js 14, Typescript).

## Features
There are three main categories of features: **Research**, **Management** and **Community**.

### Research
**Works** are the basic blocks of scientific research. They can be **Papers**, **Experiments**, **Datasets**, **Data Analyses**, **AI Models** or **Code Blocks**. These can be organized into **Projects**, for unified management and visibility.

### Management
Projects and works are updated through a custom [version control system](https://github.com/TudorOrban/ScienceHub-Backend/blob/main/main/version-control-system/README.md) built from scratch to accommodate the needs of the website. **Submissions**, akin to git commits, are blocks holding changes between project or work versions. There are also **Issues** and (Community) **Reviews**.

### Community
This includes real-time **Discussions** and **Chats**, as well as **Team** management.

These features show up throughout the main page directories:
- **Workspace**: A comprehensive space through which the user can manage their work.
- **Browse**: A unified space for browsing ScienceHub data.
- Other: **Profile** pages, **Project** pages, **Resources**

For an in-depth look at these features and our motivations for introducing them, see the Resources pages within the website.

## How to use
ScienceHub is not yet deployed. To run it locally, follow these steps:
1. Ensure you have installed: Docker, Minikube/Docker Compose and a newer version of Node.
2. Fetch the [backend](https://github.com/TudorOrban/ScienceHub-Backend). From the root, run `cd scripts` and then the `StartMinikube` script, depending on your operating system. This will build the images for the backend microservices and register corresponding deployments and services in Minikube.
3. Expose the API Gateway with `kubectl port-forward sciencehub-backend-api-gateway 8082:8082`. If you need to work with a service's database, also expose `postgresql-core 5432:5432` or `postgresql-community 5433:5433`.
4. Fetch the [frontend](https://github.com/TudorOrban/ScienceHub-Frontend) and run from the root `npm install`, `npm run dev`. Now you can use the app by accessing it in the browser at `http://localhost:3000`.

## Contributing
At ScienceHub, we are guided by an open-source, community-driven philosophy. As such, any contributions are warmly welcomed. See [CONTRIBUTING.md](https://github.com/TudorOrban/ScienceHub-Frontend/blob/main/CONTRIBUTING.md).