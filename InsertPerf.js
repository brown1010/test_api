const mongoose = require('mongoose');
const User = require("./user.model");
const hash = require("object-hash");
const { timeStamp } = require('console');
const { Timestamp } = require('bson');
const { date } = require('joi');
const { performance } = require('perf_hooks');


const express = require ("express");
const app = express();

/* const radash = require('radash');
const lodash = require('lodash'); */

async function insertUserInDb(user) {
    let usr = new User(user);
    await usr.save();

}

mongoose.connect('mongodb://localhost:27017/testdb1', { useNewUrlParser: true })
    .then(async () => {
        console.log("DB Connected !!!");

        function performTask() {
            for (let i = 0; i < 100000; i++) {
                console.log("\n===> Inserting User-" + i);



                /*   let date_time = new Date();
                  // get current hours
                  let hours = date_time.getHours();
       
                  // get current minutes
                  let minutes = date_time.getMinutes();
      
                  // get current seconds
                 let seconds = date_time.getSeconds();  
      
                 // prints date & time in YYYY-MM-DD HH:MM:SS format
                 console.log("starting time is -" ,hours + ":" + minutes + ":" + seconds); */

                /* var startTime = Date.now();
                var interval = setInterval(function () {
                    var elapsedTime = Date.now() - startTime;
                    var time = (elapsedTime / 1000).toFixed(3);
                    console.log(time);
                }, 10); */

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

                let aappversion = `appversion-${i}`;
                let lastUpdate = `lastUpdate-${i}`;
                let gaidfa = `gaidfa-${i}`;
                let ua = `ua-${i}`;
                let os = `os-${i}`;

                let user = {
                    username, devicetype, manufacturer, osplatform, socialLogin, skinNfts, activeclans,
                    activeweapons, activeskins, friends, networktype, walletAddress, aappversion, lastUpdate, gaidfa, ua, os
                };
                //created a clientId by concating :
                let cId = `${username}_${devicetype}_${osplatform}_${manufacturer}`

                // applying Md5 algo for hashing clientId :

                let encryptedclientID = hash.MD5(cId);
                user.clientId = encryptedclientID;



                //await insertUserInDb(user);
                insertUserInDb(user);

                /*  let endtime = Date.now();
     
                 let timetaken = `${startingtime}_${endtime}`
                 console.log(timetaken);  */

                //console.log("ending time is -" ,hours + ":" + minutes + ":" + seconds);
            }
        }
        const startTime = performance.now();

        performTask();

        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        console.log(`Time taken: ${timeTaken} milliseconds`);
        console.log(`Time taken: ${timeTaken / 1000} seconds`);
    })
    .catch(err => {
        console.log("DB Connection Failed. Error : ", err);
    }) 

    