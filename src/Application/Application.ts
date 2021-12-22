import { ApplicationController } from '../ApplicationController';
import { ApplicationView } from '../View/ApplicationView';
import * as fs from 'fs';
import * as path from 'path';

const FIRST_LAUNCH_FILENAME = '1stLaunch'

export class App {

    public appView: ApplicationView;
    private controller: ApplicationController;

    constructor() {
        this.controller = new ApplicationController(this);
        this.appView = new ApplicationView(this.controller);
    }

    checkFirstLaunch(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => { 
            fs.readFile(path.join(__dirname, '../conf/', FIRST_LAUNCH_FILENAME), (err, buff) => {
                if (err) reject(err);
                const val = buff.toString();
                if (val ==  'true') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    setFirstLaunch(val: string): void {
        fs.writeFileSync(path.join(__dirname, '../conf/', FIRST_LAUNCH_FILENAME), val);
    }

    view(): void {
        if(this.appView === undefined) {
            console.error('View undefined');
            return;
        }
        this.appView.render();
    }
}
