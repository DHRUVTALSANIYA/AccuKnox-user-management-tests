import { page, locator, expect } from "@playwright/test"
import { baseURL, UserName } from "../utils/testData"

export class CreateUserPage{
    
    constructor(page){
        this.page=page

        //genrate user name min lenth 5 max lenth 7 and only alphabets
        this.adminName= this.page.locator("//p[@class='oxd-userdropdown-name']").textContent()
        this.dropdowen=".oxd-select-text.oxd-select-text"
        this.userName= UserName  
        this.password= "Admin@123"
        this.confirmPassword=this.password
        // this.status="Enabled"
        this.role="ESS"
        this.role="Admin"
    }
    async goto(){
        await this.page.goto(`${baseURL}admin/viewSystemUsers`)
    }
    async addAdminName(){
        const profilename=await this.page.locator("//p[@class='oxd-userdropdown-name']").textContent()
        console.log('Profile Name:', profilename)
        this.adminName=profilename
    }
    async adduser(){
        await this.page.locator(".oxd-button.oxd-button--medium.oxd-button").nth(2).click()

        await this.page.locator(this.dropdowen).nth(0).click()
        await this.page.getByRole('option', { name: 'Admin' }).click()

        await this.page.locator("input[placeholder='Type for hints...']").click()
        await this.page.locator("input[placeholder='Type for hints...']").fill(this.adminName)
        await this.page.waitForTimeout(2000)
        await this.page.waitForSelector('[role="option"]');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.page.locator(this.dropdowen).nth(1).click()
        await this.page.locator('.oxd-select-option').nth(1).click();

        await this.page.locator(".oxd-input.oxd-input").nth(1).fill(this.userName)
        await this.page.locator(".oxd-input.oxd-input").nth(2).fill(this.password)
        await this.page.locator(".oxd-input.oxd-input").nth(3).fill(this.confirmPassword)

        await this.page.locator(".oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space").click()

    }
    async searchUser(){

        await this.page.waitForSelector(".oxd-table-filter")
        await this.page.waitForTimeout(1000)
        await this.page.locator(".oxd-input.oxd-input").nth(1).fill(this.userName)
        await this.page.locator("button[type='submit']").click()
        const table = await this.page.locator('.oxd-table-body').innerText()
        console.log(table);
        const Reciveuser = await this.page.locator('.oxd-table-cell.oxd-padding-cell').nth(1).innerText()
        console.log({Reciveuser});

        await expect(Reciveuser).toEqual(this.userName) 

        console.log(`recived user is ${Reciveuser} & expected user is ${this.userName}`);

    }
}