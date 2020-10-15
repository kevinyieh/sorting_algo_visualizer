import '@babel/polyfill';
import Sorter from "./sort_base";

export default class HeapSort extends Sorter {
    constructor(viz,speed){
        super(viz,speed);
    }

    describe() {
        return "Heap sort takes advantage of a tree structure's ability to quickly restructure itself. This heap sort uses a \
                max-heap data structure to continuously find the nth greatest element in the list and then swapping the element with \
                the nth last element, where n is the number of times a greatest element has been found.";
    }

    async heapify(length,i) {
        if(this.forcedQuit) return;
        let largest = i;
        let left = i * 2 + 1;
        let right = left + 1;
        // await this.review(this.elements[left],this.elements[largest]);
        // this.unreview(this.elements[left],this.elements[largest]);
        if(left < length && this.elements[left].value > this.elements[largest].value) {
            largest = left;
        }
        // await this.review(this.elements[right],this.elements[largest]);
        // this.unreview(this.elements[right],this.elements[largest]);
        if(right < length && this.elements[right].value > this.elements[largest].value) {
            largest = right;
        }
        if(largest !== i) {
            await this.review(this.elements[i],this.elements[largest]);
            this.unreview(this.elements[i],this.elements[largest]);
            await this.swap(this.elements[i], this.elements[largest]);
            await this.heapify(length,largest);
        }
        return this.elements;
    }

    async sort() {
        let length = this.elements.length;
        let i = Math.floor(length / 2 - 1);
        let k = length - 1;
        while (i >= 0) {
            if(this.forcedQuit) return;
            await this.heapify(length, i)
            i --;
        }
        while (k >= 0) {
            if(this.forcedQuit) return;
            await this.review(this.elements[k],this.elements[0]);
            this.unreview(this.elements[k],this.elements[0]);

            await this.swap(this.elements[0], this.elements[k]);
            await this.heapify(k,0);
            k--;
        }
        return this.elements;
    }
}