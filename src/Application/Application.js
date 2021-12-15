import { dialog } from '@electron/remote';
import { SSH } from '../Services';


export class App {

    sshService;

    constructor() {
        this.document = document;
        this.initEvents();
        this.sshService = new SSH(process.env.HOST, process.env.USER, process.env.PASSWORD);
    }

    initEvents() {
        if(this.document !== undefined) {
            document.getElementById('target').addEventListener('dragover', this.dragOverHandler);
            document.getElementById('target').addEventListener('drop', this.dropHandler);
            return;
        }
        console.error('document undefined');
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
                    this.sshService.run();
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
