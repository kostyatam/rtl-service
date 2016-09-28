'use strict';
import './left-panel.css';
import template from './left-panel.jade';
import template__list from './left-panel__list.jade';
import template__item from './left-panel__item.jade';

export default class LeftPanel {
    constructor (id, statuses = []) {
        this.el = document.getElementById(id);
        this.el.innerHTML = template();

        this.prevEl = this.el.getElementsByClassName('btn_prev')[0];
        this.nextEl = this.el.getElementsByClassName('btn_next')[0];
        this.items = this.el.querySelector('#items');

        this.statuses = statuses;
        this.page = 0;
        this.count = 500;
        this.render();

        this.prevEl.addEventListener('click', this.prev.bind(this));
        this.nextEl.addEventListener('click', this.next.bind(this));
    }

    next () {
        if (this.statuses.length <= this.count * (this.page + 1)) return;
        this.page++;
        this.render();
    }

    prev () {
        if (this.page === 0) return;
        this.page--;
        this.render();
    }

    render () {
        let slice = this.statuses.slice(this.page, this.count);
        this.macs = {};
        slice.map(item => this.macs[item.mac] = item);
        this.items.innerHTML = template__list({statuses: slice})
    }

    update (update) {
        let statuses = this.statuses;

        for (let i = 0; i < statuses.length; i++) {
            let item =  statuses[i];
            if (!update[item.mac]) continue;
            item.status = update[item.mac].status;
        }
        requestAnimationFrame(this.rerender(this.items.children, this.macs, update));
        update = null;
    }

    rerender (children, macs, update) {
        return function () {
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                let mac = child.getAttribute('id');
                if (!update[mac]) continue;
                let name = macs[mac].status.name;
                macs[mac].status = update[mac].status;
                child.innerHTML = template__item({item: macs[mac]});
            }
            update = null;
        }
    }
}