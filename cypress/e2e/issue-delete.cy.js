describe('Issue deletion', () => {
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
    
// Assignment 3, TEST CASE 1 - issue deletion
it('Should delete an issue and validate it successfully', () => {
    getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:trash"]').click();
    });
        cy.get('[data-testid="modal:confirm"]').should("be.visible");
        cy.get('[data-testid="modal:confirm"]').within(() => {
          cy.get("button").contains("Delete issue").click();
        });
    
        cy.get('[data-testid="modal:confirm"]').should("not.exist");
        cy.get('[data-testid="modal:issue-details"]').should("not.exist");
        cy.get('[data-testid="board-list:backlog"]').within(() => {
          cy.contains("This is an issue of type: Task.").should("not.exist");
          cy.get('[data-testid="list-issue"]').should("have.length", 3);
        });
      });


// Assignment 3, TEST CASE 2 - should initiate the deletion and then cancel it successfully
it("Should initiate the deletion and then cancel it successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Cancel").click();
    });

    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    cy.get('[data-testid="icon:close"]').eq(0).click();
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains("This is an issue of type: Task.").should("be.visible");
      cy.get('[data-testid="list-issue"]').should("have.length", 4);
    });
  });
});
