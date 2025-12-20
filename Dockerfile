# ----------------------------
# Stage 1: Build Angular app
# ----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci --silent

# Copy the source code
COPY . .

# Build the Angular app (ensure outputPath in angular.json is "docs")
RUN npm run build -- --configuration production

# ----------------------------
# Stage 2: Serve with nginx
# ----------------------------
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app
COPY --from=builder /app/docs /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Ensure permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
