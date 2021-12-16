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

            const res = dialog.showMessageBoxSync(null, options);
            console.log(this);
            switch(res) {
                case 1:
                    const fileSize = file.size / 1000000000; //conversion en go
                    this.freeSpace().then(space => {
                        let spaceFree = space.split('G')[0];
                        spaceFree = spaceFree.replace(',', '.');
                        
                        if (fileSize >= spaceFree) {
                            dialog.showMessageBoxSync(null, {
                                type: 'warning',
                                message: 'Not enough space available.'
                            });
                            return;
                        }

                        Service.sftp(file.name);
                    });
                    Service.sftp(file.name);
                    break;
                case 2:
                    console.log("Film");
                    break;
                default:
                    break;
            }
        }
    }
}