import { ApplicationController } from '../ApplicationController/ApplicationController';
export class ApplicationView {

    public parentElement: HTMLElement;
    private labelDiv: HTMLDivElement;
    private infoDiv: HTMLDivElement;
    private filenameDiv: HTMLDivElement;
    private zoneDiv: HTMLDivElement;
    private progress: HTMLProgressElement;
    private controller: ApplicationController;

    constructor(controller: ApplicationController) {
        this.init(controller);
    }

    init(controller: ApplicationController): void {
        this.controller = controller;
        this.parentElement = document.getElementsByTagName('body')[0];
    }

    render(): void {
        this.info();
        this.dropZone();
        this.progressBar();
        this.setEvents();
    }

    setEvents(): void {
        document.getElementById('target').addEventListener('dragover', (ev) => { this.controller.dragOverHandler(ev) });
        document.getElementById('target').addEventListener('drop', (ev) => { this.controller.dropHandler(ev) });
    }

    updateInfo(): void {
        this.controller.freeSpace().then(space => {
            this.infoDiv.innerText = space;
        });
    }

    async info(): Promise<void> {
        this.labelDiv = document.createElement('div');
        this.labelDiv.id = 'infoLabel';
        this.labelDiv.classList.add('label', 'text');
        this.labelDiv.innerText = 'Available space:';

        this.infoDiv = document.createElement('div');
        this.infoDiv.id = 'info';
        this.infoDiv.className = 'info';
        this.updateInfo();

        this.filenameDiv = document.createElement('div');

        this.labelDiv.append(this.infoDiv);
        this.parentElement.append(this.filenameDiv);
        this.parentElement.append(this.labelDiv);
    }

    dropZone(): void {
        this.zoneDiv = document.createElement('div');
        this.zoneDiv.id = 'target';
        this.zoneDiv.className = 'zone';
        this.zoneDiv.innerText = 'Drop file here !';
        this.parentElement.append(this.zoneDiv);
    }

    setProgressBar(value: number): void {
        this.progress.value = value;
    }

    setCurrentFilename(filename: string): void {
        this.filenameDiv.innerText = `Uploading: ${filename}`;
    }

    progressBar(): void {
        const progressDiv: HTMLDivElement = document.createElement('div');
        progressDiv.classList.add('progressZone');

        const label: HTMLLabelElement = document.createElement('label');
        label.htmlFor = 'fileProgresss';
        label.innerText = 'Tranfert status:';

        this.progress = document.createElement('progress');
        this.progress.id = 'fileProgress';
        this.progress.max = 100;
        this.progress.value = 0;

        progressDiv.append(label);
        progressDiv.append(this.progress);
        this.parentElement.append(progressDiv);
    }
}