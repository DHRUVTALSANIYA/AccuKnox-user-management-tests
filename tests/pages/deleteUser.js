import { page, locator, expect } from "@playwright/test"
import { baseURL } from "../utils/testData"
import { CreateUserPage } from "./createuser.js"

export class DeleteUser {
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
        await this.page.locator(".oxd-select-text.oxd-select-text").nth(0).click()
        await this.page.getByRole('option', { name: 'ESS' }).click()
        await this.page.locator("button[type='submit']").click()
    }
    async deleteUser() {
        await this.page.locator(".oxd-icon-button.oxd-table-cell-action-space").nth(0).click()
        await this.page.locator(".oxd-icon.bi-trash.oxd-button-icon").click()
    }
    async verifyDeletedUser() {
        await this.page.waitForSelector(".oxd-table-filter")
        await this.page.waitForTimeout(1000)
        await this.page.locator(".oxd-input.oxd-input").nth(1).fill(this.userName)
        await this.page.locator(".oxd-select-text.oxd-select-text").nth(0).click()
        await this.page.getByRole('option', { name: 'ESS' }).click()
        await this.page.locator("button[type='submit']").click()

        await this.page.waitForSelector(".orangehrm-paper-container")
        const Records = await this.page.locator(".orangehrm-horizontal-padding.orangehrm-vertical-padding")


        await expect(Records).toHaveText("No Records Found")

    }
}
