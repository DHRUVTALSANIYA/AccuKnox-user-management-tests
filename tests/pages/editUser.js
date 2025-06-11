import { page, locator, expect } from "@playwright/test"
import { baseURL } from "../utils/testData"
import { CreateUserPage } from "./createuser.js"

export class EditUserPage {
    constructor(page) {
        this.page = page
        this.createUserPage = new CreateUserPage(page)
        this.userName = this.createUserPage.userName
        this.dropdowen = ".oxd-select-text.oxd-select-text"

    }
    async goto() {
        await this.page.goto(`${baseURL}admin/viewSystemUsers`)
    }

    async searchUser() {
        await this.page.waitForSelector(".oxd-table-filter")
        await this.page.waitForTimeout(1000)
        await this.page.locator(".oxd-input.oxd-input").nth(1).fill(this.userName)
        await this.page.locator("button[type='submit']").click()
        const table = await this.page.locator('.oxd-table-body').innerText()
        console.log(table);
        const Reciveuser = await this.page.locator('.oxd-table-cell.oxd-padding-cell').nth(1).innerText()
        console.log({ Reciveuser });

        await expect(Reciveuser).toEqual(this.userName)

        console.log(`recived user is ${Reciveuser} & expected user is ${this.userName}`);
    }
    async editUser() {
        await this.page.locator("(//button[@type='button'])[8]").click()
        await this.page.locator(this.dropdowen).nth(0).click()
        await this.page.getByRole('option', { name: 'ESS' }).click()
        await this.page.locator("button[type='submit']").click()
    }
    async verifyUser() {
        await this.page.waitForSelector(".oxd-table-filter")
        await this.page.waitForTimeout(1000)
        await this.page.locator(".oxd-input.oxd-input").nth(1).fill(this.userName)
        await this.page.locator(".oxd-select-text.oxd-select-text").nth(0).click()
        await this.page.getByRole('option', { name: 'ESS' }).click()
        await this.page.locator("button[type='submit']").click()

        const table = await this.page.locator('.oxd-table-body').innerText()
        console.log(table);
        const Reciveuser = await this.page.locator('.oxd-table-cell.oxd-padding-cell').nth(1).innerText()
        console.log({ Reciveuser });

        await expect(Reciveuser).toEqual(this.userName)

        console.log(`recived user is ${Reciveuser} & expected user is ${this.userName}`);

    }
}