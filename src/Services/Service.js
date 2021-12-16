//module for each service to implement

import { exec } from 'child_process';
import dotenv from 'dotenv';
import { dialog } from '@electron/remote';
import Client from 'ssh2-sftp-client'; 
dotenv.config();

const host = process.env.HOST;
const username = process.env.USER;
const password = process.env.PASSWORD;
const remoteDir = process.env.REMOTE_DIR;
const sshKey = process.env.SSH_KEY;

/**
 * Send file over sftp
 * @param {*} file File
 */
export function sftp(file, type, controller) {
    const srcPath = file.path;
    const config = {
        host,
        username,
        password
    };
    const client = new Client('sftp-file-transfer');
    client.connect(config).then(() => {
        console.log(file.size);
        return client.fastPut(srcPath, `${remoteDir}/${type}/${file.name}`, {
            step: step => {
                const percent = Math.floor((step / file.size) * 100);
                controller.updateProgressView(percent);
            }
        });
    }).then(() => {
        controller.updateProgressView(0);
        dialog.showMessageBoxSync(null, {
            type: 'info',
            message: 'Finished !'
        });
        return client.end();
    }).catch(err => {
        console.error(err);
    });

}

export function getFreeSpace() {
    return new Promise((resolve, reject) => {
        exec(`ssh -i ${sshKey} ${username}@${host} df -h | grep sdb | awk \'{print $4}\'`, (err, stdout, stderr) => {
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