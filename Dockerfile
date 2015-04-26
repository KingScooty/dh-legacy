FROM node:0.10-onbuild

# Install nodemon
# RUN npm install -g nodemon
RUN npm install -g bower grunt-cli

# WORKDIR src/app
RUN bower install --allow-root

# Expose port
EXPOSE 3000

# Run app using nodemon
CMD ["npm", "start"]
