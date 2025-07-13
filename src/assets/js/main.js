class Runner {
    constructor(){}
    addCopyRightYear(){
        console.log("here"); 
        const yearNode = document.getElementById("app__current_year"); 
        console.log("yearNode", yearNode); 
        yearNode.textContent = new Date().getFullYear(); 
    }
    applyDefault(){
        this.addCopyRightYear(); 
    }
}
const run = new Runner(); 
export default run; 