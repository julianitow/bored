export class ApplicationView {

    parentElement;
    controller;

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
        this.setEvents();
    }

    setEvents() {
        document.getElementById('target').addEventListener('dragover', this.controller.dragOverHandler);
        document.getElementById('target').addEventListener('drop', this.controller.dropHandler);
    }

    async info() {
        const infoDiv = document.createElement('div');
        infoDiv.id = 'info';
        infoDiv.className = 'info';
        const space = this.controller.freeSpace().then(space => {
            infoDiv.innerText = space;
        });
        this.parentElement.append(infoDiv);
    }

    dropZone() {
        const zoneDiv = document.createElement('div');
        zoneDiv.id = 'target';
        zoneDiv.className = 'zone';
        this.parentElement.append(zoneDiv);
    }
}