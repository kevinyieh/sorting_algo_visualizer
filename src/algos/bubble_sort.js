import '@babel/polyfill';
export default class bubbleSort{
    constructor(elements,swapAnimate){
        this.elements = elements;
        this.swapAnimate = swapAnimate;
        this.sort = this.sort.bind(this);
        this.animating = false;
    }
    async sort() {
        console.log("begin sorting");
        let count = 1;
        for(let i = 0; i < this.elements.length; i++){
            let big = 0;
            for(let j = 1; j < this.elements.length; j ++){
                if(this.elements[big] > this.elements[j]){
                    const temp = this.elements[j];
                    this.elements[j] = this.elements[big];
                    this.elements[big] = temp;
                    this.animating = true;
                    await this.swapAnimate(big,j, () => {
                        console.log("ANIMATION HAS FINISHED")
                    }).then( () => console.log("PROMISE COMPLETE"));
                    debugger;
                    console.log(`Swap #${count}`)
                    count += 1;
                }
                big = j;
            }
        }
        console.log(this.elements);
        return this.elements;
    }
}