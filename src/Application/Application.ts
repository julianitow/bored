import { ApplicationController } from '../ApplicationController';
import { ApplicationView } from '../View/ApplicationView';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { dialog } from '@electron/remote';

dotenv.config({path: path.join(__dirname, './conf/.env')});

const FIRST_LAUNCH_FILENAME = '1stLaunch'

export class App {

    public appView: ApplicationView;
    private controller: ApplicationController;

    constructor() {
        this.controller = new ApplicationController(this);
        this.appView = new ApplicationView(this.controller);
    }

    checkFirstLaunch(): boolean {
        if(process.env.host === '') {
            dialog.showMessageBoxSync(null, {
                type: 'warning',
                message: 'No configuration detected, did you create have .env file in conf directory ?'
            });
            return false;
        } else {
            return true;
        }
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
