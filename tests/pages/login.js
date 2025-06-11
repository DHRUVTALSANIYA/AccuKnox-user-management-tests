import {page, locator, expect} from "@playwright/test"
import { baseURL, loginTestData } from "../utils/testData"

export class LoginPage{
    constructor(page){
        this.page=page
        this.usernameInput=page.locator('input[name="username"]')
        this.passwordInput=page.locator('input[name="password"]')
        this.loginButton=page.locator("button[type='submit']")
    }
    async goto(){
        await this.page.goto(`${baseURL}auth/login`)
    }
    async login(){
        await this.usernameInput.fill(loginTestData.username)
        await this.passwordInput.fill(loginTestData.password)
        await this.loginButton.click()
    }
    async verifyLogin(){
        await expect(this.page).toHaveURL(`${baseURL}dashboard/index`)
    }
    async timeout(ms=5000){
        await this.page.waitForTimeout(ms)
    }
}