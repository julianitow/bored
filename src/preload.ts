import { App } from './Application';

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.checkFirstLaunch();
    app.view();
});