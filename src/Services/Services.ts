//module for each service to implement

import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import { dialog } from '@electron/remote';
import Client from 'ssh2-sftp-client'; 
import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import { ApplicationController } from '../ApplicationController/ApplicationController';
dotenv.config({path: path.join(__dirname, '../conf/.env')});

const DIR_TYPE = '';

const host: string = process.env.HOST;
const username: string = process.env.USER;
const password: string = process.env.PASSWORD;
const remoteDir: string = process.env.REMOTE_DIR;
const sshKey: string = process.env.SSH_KEY;

interface DirectoryInfo {
    files: string[],
    count: number
} 

//TODO add directory size
function readDirectory(dirPath: string): DirectoryInfo {
    let filesCount = 0;
    let filesList: string[] = new Array<string>(); 
    const files = fs.readdirSync(dirPath);
    for(let i = 0; i < files.length; i++) {
        let file = files[i];
        const src = path.join(dirPath, file);
        const stats = fs.statSync(src);
        if(stats.isDirectory()) {
            const info = readDirectory(path.join(dirPath, file))
            filesCount += info.count;
            for(let j = 0; j < info.files.length; j++) {
                filesList.push(info.files[j]);
            }
        } else {
            filesCount++;
            filesList.push(file);
        }
    }
    const result: DirectoryInfo = {
        count: filesCount,
        files: filesList
    }
    return result;
}

function refreshPlex() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: host,
            port: 3000,
            path: '/refresh',
            method: 'GET'
        };
        const req = http.request(options, res => {
            res.on('data', data => {
                console.log('refreshing plex');
                resolve(data.toString());
            }); 
        });
    
        req.on('error', err => {
            reject(err);
        });
        req.end();
    });
}

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
            const dirInfo = readDirectory(srcPath);
            let filesUploaded = 0;
            let files = dirInfo.files;
            client.on('upload', info => {
                const basename = path.basename(info.source);
                const indexNextFile = files.indexOf(basename) + 1;
                const nextFile = files[indexNextFile];
                console.log(`Uploaded: ${info.source}`);
                console.log(`Uploading: ${files[indexNextFile]}`);
                filesUploaded++;
                const progress = Math.floor((filesUploaded / dirInfo.count) * 100);
                controller.updateProgressView(progress);
                controller.updateCurrentFilename(`${nextFile}...`);
            });
            const result = await client.uploadDir(srcPath, `${remoteDir}/${type}/${file.name}`);
            console.log(result);
            return;
        }
        return client.fastPut(srcPath, `${remoteDir}/${type}/${file.name}`, {
            step: step => {
                const progress = Math.floor((step / file.size) * 100);
                controller.updateCurrentFilename(`${file.name}...`);
                controller.updateProgressView(progress);
            }
        });
    }).then(() => {
        controller.updateProgressView(0);
        controller.updateCurrentFilename('Finished !')
        dialog.showMessageBoxSync(null, {
            type: 'info',
            message: 'Finished !'
        });
        return client.end();
    }).finally(() => {
        refreshPlex();
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