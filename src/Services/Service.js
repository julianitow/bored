//module for each service to implement

import { exec } from 'child_process';
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const remoteDir = process.env.REMOTE_DIR;
const sshKey = process.env.SSH_KEY;

/**
 * Send file over sftp
 * @param {*} filename String
 */
export function sftp(filename) {
    //TODO use ssh2-sftp-client module 
    // https://openbase.com/js/ssh2-sftp-client
    console.log(filename);
}

export function getFreeSpace() {
    return new Promise((resolve, reject) => {
        exec(`ssh -i ${sshKey} ${user}@${host} df -h | grep sdb | awk \'{print $4}\'`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
}