FROM node:7.10.1
MAINTAINER jissjoseph82@gmail.com
# set default workdir
WORKDIR /usr/src
ADD . /usr/src/
# Install app dependencies
RUN npm install
# Expose the application port and run application
EXPOSE 5000
CMD npm start
