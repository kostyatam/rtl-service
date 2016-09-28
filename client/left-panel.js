'use strict';
import template from './left-panel.jade';
import template__item from './left-panel__item.jade';

export default class LeftPanel {
    constructor (id, statuses = []) {
        this.el = document.getElementById(id);
        this.statuses = statuses;

        this.page = 0;
        this.count = 500;
        this.render(statuses);
    }

    next () {
        if (this.statuses.length <= this.cont * (this.page + 1)) return;
        this.page++;
        this.render();
    }

    prev () {
        if (page === 0) return;
        this.page++;
        this.render();
    }

    render () {
        let slice = this.statuses.slice(this.page, this.count);
        this.macs = {};
        slice.map(item => this.macs[item.mac] = item);
        this.el.innerHTML = template({statuses: slice})
    }

    update (update) {
        let statuses = this.statuses;

        for (let i = 0; i < statuses.length; i++) {
            let item =  statuses[i];
            if (!update[item.mac]) continue;
            Object.assign(item, update[item.mac]);
        }

        requestAnimationFrame(() => {
            let children = this.el.children;
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                let mac = child.getAttribute('id');
                if (!update[mac]) continue;
                child.innerHTML = template__item({item: Object.assign(this.macs[mac], update[mac])});
            }
        });
    }
}