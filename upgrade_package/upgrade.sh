#!/bin/bash
set -x
sui client upgrade --gas-budget 100000000 --upgrade-capability ${UpgradeCapId}