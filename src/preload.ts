import { App } from './Application';
import { dialog } from '@electron/remote';

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.checkFirstLaunch();
    app.view();
});