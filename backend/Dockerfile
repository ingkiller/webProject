FROM node:13

# enviroment variables
ENV NODE_ENV=""
ENV DIR /var/www

# install git (needed for forked npm repository)
RUN apt-get install -y git

# install
WORKDIR /var/www
COPY package*.json ./
RUN npm install .
COPY . .

EXPOSE 5000

CMD NODE_ENV=$NODE_ENV npm start
