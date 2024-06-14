class IssueTimeTrack {
  getIssueDetailsModal() {
    return cy.get('[data-testid="modal:issue-details"]', { timeout: 60000 }).should("exist");
  }

  typeEstimation(hours) {
    return this.getIssueDetailsModal().within(() => {
      cy.get('input[placeholder="Number"]', { timeout: 60000 }).should("be.visible").clear().type(hours);
    });
  }

  waitForEstimation(estimation) {
    return this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().should("contain", estimation);
    });
  }

  waitForNoEstimation() {
    return this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().should("not.contain", /\d/);
    });
  }

  addEstimation(estimation) {
    return this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      this.typeEstimation(estimation);
    }).then(() => {
      this.waitForEstimation(estimation);
    });
  }

  editEstimation(newEstimation) {
    return this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      this.typeEstimation(newEstimation);
    }).then(() => {
      this.waitForEstimation(newEstimation);
    });
  }

  removeEstimation() {
    return this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      cy.get('input[placeholder="Number"]', { timeout: 60000 }).clear();
      cy.get('[data-testid="modal:issue-details"]', { timeout: 60000 }).click();
    }).then(() => {
      this.waitForNoEstimation();
    });
  }
}

export default IssueTimeTrack;
