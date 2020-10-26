import '@babel/polyfill';
import Sorter from "./sort_base";


export default class BubbleSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
    }

    describe(){
        return "Cocktail shaker sort is very similar to bubble sort, except that it tries to sort on both ends. The algorithm iterates through the \
                elements and swaps adjacent elements if they are out of order. It first does this from left to right, which ensures the largest element \
                is at the end, and then it does this from right to left, which ensures the smallest element is at the beginning. This is repeated until the \
                elements are sorted."
    }

    async sort() {
        for(let i = 0; i < this.elements.length; i++) {
            if(this.forcedQuit) return;
            let big = i;
            let swapped = false;
            for(let j = i+1; j < this.elements.length - i; j++) {
                if(this.forcedQuit) return;
                await this.review(this.elements[big],this.elements[j]);
                this.unreview(this.elements[big],this.elements[j]);
                if (this.elements[big].value > this.elements[j].value) {
                    swapped = true;
                    await this.swap(this.elements[big],this.elements[j])
                }
                big = j;
            }
            let small = big - 1;
            for(let j = small - 1; j >= 0 + i; j--) {
                if(this.forcedQuit) return;
                await this.review(this.elements[small],this.elements[j]);
                this.unreview(this.elements[small],this.elements[j]);
                if (this.elements[small].value < this.elements[j].value) {
                    swapped = true;
                    await this.swap(this.elements[small],this.elements[j])
                }
                small = j;
            }
            if (!swapped) return;
        }
    }
}