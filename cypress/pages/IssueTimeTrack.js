class IssueTimeTrack {
  getIssueDetailsModal() {
    return cy.get('[data-testid="modal:issue-details"]');
  }

  typeEstimation(hours) {
    cy.get('input[placeholder="Number"]').clear().type(hours);
  }

  waitForEstimation(estimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)").parent().should("contain", estimation);
    });
  }

  waitForNoEstimation() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)").parent().should("not.contain", /\d/);
    });
  }

  addEstimation(estimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)").parent().click();
      this.typeEstimation(estimation);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForEstimation(estimation);
  }

  editEstimation(newEstimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)").parent().click();
      this.typeEstimation(newEstimation);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForEstimation(newEstimation);
  }

  removeEstimation() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)").parent().click();
      cy.get('input[placeholder="Number"]').clear();
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForNoEstimation();
  }
}

export default IssueTimeTrack;
