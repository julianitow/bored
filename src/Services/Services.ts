//module for each service to implement

import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import { dialog } from '@electron/remote';
import Client from 'ssh2-sftp-client'; 
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { ApplicationController } from '../ApplicationController/ApplicationController';
dotenv.config({path: path.join(__dirname, '../conf/.env')});

const DIR_TYPE = '';

const host: string = process.env.HOST;
const username: string = process.env.USER;
const password: string = process.env.PASSWORD;
const remoteDir: string = process.env.REMOTE_DIR;
const sshKey: string = process.env.SSH_KEY;

//TODO finish recursive implementation 
/*function readDirectory(path, callback, endCallback) {
    fs.readdir(path, (err, files) => {
        if (err) return endCallback(err);
        files.forEach(file => {
            fs.stat(path.join(path, file), (err, stats) => {
                if(err) endCallback(err);
                if(stats.isDirectory()) {
                    readDirectory(path.join(path, file), callback, () => {
                        pending--;
                        if(pending === 0) {
                            return endCallback(null);
                        }
                    });
                } else {

                }
            });
        });
    });
};*/

/**
 * Send file over sftp
 * @param {*} file File
 */
export function sftp(file: File, type: string, controller: ApplicationController): void {
    const srcPath: string = file.path;
    const config: Record<string, unknown> = {
        host,
        username,
        password
    };
    const client: Client = new Client('sftp-file-transfer');
    client.connect(config).then(async () => {
        console.log(file);
        if (file.type === DIR_TYPE) {
            fs.readdir(file.path, (err, files) => {
                console.log("file", files);
            });
            client.on('upload', info => {
                console.log(info);
            });
            //let result = await client.uploadDir(srcPath, `${remoteDir}/${type}/${file.name}`);
            //console.log(result);
            return;
        }
        return client.fastPut(srcPath, `${remoteDir}/${type}/${file.name}`, {
            step: step => {
                const percent: number = Math.floor((step / file.size) * 100);
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

/**
 * get available space
 * @resolve String
 */
export function getFreeSpace(): Promise<string> {
    return new Promise((resolve, reject) => {
        if(sshKey !== '') {
            const cmd = `ssh -i ${sshKey} ${username}@${host} "df -h | grep sdb | awk '{print $4}'"`
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                }
                console.log('stdout', stdout);
                resolve(stdout);
            });
        } else {
            const options = {
                hostname: host,
                port: 3000,
                path: '/space',
                method: 'GET'
            };
            const req = http.request(options, res => {
                res.on('data', data => {
                    resolve(data.toString());
                }); 
            });

            req.on('error', err => {
                reject(err);
            });
            req.end();
        }
        
    });
}