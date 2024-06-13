const issueTitle = "This is an issue of type: Task.";
describe("Issue deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
        cy.get('[data-testid="modal:issue-details"]').should("exist");
      });
  });

  it("Deleting an issue and validating it", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Delete issue").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("not.exist");
      cy.get('[data-testid="list-issue"]').should("have.length", 3);
    });
  });

  it("Deleting an issue and cancelling it ", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("Cancel").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("exist");
    cy.get('[data-testid="icon:close"]').eq(0).click();
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains(issueTitle).should("exist");
      cy.get('[data-testid="list-issue"]').should("have.length", 4);
    });
  });
});