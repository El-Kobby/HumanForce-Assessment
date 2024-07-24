Feature: User Administration

    Scenario: Account Creation
        Given a user provides valid account details
        When the user clicks submit
        Then the API should create a new account for the user
        And return successful operation

    Scenario: User Login
        Given a user provides valid login details
        When the user clicks log in
        Then the API should authenticate the user
        And return successful operation

    Scenario: Access Management
        Given an anonymous user or a user without an account
        When the user attempts to login
        Then the API should refuse access
        And return an invalid username/password supplied response

    Scenario: Bulk user creation by store Administrator
        Given a store admin has a list of users with valid account details
        When the admin submits a request to create users in bulk
        Then the API should create accounts for all users at once
        Then return a successful operation

    Scenario: Get a User
        Given a logged in user
        When the logged in user requests to retrieve a user by username
        Then the API should return the user details
        And return a successful operation

    Scenario: Update a user
        Given a logged in user
        When the user submits a request to update a user details using the username
        Then the API should update the user details
        And return a successful operation

    Scenario: Delete a user
        Given a logged in user
        When the user submits a request to delete a user using the username
        Then the API should delete the user

