import { App } from './Application';
import { dialog } from '@electron/remote';

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.checkFirstLaunch().then(val => {
        if (val === true) {
            dialog.showMessageBox(null, { type: 'warning', message: 'Please create .env file'}).then( res => {
                
            });
        }
    });
    app.view();
});