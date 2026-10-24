
# Node.js 22 aur lightweight Alpine Linux se start karo.
FROM node:22-alpine 

# Container ke andar working directory /app set karo.
WORKDIR /app

# npm configuration aur lockfile copy karo.
COPY package*.json ./

#Lockfile ke according dependencies install karo.
RUN npm ci

#Backend folder ka remaining code container mein copy karo.
COPY . .

# Document karta hai ki app container ke andar port 1000 use karega.
EXPOSE 1000

# Container start hone par backend server run karo.
CMD ["node", "server.js"]



#After this file 

# 1 We will make an docker image
# docker build -t hirenova-backend .
#   docker build — build an image from your Dockerfile.
#   -t hirenova-backend — give the image a name.
#   . — use the current backend folder as the build context



# 2 Create and start the container
# docker run -d --name hirenova-backend-local -p 1000:1000 hirenova-backend
#   - docker run — creates and starts a container.
#   - -d — runs it in the background.
#   - --name — assigns a name to the container.
#   - -p 1000:1000 — connects your computer's port 1000 to the container's port 1000.
#   - hirenova-backend — uses the image you built.

# Check that container is make 
# docker ps -a

# Stops the container
# docker rm hirenova-backend-local


#docker run -d --name hirenova-backend-local --env-file .env -p 1000:1000 hirenova-backend
# `--env-file .env. This tells Docker to load environment variables from your backend's .env file, including MONGODB_URL, without baking those values into the image.