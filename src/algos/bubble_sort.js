import '@babel/polyfill';
import Sorter from "./sort_base";


export default class bubbleSort extends Sorter{
    constructor(viz,speed){
        super(viz,speed);
        this.sort = this.sort.bind(this);
    }
    async sort() {
        let count = 1;
        for(let i = 0; i < this.elements.length; i++){
            let big = 0;
            for(let j = 1; j < this.elements.length - i; j ++){
                if(this.forcedQuit) return;
                await this.review(this.elements[big],this.elements[j]);
                if(this.elements[big].value > this.elements[j].value){
                    await this.swap(this.elements[big],this.elements[j]);
                    count += 1;
                }
                this.unreview(this.elements[big],this.elements[j]);
                big = j;
            }
        }
        return this.elements;
    }
}