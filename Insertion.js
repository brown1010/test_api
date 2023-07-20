const mongoose = require('mongoose');
const User = require("./user.model");
const hash = require("object-hash");
const { timeStamp } = require('console');
const { Timestamp } = require('bson');
const { date } = require('joi');


const express = require("express");
const app = express();


async function insertUserInDb(user) {
    const usr = new User(user);

    await usr.save();

}

mongoose.connect('mongodb+srv://tundeANarchy:TUnDEaNArCHy1098@anarchyapi.sjcrato.mongodb.net/anarchy?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(async () => {
        console.log("DB Connected !!!");
        const startTime = Date.now();
        for (let i = 0; i < 10000; i++) {
            console.log("\n===> Inserting User-" + i);


            let username = `username-${i}`;
            let devicetype = `devicetype-${i}`;
            let manufacturer = `manufacturer-${i}`;
            let osplatform = `osplatform-${i}`;
            let socialLogin = `socialLogin -${i}`;
            let skinNfts = `skinNfts-${i}`;
            //let wallet = `wallet-${i}`;
            let activeclans = `activeclans-${i}`;
            let activeweapons = `activeweapons-${i}`;
            let activeskins = `activeskins-${i}`;
            let friends = `friends-${i}`;
            let networktype = `networktype-${i}`;
            let walletAddress = `walletAddresse-${i}`;

            let appversion = `appversion-${i}`;
            let lastUpdate = `lastUpdate-${i}`;
            let gaidfa = `gaidfa-${i}`;
            let ua = `ua-${i}`;
            let os = `os-${i}`;

            let user = new User({
                username,
                devicetype,
                osplatform,
                manufacturer,
                socialLogin,
                skinNfts,
                //wallet,
                //userType,
                activeclans,
                activeweapons,
                activeskins,
                networktype,
                walletAddress,
                //lastLogin,
                //createdAt,
                appversion,
                lastUpdate,
                gaidfa,
                ua,
                os
            })
            //created a clientId by concating :
            let cId = `${username}_${devicetype}_${osplatform}_${manufacturer}`

            // applying Md5 algo for hashing clientId :

            let encryptedclientID = hash.MD5(cId);
            let clientId = encryptedclientID;

            let devices = {
                devicetype,
                manufacturer,
                osplatform,
                clientId
            }
            user.devices.push(devices);
            insertUserInDb(user);
        }

        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        console.log(`Time taken: ${timeTaken} milliseconds`);
        console.log(`Time taken: ${timeTaken / 1000} seconds`);
    })
    .catch(err => {
        console.log("DB Connection Failed. Error : ", err);
    })

