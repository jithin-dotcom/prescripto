

# # # Stage 1: Build the app
# # FROM node:18-alpine AS build
# # WORKDIR /app
# # COPY package*.json ./
# # RUN npm install
# # COPY . .
# # RUN npm run build

# # # Stage 2: Serve with Nginx
# # FROM nginx:alpine
# # COPY --from=build /app/dist /usr/share/nginx/html
# # EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]





# # Stage 1: Build the app
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# # ✅ Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # ✅ Copy build output
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]







# Stage 1: Build the app
FROM node:18-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# ✅ Copy environment file before build
# COPY .env .env

# Copy the rest of the app
COPY . .

# Build the Vite app (environment is read here)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
