import '@babel/polyfill';
import Sorter from "./sort_base";


export default class bubbleSort extends Sorter{
    constructor(viz){
        super(viz);
        this.sort = this.sort.bind(this);
    }
    async sort() {
        console.log("begin sorting");
        let count = 1;
        for(let i = 0; i < this.elements.length; i++){
            let big = 0;
            for(let j = 1; j < this.elements.length - i; j ++){
                await this.review(this.elements[big],this.elements[j]);
                if(this.elements[big].value > this.elements[j].value){
                    await this.swap(this.elements[big],this.elements[j]);
                    console.log(`Swap #${count}`)
                    count += 1;
                }
                this.unreview(this.elements[big],this.elements[j]);
                big = j;
            }
        }
        return this.elements;
    }
}