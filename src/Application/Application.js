import { ApplicationController } from '../ApplicationController';
import { ApplicationView } from '../View/ApplicationView';

export class App {

    appView;
    controller;

    constructor() {
        this.controller = new ApplicationController();
        this.appView = new ApplicationView(this.controller);
    }

    view() {
        if(this.appView === undefined) {
            console.error('View undefined');
            return;
        }
        this.appView.render();
    }
}
