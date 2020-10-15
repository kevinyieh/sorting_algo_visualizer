import '@babel/polyfill';
import Sorter from "./sort_base";

export default class insertionSort extends Sorter {
    constructor(viz,speed) {
        super(viz,speed);
        this.sort = this.sort.bind(this);
    }

    describe() {
        return "";
    }

    async sort() {
        for(let i = 1; i < this.elements.length; i++){
            if(this.forcedQuit) return;

            await this.review(this.elements[i], this.elements[i-1]);
            this.unreview(this.elements[i], this.elements[i-1]);
            if(this.elements[i].value < this.elements[i-1].value) {
                if(this.forcedQuit) return;
                let j = i-1;
                let k = i;
                while(j >= 0 && this.elements[j].value > this.elements[k].value) {
                    if(this.forcedQuit) return;
                    await this.review(this.elements[j], this.elements[k]);
                    this.unreview(this.elements[j], this.elements[k]);
                    await this.swap(this.elements[j],this.elements[k])
                    j--; k--;
                }
            }
        }
        return this.elements;
    }
}