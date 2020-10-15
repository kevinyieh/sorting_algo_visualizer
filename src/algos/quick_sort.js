import '@babel/polyfill';
import Sorter from "./sort_base";

export default class QuickSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
        this.partition = this.partition.bind(this);
        // this.elements = [10,2,1,4,9,6,8,7,3,5,0,11,19,12,13,16,18,22,20,17,5,5,10,32];
    }

    describe(){
        return "Quick sort aims to make every element follow a simple rule: every element before is smaller, every element\
                after is larger. The algorithm picks an element to \"pivot\" the list on, and applies the rule to that pivot element.\
                The algorithm is then applied to each side of the pivot."
    }

    async partition(start, end) {
        let pivot = end;
        let lastSmall = start - 1;
        this.highlight(this.elements[pivot]);

        for(let i = start; i < end; i++){
            await this.review(this.elements[lastSmall+1],this.elements[i]);
            this.unreview(this.elements[lastSmall+1],this.elements[i]);
            if(this.elements[i].value < this.elements[pivot].value){
                lastSmall++;
                debugger;
                await this.swap(this.elements[i],this.elements[lastSmall]);
            }
        }
        lastSmall++;
        debugger;
        await this.swap(this.elements[pivot],this.elements[lastSmall]);
        this.unhighlight(this.elements[pivot]);
        return lastSmall;
    }
    
    async sort(start, end) {
        if(typeof start === "undefined" && typeof end === "undefined"){
            start = 0; end = this.elements.length-1;
        }
        if(start < end) {
            const partitionId = await this.partition(start,end);
            
            await this.sort(start,partitionId - 1);
            await this.sort(partitionId + 1, end);
        }
        return this.elements;
    }
}