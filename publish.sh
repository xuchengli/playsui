#!/bin/bash
set -x
sui client publish --skip-fetch-latest-git-deps --gas-budget 10000000000 ./example
