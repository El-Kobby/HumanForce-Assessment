Feature: Pet Management

    Scenario: Add a pet to the store
        Given a logged in customer 
        When the customer submits a request to add a pet to the store
        Then the API should add the pet to the store
        And return a successful operation

    Scenario: Find a pet
        Given a logged in customer
        When the customer submits a request to find a pet using the pet id
        Then the API should return the pets details
        And return a successful operation

    Scenario: Update pet details
        Given a logged in customer
        When the customer submits a request to update the details of a previously added pet
        Then the API should update the details of the added pet

    Scenario: Upload an image to a pet record
        Given a logged in customer
        When the customer submits a request to upload an image to a pet using the id
        Then the API should upload the image against the pet record
        And return a successful operation

    Scenario: Find a pet by status
        Given a logged in customer
        When the customer submits a request to find a pet using an available status option (available, pending, sold)
        Then the API should return the pets matching the status
        And return a successful operation

    Scenario: Delete a pet
        Given a logged in customer
        When the customer submits a request to delete a pet using the pet id
        Then the API should delete the pet