#!/bin/bash

npm run test

#ls -lah /usr/src/app/e2e/reports/

if [ -e "/usr/src/app/reports/${TEST_FAIL_FILE}" ]; then
    echo "One or more E2E-Tests failed!"
    echo "!!! TERMINATING BUILD !!!"
    exit 1
fi
