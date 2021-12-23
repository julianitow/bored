import * as Service from '../Services';
import { dialog } from '@electron/remote';
import { App } from '../Application/Application';

const SERIE_TYPE = 'TV-Shows';
const FILM_TYPE = 'Movies';
const SHARE_TYPE = 'ftp';

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

    dragOverHandler(ev: DragEvent): void {
        ev.preventDefault();
    }

    updateFreeSpaceView(): void {
        this.application.appView.updateInfo();
    }

    updateProgressView(value: number): void {
        this.application.appView.setProgressBar(value);
    }

    updateCurrentFilename(filename: string): void {
        this.application.appView.setCurrentFilename(filename);
    }

    disableZone(): void {
        //TODO
    }

    dropHandler(ev: DragEvent): void {
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            const file: File = ev.dataTransfer.items[0].getAsFile();
            const options: Electron.MessageBoxOptions  = {
              type: 'question',
              buttons: ['Cancel', 'Serie', 'Film', 'Share file'],
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
                case 3:
                    this.upload(file, SHARE_TYPE);
                    break;
                default:
                    break;
            }
        }
    }

    upload(file: File, type: string): void {
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