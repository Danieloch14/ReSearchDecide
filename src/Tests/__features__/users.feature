Feature: User Management

  Scenario: Creating a new user
    Given I am on the registration page
    When I fill in the registration form with valid information
    And I submit the form
    Then I should be redirected to the login page

  Scenario: Logging in as an existing user
    Given I am on the login page
    When I enter my valid credentials
    And I click the login button
    Then I should be logged in and redirected to the dashboard