const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped = bumped.replace(verifierRegex, 'contract HelloWorldVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment

let content2_Multiplier = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8'});
let bumpedMultiplier = content2_Multiplier.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumpedMultiplier = bumpedMultiplier.replace(verifierRegex, 'contract Multiplier3Verifier');

fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumpedMultiplier);

let PlonkMultiplier3 = fs.readFileSync("./contracts/_plonkMultiplier3Verifier.sol", { encoding: 'utf-8'});
let bumped_plonk = PlonkMultiplier3.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped_plonk = bumped_plonk.replace(verifierRegex, 'contract _plonkMultiplier3Verifier');

fs.writeFileSync("./contracts/_plonkMultiplier3Verifier.sol", bumped_plonk);