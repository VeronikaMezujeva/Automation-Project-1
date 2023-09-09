beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Visual test for registration form 3', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 167).and('be.greaterThan', 100)
        cy.get('img').invoke('width').should('be.lessThan', 179).and('be.greaterThan', 90)
    })

    it('Check radio buttons', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    })

    it('Check country checklist', () => {
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        cy.get('#country').select('Estonia')
    })

    it('Checkboxes', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).click()
    })

    it('Email field', () => {
        cy.get('[ng-model="email"]').type('tere')
        cy.get('h2').contains('Birthday').click()
        cy.get('#emailAlert').should('be.visible').should('contain', 'Invalid email address.')
        cy.get('[ng-model="email"]').scrollIntoView()
        cy.get('[ng-model="email"]').clear()
        cy.get('[ng-model="email"]').type('testuser@test.com')
        cy.get('#emailAlert').should('not.be.visible')
    })
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
describe('Functional test for registration form 3', () => {
    it('All fields are filled in + validation', () => {
        cy.get('#name').clear()
        cy.get('#name').type('Paul Paul')
        cy.get('[ng-model="email"]').type('paul@test.com')
        cy.get('#country').select('Austria')
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
        cy.get('#city').select('Salzburg')
        cy.get('input[type="date"]').eq(0).click().type('2023-09-01')
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).check().should('be.checked')
        cy.get('input[type="date"]').eq(1).click().type('2020-12-31')
        cy.get('#myFile').selectFile('cypress/fixtures/cypress_logo.png')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="Submit"]').eq(1.).should('be.enabled')
        cy.get('input[type="Submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    })

    it('Only mandatory fields are filled in', () => {
        cy.get('#name').clear()
        cy.get('[ng-model="email"]').type('paul@test.com')
        cy.get('input[type="date"]').eq(0).click().type('2023-09-01')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="Submit"]').eq(1.).should('be.enabled')
        cy.get('input[type="Submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    })

    it('Mandatory fields are absent', () => {
        cy.get('#name').clear()
        cy.get('[ng-model="email"]').type('paul@test.com')
        cy.get('[ng-model="email"]').scrollIntoView()
        cy.get('[ng-model="email"]').clear()
        cy.get('#emailAlert').should('be.visible').should('contain', 'Email is required')
        cy.get('[ng-model="email"]').type('paul@test.com')
        cy.get('input[type="date"]').eq(0).click().type('2023-09-01')
        cy.get('input[type="Submit"]').eq(1.).should('be.disabled')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="Submit"]').eq(1.).should('be.enabled')
        cy.get('input[type="Submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    })


    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        cy.get('#name').clear()
        cy.get('[ng-model="email"]').type('paul@test.com')
        cy.get('input[type="date"]').eq(0).click().type('2023-09-01')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('#country').scrollIntoView()
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="Submit"]').eq(1.).should('be.enabled')
        cy.get('input[type="Submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    })

})