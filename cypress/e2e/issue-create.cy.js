import { faker } from '@faker-js/faker';
import IssueTimeTrack from "../pages/IssueTimeTrack.js";

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).should('be.visible')
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.get('.ql-editor').should('have.text', 'TEST_DESCRIPTION');

      cy.get('input[name="title"]').type('TEST_TITLE');
      cy.get('input[name="title"]').should('have.value', 'TEST_TITLE');

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]').wait(1000).trigger('mouseover').trigger('click');
      cy.get('[data-testid="icon:story"]').should('be.visible');

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      cy.get('button[type="submit"]').click();
    });

    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
       
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains('TEST_TITLE')
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});

//TEST CASE 1: custom issue creation //
describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('TC1 - Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).should('be.visible')
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('My bug description');
      cy.get('.ql-editor').should('have.text', 'My bug description');
      cy.get('input[name="title"]').type('Bug');
      cy.get('input[name="title"]').should('have.value', 'Bug');
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').wait(1000).trigger('mouseover').trigger('click');
      cy.get('[data-testid="icon:bug"]').should('be.visible');  
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible')

    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]')
    .should('be.visible')
    .and('have.length', '1')
    .within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('Bug')
        .siblings()
        .within(() => {
          cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
          cy.get('[data-testid="icon:bug"]').should('be.visible');
        }); 
      });     
  });
})

//TEST CASE 2: Random Data Plugin Issue Creation//
//Title: Use the random data plugin for a single word. ; Description: Use the random data plugin for several words. ; Issue type: “Task” ; Priority: “Low” ; Reporter: “Baby Yoda” //

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

it('TC2 - Should create a task issue with random data and validate it successfully', () => {
  const randomTitle = faker.random.word();
  const randomDescription = faker.random.words(5);

  cy.get('[data-testid="modal:issue-create"]', { timeout:50000 }).should('be.visible')
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('randomDescription');
    cy.get('.ql-editor').should('have.text', 'randomDescription');
    cy.get('input[name="title"]').type('randomTitle');
    cy.get('input[name="title"]').should('have.value', 'randomTitle');
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select:type"]').should('contain', 'Task');
    cy.get('[data-testid="icon:task"]').should('be.visible');
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    cy.get('button[type="submit"]').click();
  });

  cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');

  cy.reload();
  cy.contains('Issue has been successfully created.').should('not.exist');

  cy.get('[data-testid="board-list:backlog"]')
    .should('be.visible')
    .and('have.length', '1')
    .within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('randomTitle')
        .siblings()
        .within(() => {
          cy.get('[data-testid="icon:task"]').should('be.visible');
        });
    });
});
});
describe("Time-tracking functionality tests of the issue", () => {
  const issueTimeTracker = new IssueTimeTrack();
  const estimation = "10";
  const newEstimation = "20";
  const logHours = "2";
  const newLogHours = "3";
  const issueDescription = "Creating a ticket for time tracking functionality testing";
  const issueTitle = "Time track test";
  const issueCreatedConfirmation = "Issue has been successfully created";
  const backLogList = '[data-testid="board-list:backlog"]';
  const estimatedInputField = 'input[placeholder="Number"]';

  beforeEach(() => {
    cy.visit("/");

    // Increase timeout for the URL assertion
    cy.url({ timeout: 60000 })
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.log("Navigated to URL:", url);
        cy.visit(url + "/board?modal-issue-create=true");

        // Intercept the request for creating an issue
        cy.intercept("POST", "**/rest/api/2/issue").as("createIssue");

        // Creating new issue to update time
        cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).within(() => {
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Bug"]').click();
          cy.get(".ql-editor").type(issueDescription);
          cy.get('input[name="title"]').type(issueTitle);
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select-option:Lord Gaben"]').click();
          cy.get('button[type="submit"]').click();
        });

        // Check for confirmation message
        cy.contains(issueCreatedConfirmation, { timeout: 60000 }).should("be.visible");

        // Scroll backlog list into view to ensure the new issue is visible
        cy.get(backLogList, { timeout: 60000 })
          .scrollIntoView()
          .should("be.visible");

        // Click on the newly created issue
        cy.get(backLogList, { timeout: 60000 })
          .contains(issueTitle)
          .scrollIntoView()
          .click();
      });
  });

  it("Should perform time estimation functionality: add, edit, and remove estimation", () => {
    // Add estimation
    issueTimeTracker.addEstimation(estimation);

    // Ensure the estimation field is visible before interacting
    cy.contains("Original Estimate (hours)", { timeout: 60000 })
      .parent()
      .should("be.visible")
      .click();

    // Add the estimation
    cy.get(estimatedInputField, { timeout: 60000 }).type(estimation);
    cy.get('[data-testid="modal:issue-details"]', { timeout: 60000 }).click(); // Click outside the modal to save


    // Ensure the estimation is added
    cy.contains("Original Estimate (hours)", { timeout: 60000 })
      .parent()
      .should("contain", estimation);

    // Edit the estimation
    issueTimeTracker.editEstimation(newEstimation);

    // Remove the estimation
    issueTimeTracker.removeEstimation();
  });
});
