import '@babel/polyfill';
import Sorter from "./sort_base";
import timeout from "../util/timeout";

export default class MergeSort extends Sorter{
    constructor(viz){
        super(viz);
        this.sort = this.sort.bind(this);
        this.merge = this.merge.bind(this);
        // this.combine = this.combine.bind(this);
        // this.elements = [10,1,2,6,9,3,5,4,8,7]
    }

    async merge(start,mid,end) { 
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
        if (l < r) { 
            let m = Math.floor((l + r) / 2); 
    
            // Sort first and second halves 
            await this.sort(l, m); 
            await this.sort(m + 1, r); 
    
            await this.merge(l, m, r); 
        } 
    } 
    
}

// const x = new MergeSort();
// x.sort();
// console.log(x.elements);

// async sort(){
//     // let sorted = this.elements.slice();
//     const n = this.elements.length;
//     // let buffer = new Array(n);

//     for (let size = 1; size < n; size *= 2) {
//         for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
//             let left = leftStart;
//             let right = Math.min(left + size, n);
//             let leftMax = right;
//             let rightMax = Math.min(right + size, n);
//             let i = left;
//             while (left < leftMax && right < rightMax) {
//                 await this.review(this.elements[left],this.elements[right]);
//                 await this.highlight(this.elements[i]);
//                 let lTrack = 0;

//                 if (this.elements[left].value <= this.elements[right].value) {
//                     debugger;
//                     await this.swap(this.elements[i],this.elements[left]);
//                     this.unhighlight(this.elements[i]);
//                     this.unreview(this.elements[left],this.elements[right]);
//                     if(i >= right && i < rightMax) this.elements[i] = this.elements[left];
//                     i++;left++;
//                 } else {
//                     debugger;
//                     await this.swap(this.elements[i],this.elements[right]);
//                     this.unhighlight(this.elements[i]);
//                     this.unreview(this.elements[left],this.elements[right]);
//                     this.elements[left+lTrack] = this.elements[right];
//                     i++;right++;lTrack ++;
//                 }
//             }
//             // while (left < leftMax) {
//             //     await this.swap(this.elements[i++],this.elements[left++]);
//             // }
//             // while (right < rightMax) {
//             //     await this.swap(this.elements[i++],this.elements[right++]);
//             // }
//         }
//     }

//     return this.elements;
// }
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

// async combine(left,right,lstart,rstart){
//     let l = 0;
//     let r = 0;
//     let sorted = [];
//     while(l < left.length && r < right.length){
//         await this.review(left[l],right[r]);
//         const barToSwap = this.elements[lstart + sorted.length];
//         await this.highlight(barToSwap);
//         if(left[l].value < right[r].value){
//             debugger;
//             if(barToSwap.value === right[r].value){
//                 await this.swap(left[l],barToSwap);
//                 this.unreview(left[l],right[r]);
//                 right[r] = left[l];
//             }else {
//                 await this.swap(left[l],barToSwap);
//             }
//             this.unreview(left[l],right[r]);
//             this.unhighlight(barToSwap);
//             sorted.push(left[l]);
//             l += 1;
//         }else{
//             debugger;
//             if(barToSwap.value === left[l].value){
//                 await this.swap(right[r],barToSwap);
//                 this.unreview(left[l],right[r]);
//                 left[l] = right[r];
//             }else {
//                 await this.swap(right[r],barToSwap);
//             }
//             this.unreview(left[l],right[r]);
//             this.unhighlight(barToSwap);
//             sorted.push(left[l]);
//             r += 1;
//         }
//     }
//     // if(l === left.length) {
//     //     while(r < right.length){
//     //         const barToSwap = this.elements[lstart + sorted.length];
//     //         await this.review(barToSwap,right[r]);
//     //         await this.swap(barToSwap,right[r]);
//     //         r += 1;
//     //     }
//     // }else {
//     //     while(l < left.length){
//     //         const barToSwap = this.elements[lstart + sorted.length];
//     //         await this.review(barToSwap,left[l]);
//     //         await this.swap(barToSwap,left[l]);
//     //         l += 1;
//     //     }
//     // }
//     return l === left.length ? sorted.concat(right.slice(r,right.length)) : sorted.concat(left.slice(l,left.length));
// }
// async sort(elements,start=0){
//     if(!elements) elements = this.elements;
//     if(elements.length < 2) return elements;
//     const mid = Math.floor(elements.length/2);
//     const left = elements.slice(0,mid);
//     const right = elements.slice(mid,elements.length);

//     const sortedLeft = await this.sort(left,start);
//     const sortedRight = await this.sort(right,start+mid);

//     // const sorted = await this.combine(sortedLeft,sortedRight,start,start+mid);
//     // return sorted;
//     return this.combine(sortedLeft,sortedRight,start,start+mid).then( sorted => sorted)
// }