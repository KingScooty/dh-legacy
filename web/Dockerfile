FROM node:6.2
# FROM wildflame/grunt-runner

# Set env here to avoid
# ENV NODE_ENV=production

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

COPY package.json /usr/src/web/
RUN npm install --production

COPY . /usr/src/web

# Install bower
# RUN npm install -g bower # grunt-cli

# WORKDIR src/web
# RUN bower install --allow-root

# Expose port
EXPOSE 3000

# Run web using nodemon
CMD ["npm", "start"]
