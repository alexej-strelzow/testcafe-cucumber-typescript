#!/bin/bash

npm run tests

#ls -lah /usr/src/app/reports/

if [ -e "/usr/src/app/reports/${TEST_FAIL_FILE}" ]; then
    echo "One or more E2E-Tests failed!"
    echo "!!! TERMINATING BUILD !!!"
    exit 1
fi
