import '@babel/polyfill';
import Sorter from "./sort_base";
import timeout from "../util/timeout";

export default class MergeSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
        this.merge = this.merge.bind(this);
        // this.combine = this.combine.bind(this);
        // this.elements = [10,1,2,6,9,3,5,4,8,7]
    }

    async merge(start,mid,end) { 
        if(this.forcedQuit) return;
        let start2 = mid + 1; 
        if (this.elements[mid].value <= this.elements[start2].value) { 
            return; 
        } 
        while (start <= mid && start2 <= end) { 
            
            await this.review(this.elements[start],this.elements[start2]);
            this.unreview(this.elements[start],this.elements[start2]);
            if (this.elements[start].value <= this.elements[start2].value) { 
                start++; 
            } 
            else { 
                let index = start2; 
                while (index !== start) { 
                    await this.review(this.elements[index],this.elements[index - 1]);
                    this.unreview(this.elements[index],this.elements[index - 1]);
                    await this.swap(this.elements[index],this.elements[index - 1])
                    index--; 
                } 
                start++; 
                mid++; 
                start2++; 
            }
            
        } 
    } 

    async sort(l=0,r=this.elements.length-1) { 
        if(this.forcedQuit) return;
        if (l < r) { 
            let m = Math.floor((l + r) / 2); 
    
            // Sort first and second halves 
            await this.sort(l, m); 
            await this.sort(m + 1, r); 
    
            await this.merge(l, m, r); 
        } 
    } 
}