import { ApplicationController } from '../ApplicationController';
import { ApplicationView } from '../View/ApplicationView';

export class App {

    public appView: ApplicationView;
    private controller: ApplicationController;

    constructor() {
        this.controller = new ApplicationController(this);
        this.appView = new ApplicationView(this.controller);
    }

    view(): void {
        if(this.appView === undefined) {
            console.error('View undefined');
            return;
        }
        this.appView.render();
    }
}
