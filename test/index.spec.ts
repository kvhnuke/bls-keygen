import {mnemonicToSecretKey, generateRandomSecretKey} from "../src";
import {expect} from "chai";
import {generateMnemonic} from "bip39";

describe("random private key", function () {

  it("should generate with given entropy", function () {
    const key = generateRandomSecretKey(Buffer.alloc(32)).toString("hex");
    const key1 = generateRandomSecretKey(Buffer.alloc(32)).toString("hex");
    expect(key).to.not.be.equal(key1);
  });

  it("should generate without given entropy", function () {
    const key = generateRandomSecretKey().toString("hex");
    const key1 = generateRandomSecretKey().toString("hex");
    expect(key).to.not.be.equal(key1);
  });

});

describe("private key from mnemonic", function () {

  it("should generate using default path", function () {
    const mnemonic = generateMnemonic();
    const key = mnemonicToSecretKey(mnemonic);
    const key1 = mnemonicToSecretKey(mnemonic);
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.be.equal(key1.toString("hex"));
  });

  it("should generate using given path", function () {
    const mnemonic = generateMnemonic();
    const key = mnemonicToSecretKey(mnemonic, "m/12381/60/0/1");
    const key1 = mnemonicToSecretKey(mnemonic, "m/12381/60/0/2");
    expect(key).to.not.be.null;
    expect(key.toString("hex")).to.not.be.equal(key1.toString("hex"));
  });

});