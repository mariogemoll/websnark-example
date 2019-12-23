const assert = require('assert');
const buildBn128 = require('websnark').buildBn128;
const fs = require('fs');
const snarkjs = require('snarkjs');

(async function() {
  const provingKey = snarkjs.unstringifyBigInts(JSON.parse(fs.readFileSync('proving_key.json', 'utf8')));
  const verifierKey = snarkjs.unstringifyBigInts(JSON.parse(fs.readFileSync('verification_key.json', 'utf8')));
  const witness = snarkjs.unstringifyBigInts(JSON.parse(fs.readFileSync('witness.json', 'utf8')));

  const {proof, publicSignals} = snarkjs.groth.genProof(provingKey, witness);
  if (snarkjs.groth.isValid(verifierKey, proof, publicSignals)) {
    console.log('OK');
  } else {
    console.log('FAILED');
    process.exit(1);
  }

  fs.writeFileSync('public.json', (JSON.stringify(snarkjs.stringifyBigInts(publicSignals))));
})();
