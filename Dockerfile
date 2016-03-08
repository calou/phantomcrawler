FROM node:5.7.1

EXPOSE 8000

RUN apt-get update &&  \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        libsqlite3-dev \
        libfontconfig1-dev \
        libicu-dev \
        libfreetype6 \
        libssl-dev \
        libpng-dev \
        libjpeg-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ADD package.json /
ADD server.js /

RUN npm install

CMD ["node", "server.js"]