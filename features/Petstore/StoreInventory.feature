Feature: Store Inventory
    
    Scenario: Get inventory
        Given a logged in user
        When the user submits a request for the store inventory
        Then the API should return the current inventory
        And return a successful operation

    Scenario: Find purchase order
        Given a logged in user
        When the user submits a request to find a purchase order using the order id
        Then the API should return the order
        And return a successful operation

    Scenario: Delete purchase order
        Given a logged in user
        When the user submits a request to delete a purchase order using the order id
        Then the API should delete the order
    
    Scenario: Place an order
        Given a logged in customer user
        When the customer submits a purchase  order for a pet
        Then the API should create a new purchase order
        And return a successful operation
