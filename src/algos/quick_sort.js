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

    async sort(elements){
        if(!elements) elements = this.elements;
        if (elements.length < 2) return elements;
        if(this.forcedQuit) {
            this.unhighlight(elements[pivot]);
            return;
        }
        let pivot = 0;
        this.highlight(elements[pivot]);

        for(let i = 0; i < elements.length; i++) {    
            if (i === pivot) continue;
            if(this.forcedQuit) {
                this.unhighlight(elements[pivot]);
                return;
            }

            await this.review(elements[i],elements[pivot]);
            this.unreview(elements[i],elements[pivot]);
            
            const val = elements[i].value;
            if (val < elements[pivot].value && i > pivot) {
                await this.swap(elements[i],elements[pivot]);
                if(this.forcedQuit) {
                    this.unhighlight(elements[pivot]);
                    return;
                }

                this.unhighlight(elements[pivot]);
                pivot = i;
                this.highlight(elements[pivot]);
            }
        };
        for(let i = 0; i < pivot; i++) {    
            const val = elements[i].value;

            await this.review(elements[i],elements[pivot]);
            this.unreview(elements[i],elements[pivot]);

            if( val > elements[pivot].value ){
                if(this.forcedQuit) {
                    this.unhighlight(elements[pivot]);
                    return;
                }
                let j = i;
                while(j < pivot){
                    await this.swap(elements[j],elements[j+1]);
                    if(this.forcedQuit) {
                        this.unhighlight(elements[pivot]);
                        return;
                    }
                    j++;
                }
                this.unhighlight(elements[pivot]);
                i --;
                pivot--;
                this.highlight(elements[pivot]);
            }
        };
        this.unhighlight(elements[pivot]);
        const left = await this.sort(elements.slice(0,pivot));
        const right = await this.sort(elements.slice(pivot + 1,elements.length));
        return left.concat([elements[pivot]],right);
    }
    
}