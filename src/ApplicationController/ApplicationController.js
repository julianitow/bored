import * as Service from '../Services';
import { dialog } from '@electron/remote';
import runtime from 'regenerator-runtime';

const DIR_TYPE = '';
const SERIE_TYPE = 'TV-Shows';
const FILM_TYPE = 'Film';

export class ApplicationController {

    application;
    
    constructor(application) {
        this.application = application;
        this.init();
    }

    init() {
        setInterval(() => {
            this.updateFreeSpaceView();
        }, 10000);
    }

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

    updateFreeSpaceView() {
        this.application.appView.updateInfo();
    }

    updateProgressView(value) {
        this.application.appView.setProgressBar(value);
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
            switch(res) {
                case 1:
                    this.upload(file, SERIE_TYPE);
                    break;
                case 2:
                    this.upload(file, FILM_TYPE);
                    break;
                default:
                    break;
            }
        }
    }

    upload(file, type) {
        //TODO Directory implementation
        console.log(file);
        if (file.type === DIR_TYPE) {
            dialog.showMessageBoxSync(null, {
                type: 'warning',
                message: 'Les dossiers ne sont pas encore pris en charge, uniquement les fichiers'
            });
            return;
        }
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
            Service.sftp(file, SERIE_TYPE, this);
        });
    }
}