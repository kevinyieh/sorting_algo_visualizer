import '@babel/polyfill';
import Sorter from "./sort_base";

export default class QuickSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
        // this.elements = [10,2,1,4,9,6,8,7,3,5,0,11,19,12,13,16,18,22,20,17,5,5,10,32];
    }

    describe(){
        return "Quick sort aims to make every element follow a simple rule: every element before is smaller, every element\
                after is larger. The algorithm picks an element to \"pivot\" the list on, and applies the rule to that pivot element.\
                The algorithm is then applied to each side of the pivot."
    }

    async sort(start,end){
        if(typeof start === "undefined" && typeof end === "undefined"){
            start = 0;
            end = this.elements.length;
        }
        if( (end - start) < 2 ) return this.elements;
        if(this.forcedQuit) {
            this.unhighlight(this.elements[pivot]);
            return;
        }
        let pivot = start;
        this.highlight(this.elements[pivot]);

        for(let i = start + 1; i < end; i++) {    
            if (i === pivot) continue;
            if(this.forcedQuit) {
                this.unhighlight(this.elements[pivot]);
                return;
            }

            await this.review(this.elements[i],this.elements[pivot]);
            this.unreview(this.elements[i],this.elements[pivot]);
            const val = this.elements[i].value;
            if (val < this.elements[pivot].value && i > pivot) {
                await this.swap(this.elements[i],this.elements[pivot]);
                if(this.forcedQuit) {
                    this.unhighlight(this.elements[pivot]);
                    return;
                }

                this.unhighlight(this.elements[pivot]);
                pivot = i;
                this.highlight(this.elements[pivot]);
            }
        };
        for(let i = start; i < pivot; i++) {    
            const val = this.elements[i].value;

            await this.review(this.elements[i],this.elements[pivot]);
            this.unreview(this.elements[i],this.elements[pivot]);

            if( val > this.elements[pivot].value ){
                if(this.forcedQuit) {
                    this.unhighlight(this.elements[pivot]);
                    return;
                }
                let j = i;
                while(j < pivot){
                    await this.swap(this.elements[j],this.elements[j+1]);
                    if(this.forcedQuit) {
                        this.unhighlight(this.elements[pivot]);
                        return;
                    }
                    j++;
                }
                this.unhighlight(this.elements[pivot]);
                i --;
                pivot--;
                this.highlight(this.elements[pivot]);
            }
        };
        this.unhighlight(this.elements[pivot]);

        await this.sort(start,pivot);
        await this.sort(pivot+1,end);
        return this.elements;
    }
    
}