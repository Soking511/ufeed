# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ---------- Runtime stage ------   ----
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add Angular-friendly nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=build /usr/src/app/docs /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
