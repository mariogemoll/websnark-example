const assert = require('assert');
const buildBn128 = require('websnark').buildBn128;
const fs = require('fs');
const snarkjs = require('snarkjs');

(async function() {
  const bn128 = await buildBn128();

  const signals = fs.readFileSync('witness.bin');
  const provingKey = fs.readFileSync('proving_key.bin');
  const proofS = await bn128.groth16GenProof(signals.buffer, provingKey.buffer);

  const proof = snarkjs.unstringifyBigInts(proofS);
  const verifierKey = snarkjs.unstringifyBigInts(JSON.parse(fs.readFileSync('verification_key.json', 'utf8')));
  const pub = snarkjs.unstringifyBigInts(JSON.parse(fs.readFileSync('public.json', 'utf8')));

  if (snarkjs.groth.isValid(verifierKey, proof, pub)) {
    console.log('OK');
  } else {
    console.log('FAILED');
    process.exit(1);
  }
  bn128.terminate();
})();
