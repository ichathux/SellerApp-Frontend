# Use the official Node.js image as base
FROM node:16.15.1 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli

RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app
RUN ng build --configuration=production

# Use a lightweight web server to serve the built app
FROM nginx:alpine

COPY --from=build /app/dist/seller-app-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

