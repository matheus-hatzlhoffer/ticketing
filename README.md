# Project to buy and sell tickets for concerts and events
#### This is a work in progress

This project uses React to serve the front-end and uses a node API with typescript to communicate with the database in mongoDB. The idea is to expand new services to the application, this is the list of all working services:
- [x] User Authentication

### Requirements

- Docker
- Kubernetes
- Skaffold

### how to run

1. Install docker, kubernetes and skaffold
2. On your machine, edit the hosts file so that the ticketing.dev URL is redirected to the Kubernetes local port
3. Create a secret with kubernetes using the command:
   `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_KEY>`
4. At the root of the project use the command
   `skaffold dev`
