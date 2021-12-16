export class ApplicationView {

    parentElement;
    labelDiv
    infoDiv;
    zoneDiv;
    controller;
    progress;

    constructor(controller) {
        this.init(controller);
    }

    init(controller) {
        this.controller = controller;
        this.parentElement = document.getElementsByTagName('body')[0];
    }

    render() {
        this.info();
        this.dropZone();
        this.progressBar();
        this.setEvents();
    }

    setEvents() {
        document.getElementById('target').addEventListener('dragover', (ev) => { this.controller.dragOverHandler(ev) });
        document.getElementById('target').addEventListener('drop', (ev) => { this.controller.dropHandler(ev) });
    }

    updateInfo() {
        this.controller.freeSpace().then(space => {
            this.infoDiv.innerText = space;
        });
    }

    async info() {
        this.labelDiv = document.createElement('div');
        this.labelDiv.id = 'infoLabel';
        this.labelDiv.classList.add(['label', 'text']);
        this.labelDiv.innerText = 'Available space:';

        this.infoDiv = document.createElement('div');
        this.infoDiv.id = 'info';
        this.infoDiv.className = 'info';
        this.updateInfo();

        this.labelDiv.append(this.infoDiv);
        this.parentElement.append(this.labelDiv);
    }

    dropZone() {
        this.zoneDiv = document.createElement('div');
        this.zoneDiv.id = 'target';
        this.zoneDiv.className = 'zone';
        this.zoneDiv.innerText = 'Drop file here !';
        this.parentElement.append(this.zoneDiv);
    }

    setProgressBar(value) {
        this.progress.value = value;
    }

    progressBar() {
        const progressDiv = document.createElement('div');
        progressDiv.classList.add(['progressZone']);

        const label = document.createElement('label');
        label.for = 'fileProgresss';
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