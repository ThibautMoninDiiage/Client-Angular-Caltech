import { environment } from "src/environments/environment"

describe('My First Test', () => {
  it('Login -> User fill field -> Cancel -> Sign out', () => {
    
    cy.visit('https://preprodsa1g2b.z16.web.core.windows.net')
    cy.get('#email-input').type('cypress.test@gmail.com')
    cy.get('#password-input').type('cypresstest')
    cy.get('#signin-button').wait(1000).click()
    cy.get("#toolbar-button").wait(1000).click()
    cy.get("#toolbar-userlist-button").wait(1000).click()
    cy.get("#add-user-button").wait(1000).click()
    cy.get("#firstname").type("CypressFirstname")
    cy.get("#lastname").type("CypressLastname")
    cy.get("#username").type("CypressUsername")
    cy.get("#email").type("cypress.email@gmail.com")
    cy.get("#avatar").type("https://avatars.githubusercontent.com/u/8908513?s=280&v=4")
    cy.get("#password").type("cypresspassword")
    cy.get("#role").click()
    cy.get("#role-option").wait(1000).click()
    cy.get("#application").click()
    cy.get("#application-option").wait(1000).click()
    cy.get("#cancel-button").click()
    cy.get("#toolbar-button").wait(1000).click()
    cy.get("#signout-button").wait(1000).click()
  })
})
