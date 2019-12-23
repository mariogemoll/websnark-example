#!/bin/bash

set -ex

node_modules/.bin/circom

node_modules/.bin/snarkjs setup --protocol groth

node_modules/.bin/snarkjs calculatewitness

node test_snarkjs

node node_modules/websnark/tools/buildpkey.js

node node_modules/websnark/tools/buildwitness.js

node test_websnark
