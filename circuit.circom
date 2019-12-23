// Taken from https://github.com/iden3/circom/blob/master/TUTORIAL.md

template Multiplier() {
    signal private input a;
    signal private input b;
    signal output c;
    
    c <== a*b;
}

component main = Multiplier();
