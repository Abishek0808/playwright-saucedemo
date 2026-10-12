class CheckoutOverviewPage{
    constructor (page){
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]');       
        
    }
    async finishOrder(){
        await this.finishButton.click();
    }
}
module.exports = CheckoutOverviewPage;