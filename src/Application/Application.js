import { dialog } from '@electron/remote';
import * as Service from '../Services';

export class App {

    sshService;

    constructor() {
        this.document = document;
        this.initEvents();
        this.view();
    }

    initEvents() {
        document.getElementById('target').addEventListener('dragover', this.dragOverHandler);
        document.getElementById('target').addEventListener('drop', this.dropHandler);
    }

    view() {
        let info = document.getElementById('info');
        const freeSpace = Service.getFreeSpace().then(freeSpace => {
            let p = document.createElement('p');
            p.innerText = `Space available: ${freeSpace}`;
            info.append(p);
        }).catch(err => {
            console.error(err);
        })
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
                    Service.sftp(file.name);
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
