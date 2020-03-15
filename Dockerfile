FROM node:12-stretch

# Install basic software
RUN apt-get update \
    && apt-get install -y wget

# Set the Chrome repo
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome
RUN apt-get update && apt-get -y install google-chrome-stable
RUN google-chrome --version

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm i
RUN npm i -g testcafe@1.7.0

# add app
COPY . /usr/src/app

# run E2E tests
# ***Note***: chrome:headless has known bug regarding downloading artifacts (https://bugs.chromium.org/p/chromium/issues/detail?id=696481)
ENV BROWSER chrome:headless
ENV BROWSER_FLAGS --no-sandbox
ENV TEST_FAIL_FILE=fail.txt

RUN chmod a+x /usr/src/app/e2e-testing.sh
RUN /usr/src/app/e2e-testing.sh