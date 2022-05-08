const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { groth16 } = require("snarkjs");

function unstringifyBigInts(o) {
    if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
        return BigInt(o);
    } else if ((typeof(o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o) ))  {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o===null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach( (k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

describe("HelloWorld", function () {
    let Verifier;
    let verifier;

    beforeEach(async function () {
        Verifier = await ethers.getContractFactory("HelloWorldVerifier");
        verifier = await Verifier.deploy();
        await verifier.deployed();
    });

    it("Should return true for correct proof", async function () {
        //[assignment] Add comments to explain what each line is doing
        // Here, we generate the proof and withness
        const { proof, publicSignals } = await groth16.fullProve({"a":"1","b":"2"}, "contracts/circuits/HelloWorld/HelloWorld_js/HelloWorld.wasm","contracts/circuits/HelloWorld/circuit_final.zkey");

        console.log('1x2 =',publicSignals[0]);

        // Format the json output and convert to integer
        const editedPublicSignals = unstringifyBigInts(publicSignals);

        // Format the proof from raw state
        const editedProof = unstringifyBigInts(proof);

        // Simulate the verification call to get the call data.
        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);
        
        // 53 ==> 58 Retrieve the paramaters
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        // Perform onchain call and verify result
        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
    });

    it("Should return false for invalid proof", async function () {
        let a = [0, 0];
        let b = [[0, 0], [0, 0]];
        let c = [0, 0];
        let d = [0]
        expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
    });
});


describe("Multiplier3 with Groth16", function () {

    beforeEach(async function () {
        //[assignment] insert your script here
        Verifier_Multiplier3 = await ethers.getContractFactory("Multiplier3Verifier");
        verifier_Multiplier3 = await Verifier_Multiplier3.deploy();
        await verifier_Multiplier3.deployed();
    });

    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here
        // // Get and format inputs from the verification file
        // var gArray = JSON.parse("[" + fs.readFileSync("./circuits/Multiplier3/verification.json") + "]");
        
        // // Simulate and verify that proof is correct
        // expect(await verifier_Multiplier3.verifyProof(gArray[0], gArray[1], gArray[2], gArray[3])).to.be.true

        // Here, we generate the proof and withness
        const { proof, publicSignals } = await groth16.fullProve({"a":"1","b":"2","c":"3"}, "contracts/circuits/Multiplier3/Multiplier3_js/Multiplier3.wasm","contracts/circuits/Multiplier3/circuit_final.zkey");

        console.log('1x2 =',publicSignals[0]);

        // Format the json output and convert to integer
        const editedPublicSignals = unstringifyBigInts(publicSignals);

        // Format the proof from raw state
        const editedProof = unstringifyBigInts(proof);

        // Simulate the verification call to get the call data.
        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);
        
        // 53 ==> 58 Retrieve the paramaters
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        // Perform onchain call and verify result
        expect(await verifier_Multiplier3.verifyProof(a, b, c, Input)).to.be.true;
    });

    it("Should return false for invalid proof", async function () {
        //[assignment] insert your script here

        // Here we use array of zeros to verify if the proof is not correct
        let a_ = [0, 0];
        let b_ = [[0, 0], [0, 0]];
        let c_ = [0, 0];
        let d_ = [0];
        expect(await verifier_Multiplier3.verifyProof(a_, b_, c_, d_)).to.be.false;
    });
});


describe("Multiplier3 with PLONK", function () {
    let Verifier_plonk;
    let verifier_plonk;

    beforeEach(async function () {
        //[assignment] insert your script here
        Verifier_plonk = await ethers.getContractFactory("_plonkMultiplier3Verifier");
        verifier_plonk = await  Verifier_plonk.deploy();
        await verifier_plonk.deployed();
    });

    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here

        // // Get and format inputs from the verification file
        // var testData = fs.readFileSync("./Multiplier3/Verification_key.json", 'utf-8');
        // var param = testData.split(',');

        // // Verify that the proof is correct
        // expect(await veverifier_plonk.verifyProof(param[0], JSON.parse(params[1]))).to.be.true;

        // Here, we generate the proof and withness
        const { proof, publicSignals } = await groth16.fullProve({"a":"1","b":"2","c":"3"}, "contracts/circuits/Multiplier3/Multiplier3_js/Multiplier3.wasm","contracts/circuits/Multiplier3/circuit_final.zkey");

        console.log('1x2 =',publicSignals[0]);

        // Format the json output and convert to integer
        const editedPublicSignals = unstringifyBigInts(publicSignals);

        // Format the proof from raw state
        const editedProof = unstringifyBigInts(proof);

        // Simulate the verification call to get the call data.
        const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);
        
        // 53 ==> 58 Retrieve the paramaters
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        // Perform onchain call and verify result
        expect(await verifier_plonk.verifyProof(a, b, c, Input)).to.be.true;
    });
    it("Should return false for invalid proof", async function () {
        //[assignment] insert your script here

        // Here we use array of zeros to verify if the proof is not correct
        let a_ = [0, 0];
        let b_ = [[0, 0], [0, 0]];
        let c_ = [0, 0];
        let d_ = [0];
        expect(await verifier_Multiplier3.verifyProof(a_, b_, c_, d_)).to.be.false;
    });
});