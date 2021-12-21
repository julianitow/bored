import * as Service from '../Services';
import { dialog } from '@electron/remote';
import runtime from 'regenerator-runtime';
import { App } from '../Application/Application';

const SERIE_TYPE = 'TV-Shows';
const FILM_TYPE = 'Movies';

export class ApplicationController {

    public application: App;
    
    constructor(application: App) {
        this.application = application;
        this.init();
    }

    init(): void {
        setInterval(() => {
            this.updateFreeSpaceView();
        }, 10000);
    }

    async freeSpace(): Promise<string> {
        let space: string;
        try {
            space = await Service.getFreeSpace();
        } catch (err) {
            console.error(err);
        }
        return space;
    }

    dragOverHandler(ev): void {
        ev.preventDefault();
    }

    updateFreeSpaceView(): void {
        this.application.appView.updateInfo();
    }

    updateProgressView(value): void {
        this.application.appView.setProgressBar(value);
    }

    disableZone(): void {
        //TODO
    }

    dropHandler(ev): void {
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            const file: File = ev.dataTransfer.items[0].getAsFile();
            const options: Electron.MessageBoxOptions  = {
              type: 'question',
              buttons: ['Cancel', 'Serie', 'Film'],
              title: 'C\'est quoi ?',
              message: `${file.name} ?`,
            }

            const res: number = dialog.showMessageBoxSync(null, options);
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

    upload(file, type): void {
        //TODO Directory implementation
        console.log(file);
        /*if (file.type === DIR_TYPE) {
            dialog.showMessageBoxSync(null, {
                type: 'warning',
                message: 'Les dossiers ne sont pas encore pris en charge, uniquement les fichiers'
            });
            return;
        }*/
        const fileSize: number = file.size / 1000000000; //conversion en go
        this.freeSpace().then(space => {
            const spaceFreeStr: string = space.split('G')[0];
            const spaceFree = Number(spaceFreeStr.replace(',', '.'));
            
            if (fileSize >= spaceFree) {
                dialog.showMessageBoxSync(null, {
                    type: 'warning',
                    message: 'Not enough space available.'
                });
                return;
            }
            Service.sftp(file, type, this);
        });
    }
}