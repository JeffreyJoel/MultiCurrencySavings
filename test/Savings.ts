import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Savings", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySavingsFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SavedToken = await ethers.getContractFactory("MyToken");
    const savedToken = await SavedToken.deploy(owner.address);

    const Savings = await ethers.getContractFactory("Savings");
    const savings = await Savings.deploy(savedToken.target);
    const zeroAddress = ethers.ZeroAddress;

    return { savedToken, savings, owner, otherAccount, zeroAddress };
  }

  describe("Deployment", function () {
    it("should check ether deposit", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      const deposit = await savings.depositEther({ value: depositAmount });

      expect(deposit.value).is.not.equal(0);
      // expect(owner.address).is.not.equal(
      //   "0x0000000000000000000000000000000000000000"
      // );
    });
    it("should check ether deposit", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      const deposit = await savings.depositEther({ value: depositAmount });

      expect(deposit.value).is.not.equal(0);
      // expect(owner.address).is.not.equal(
      //   "0x0000000000000000000000000000000000000000"
      // );
    });

    it("deposit ether", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      const deposit = await savings.depositEther({ value: depositAmount });
      const balance = await savings.getEtherBalance();

      expect(balance).is.equal(depositAmount);
    });
    it("should check withdraw account", async function () {
      
      const {  owner } = await loadFixture(deploySavingsFixture);
      expect(owner.address).is.not.equal(
        "0x0000000000000000000000000000000000000000"
      );
     
    });

    it("should check withdraw balance", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const { savings,  owner } = await loadFixture(deploySavingsFixture);
      const deposit = await savings.depositEther({ value: depositAmount })
      expect(await savings.getEtherBalance()).is.not.equal(0);
    });

    it("should withdraw ether", async function () {
      const depositAmount = ethers.parseEther("2.0");

      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      const deposit = await savings.depositEther({ value: depositAmount });
      await savings.withdrawEther();
      expect(await savings.getEtherBalance()).is.equal(0);
    });

    it("should validate deposit token", async function () {
      const amount = 1000;
      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      await savedToken.approve(savings.target, amount);

      expect(owner.address).is.not.equal(
        "0x0000000000000000000000000000000000000000"
      );

      // await savings.connect(owner).depositToken(amount);

    });

    it("should deposit token", async function () {
      const amount = 1;
      const { savedToken, savings, owner } = await loadFixture(
        deploySavingsFixture
      );
      await savedToken.approve(savings.target, amount);
      await savings.connect(owner).depositToken(amount);
      // const bal = await savings.connect(owner).getTokenBalance(owner);
      // console.log(bal);
      

   
 
    //  expect

    });
  });
});
