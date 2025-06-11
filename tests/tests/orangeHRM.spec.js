import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/login"
import { CreateUserPage } from "../pages/createuser"
import { EditUserPage } from "../pages/editUser"
import { describe } from "node:test"
import { DeleteUser } from "../pages/deleteUser"


describe("Login then create User,Edit User,Delete User", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login()
        await loginPage.verifyLogin()
    })
    test("Create user", async ({ page }) => {
        const createUser = new CreateUserPage(page)

        await createUser.goto()
        await createUser.addAdminName()
        await createUser.adduser()
        await createUser.searchUser()
    })
    test("Edit user", async ({ page }) => {
        const editUser = new EditUserPage(page)

        await editUser.goto()
        await editUser.searchUser()
        await editUser.editUser()
        await editUser.verifyUser()
    })
    test("Delete user", async ({ page }) => {
        const deleteUser = new DeleteUser(page)

        await deleteUser.goto()
        await deleteUser.searchUser()
        await deleteUser.deleteUser()
        await deleteUser.verifyDeletedUser()
    })
})



