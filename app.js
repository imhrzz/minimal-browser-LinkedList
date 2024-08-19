const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const loadBtn = document.getElementById('loadBtn');
const urlInput = document.getElementById('urlInput');
const browserWindow = document.getElementById('browserWindow');

class Node {
    constructor(url) {
        this.url = url;
        this.prev = null;
        this.next = null;
    }
}

class BrowserHistory {
    constructor() {
        this.current = null;
        this.head = null;
        this.tail = null;
    }

    visit(url) {
        const node = new Node(url);

        if (this.current) {
            if (this.current.next) {
                this.current.next = null;
                this.tail = this.current;
            }
            node.prev = this.current;
            this.current.next = node;
        } else {
            this.head = node;
        }
        this.current = node;
        this.tail = node;
    }

    back() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            return this.current.url;
        }
        return null;
    }

    forward() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            return this.current.url;
        }
        return null;
    }
}

const history = new BrowserHistory();

function loadURL(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url; // Default to HTTPS for testing
    }
    browserWindow.src = url;
    history.visit(url);
}


loadBtn.addEventListener('click', () => {
    const url = urlInput.value;
    if (url) {
        loadURL(url);
    }
});

backBtn.addEventListener('click', () => {
    const url = history.back();
    if (url) {
        browserWindow.src = url;
        urlInput.value = url;
    }
});

forwardBtn.addEventListener('click', () => {
    const url = history.forward();
    if (url) {
        browserWindow.src = url;
        urlInput.value = url;
    }
});
