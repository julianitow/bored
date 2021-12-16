import * as Service from '../Services';
import { dialog } from '@electron/remote';
import runtime from 'regenerator-runtime';

export class ApplicationController {
    
    constructor() {}

    async freeSpace() {
        let space = "";
        try {
            space = await Service.getFreeSpace();
        } catch (err) {
            console.error(err);
        }
        return space;
    }

    pushFile(file) {
        console.log(file);
        Service.sftp(file.name);
    }

    dragOverHandler(ev) {
        ev.preventDefault();
    }

    dropHandler(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("application/my-app");
        if (ev.dataTransfer.items) {
            let file = ev.dataTransfer.items[0].getAsFile();
            const options = {
              type: 'question',
              buttons: ['Cancel', 'Serie', 'Film'],
              title: 'C\'est quoi ?',
              message: `${file.name} ?`,
            }
            dialog.showMessageBox(null, options).then( (response) => {
              switch(response.response) {
                case 1:
                    this.pushFile(file);
                    break;
                case 2:
                    console.log("Film");
                    break;
                default:
                    break;
              }
            });
        }
    }
}