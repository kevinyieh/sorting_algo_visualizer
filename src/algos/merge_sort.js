import '@babel/polyfill';
import Sorter from "./sort_base";
import timeout from "../util/timeout";

export default class MergeSort extends Sorter{
    constructor(viz){
        super(viz);
        this.sort = this.sort.bind(this);
        this.combine = this.combine.bind(this);
    }
    async combine(left,right,lstart,rstart){
        let l = 0;
        let r = 0;
        let sorted = [];
        while(l < left.length && r < right.length){
            await this.review(left[l],right[r]);
            const barToSwap = this.elements[lstart + sorted.length];
            this.highlight(barToSwap);
            if(left[l].value < right[r].value){
                debugger;
                if(barToSwap.value === right[r].value){
                    await this.swap(left[l],barToSwap);
                    right[r] = barToSwap;
                }else {
                    await this.swap(left[l],barToSwap);
                }
                
                this.unreview(left[l],right[r]);
                this.unhighlight(barToSwap);
                sorted.push(left[l]);
                l += 1;
            }else{
                debugger;
                if(barToSwap.value === left[l].value){
                    await this.swap(right[r],barToSwap);
                    left[l] = barToSwap;
                }else {
                    await this.swap(right[r],barToSwap);
                }
                this.unreview(left[l],right[r]);
                this.unhighlight(barToSwap);
                sorted.push(left[l]);
                r += 1;
            }
        }
        // if(l === left.length) {
        //     while(r < right.length){
        //         const barToSwap = this.elements[lstart + sorted.length];
        //         await this.swap(barToSwap,right[r]);
        //         r += 1;
        //     }
        // }else {
        //     while(l < left.length){
        //         const barToSwap = this.elements[lstart + sorted.length];
        //         await this.swap(barToSwap,left[l]);
        //         l += 1;
        //     }
        // }
        return l === left.length ? sorted.concat(right.slice(r,right.length)) : sorted.concat(left.slice(l,left.length));
    }
    async sort(elements,start=0){
        if(!elements) elements = this.elements;
        if(elements.length < 2) return elements;
        const mid = Math.floor(elements.length/2);
        const left = elements.slice(0,mid);
        const right = elements.slice(mid,elements.length);

        const sortedLeft = await this.sort(left,start);
        const sortedRight = await this.sort(right,start+mid);

        // const sorted = await this.combine(sortedLeft,sortedRight,start,start+mid);
        // return sorted;
        return this.combine(sortedLeft,sortedRight,start,start+mid).then( sorted => sorted)
    }
}

// function combine(left,right,lstart,rstart){
//     let l = 0;
//     let r = 0;
//     let sorted = [];
//     while(l < left.length && r < right.length){
//         if(left[l] < right[r]){
//             sorted.push(left[l]);
//             l += 1;
//         }else{
//             sorted.push(right[r]);
//             r += 1;
//         }
//     }
//     return l === left.length ? sorted.concat(right.slice(r,right.length)) : sorted.concat(left.slice(l,left.length));
// }
// function sort(elements,start=0){
//     if(!elements) elements = this.elements;
//     if(elements.length < 2) return elements;
//     const mid = Math.floor(elements.length/2);
//     const left = elements.slice(0,mid);
//     const right = elements.slice(mid,elements.length);

//     const sortedLeft = sort(left,start);
//     const sortedRight = sort(right,start+mid);

//     return combine(sortedLeft,sortedRight,start,start+mid);
// }
// console.log(sort(arr));