###
# A simple Dockerfile which runs the E2E tests inside the container and generates a report.
# This base image contains git, just in case you want to clone an application inside this container
# and execute E2E tests against it (use `npm run tests:internal` for that, as it uses the wait-on lib).
###

FROM alpine:3.11.2
# Install bash
RUN apk update && apk add --no-cache bash

# Install git
RUN apk add --no-cache git
RUN git --version

# Install node and npm
RUN apk add nodejs
RUN apk add npm
RUN node --version
RUN npm --version

## Install browser + tools
RUN apk add chromium
RUN apk add lsof
RUN apk add curl

### Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

### BASE IMAGE END ###
# Below instructios can also be done in e.g. Gitlab CI/CD (.gitlab-ci.yml) by using the image above as base-image.
# You would simply configure the e2e project (see ENV below) and execute the tests via `npm run e2e`, plus
# handle the abort condition also inside your .gitlab-ci.yml file.
###

# copy app and install dependencies
COPY . /usr/src/app
RUN npm i

# configure project
ENV BROWSER chromium
ENV BROWSER_FLAGS ":headless --no-sandbox"
# below file will tell the CI/CD pipeline that at least 1 test failed (abort condition)
ENV TEST_FAIL_FILE=fail.txt

# run E2E tests
RUN chmod a+x /usr/src/app/e2e-testing.sh
RUN /usr/src/app/e2e-testing.sh