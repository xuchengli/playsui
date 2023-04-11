#!/bin/bash
set -x
sui client publish --skip-fetch-latest-git-deps --gas-budget 100000000 ./example
