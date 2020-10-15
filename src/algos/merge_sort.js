import '@babel/polyfill';
import Sorter from "./sort_base";

export default class MergeSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
        this.merge = this.merge.bind(this);
        // this.combine = this.combine.bind(this);
        // this.elements = [10,1,2,6,9,3,5,4,8,7]
    }
    describe(){
        return "Merge sort takes advantage of the ease of combining two sorted arrays into another sorted array.\
                This algorithm breaks the list down into sorted subsets and merges those subsets until the entire \
                list is sorted. You'll notice how there are smaller sorted groups within the set."
    }

    async merge(start,mid,end) { 
        if(this.forcedQuit) return;
        let start2 = mid + 1; 
        if (this.elements[mid].value <= this.elements[start2].value) { 
            await this.review(this.elements[start],this.elements[start2]);
            this.unreview(this.elements[start],this.elements[start2]);
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
                    if(this.forcedQuit) return;
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