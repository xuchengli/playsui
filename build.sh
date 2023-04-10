#!/bin/bash
set -x
sui move build --dump-bytecode-as-base64 --path ${PWD}/example
