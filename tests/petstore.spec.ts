import {test, expect } from '@playwright/test';
import fs from 'fs';
import * as path from 'path';

const baseURL = `https://petstore.swagger.io/v2`;

test.describe.configure({ mode: 'serial' });

test.describe('Petstore API', () => {
    test.describe('User Administration', () => {

        test.describe('Account Creation', () => {
            test.describe('Given a user provides valid account details', () => {
                const newUser = {
                    id: 1,
                    username: "testUser",
                    firstName: "test",
                    lastName: "user",
                    email: "testuser@testing.com",
                    password: "test!123",
                    phone: "1234567890",
                    userStatus: 1
                };
                test.describe('When the user clicks submit', () => {
                    test('Then the user should be created', async() => {
                        const fetchResponse = await fetch(`${baseURL}/user`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            },
                            body: JSON.stringify(newUser)
                        });
                        expect(fetchResponse.status).toBe(200);
                        
                    })
                })
            })
        })

        test.describe('User Login', () => {
            test.describe('Given a user provides valid login details', () => {
                const userLogin = {
                    username: "test",
                    password: "password"
                };
                test.describe('When the user clicks log in', () => {
                    test('Then the API should authenticate the user', async() => {
                        const queryParams = new URLSearchParams(userLogin).toString();
                        
                        const fetchResponse = await fetch(`${baseURL}/user/login?${queryParams}`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            },
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('message');
                    })
                })
            });
        })
        test.describe('Access Management', () => {
            test.describe('Given a user provides invalid login details', () => {
                const userLogin = {
                    username: "test",
                    password: "test!13"
                };
                test.describe('When the user clicks log in', () => {
                    test('Then the API should refuse access', async() => {
                        if (!userLogin.hasOwnProperty('username') || userLogin.username === '' ||
                        !userLogin.hasOwnProperty('password') || userLogin.password === '') {
                            throw new Error('Username and Password are required for login');
                        }
                        const queryParams = new URLSearchParams(userLogin).toString();

                        const fetchResponse = await fetch(`${baseURL}/user/login?${queryParams}`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            },
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('message');
                    })
                })
            });
        })
        test.describe('Bulk user create by store admin', () => {
            test.describe('Given a store admin has a list of users with valid account details', () => {
                const bulkUserList = [
                    {
                        id: 1,
                        username: "testUser",
                        firstName: "test",
                        lastName: "user",
                        email: "testuser@testing.com",
                        password: "test!123",
                        phone: "1234567890",
                        userStatus: 1
                    },
                    {
                        id: 2,
                        username: "testUser2",
                        firstName: "test",
                        lastName: "user2",
                        email: "testuser2@testing.com",
                        password: "test!123",
                        phone: "1234567890",
                        userStatus: 2
                    },
                ]
                test.describe('When the store admin clicks submit', () => {
                    test('Then the API should create user accounts for all users at once', async() => {
                        const fetchResponse = await fetch(`${baseURL}/user/createWithArray`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            },
                            body: JSON.stringify(bulkUserList)
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('message', 'ok');

                    })
                })
            })
        })

        
        test.describe('Get a user', () => {
            test.describe('Given a logged in user', () => {
                test.describe('When the logged in user requests to retrieve a user by username', () => {
                    test('Then the API should return the user details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/user/testUser`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            },
                        });
                        expect(fetchResponse.status).toBe(200); 
                        //})
                    })
                })
            })
        })
        test.describe('Update a user', () => {
            test.describe('Given a logged in user', () => {
                test.describe('When the user submits a request to update their user details', () => {
                    const updateUser = {
                        
                        id: 2,
                        username: "testUser2",
                        firstName: "test",
                        lastName: "user2",
                        email: "testuser2@testing.com",
                        password: "test!123",
                        phone: "1234567890",
                        userStatus: 2
                        
                    }
                    test('Then the API should update the user details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/user/user1`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            },
                            body: JSON.stringify(updateUser)
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('message');
                    })
                })
            })
        })

        
        test.describe('Delete a user', () => {
            test.describe('Given a logged in user', () => {
                test.describe('When the user submits a request to delete their account', () => {
                    test('Then the API should delete the user account', async() => {
                        const fetchResponse = await fetch(`${baseURL}/user/testUser2`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });

                        expect(fetchResponse.status).toBe(200);
                        
                    })
                })
            })
        })
    })
    test.describe('Store Inventory', () => {
        test.describe('Get inventory', () => {
            test.describe('Given a logged in user', async() => {
                test.describe('When the user submits a request to retrieve the store inventory', async() => {
                    test('Then the API should return the current inventory', async() => {
                        const fetchResponse = await fetch(`${baseURL}/store/inventory`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });

                        expect(fetchResponse.status).toBe(200);

                    })
                })
            })
        })

        test.describe('Create purchase order', () => {
            test.describe('Given a logged in user', async() => {
                test.describe('When the user submits a purchase order for a pet', () =>{
                        const newPurchaseOrder = {
                            
                                id: 3,
                                petId: 3,
                                quantity: 3,
                                shipDate: "2024-07-23T22:18:02.580Z",
                                status: "placed",
                                complete: true
                              
                        }
                    test('Then the API should create a new purchase order', async() => {
                        const fetchResponse = await fetch(`${baseURL}/store/order`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            }, 
                            body: JSON.stringify(newPurchaseOrder)
                        });
                    
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('id', 3);
                    })
                })
            })
        })

        test.describe('Find purchase order', () => {
            test.describe('Given a logged in user', async() => {
                test.describe('When the user submits a request to retrieve a purchase order', () =>{
                        const purchaseOrderId = 3
                    test('Then the API should return the purchase order details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/store/order/${purchaseOrderId}`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });

                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('id', purchaseOrderId);
                    })
                })
            })
        })

        test.describe('Delete purchase order', () => {
            test.describe('Given a logged in user', async() => {
                test.describe('When the user submits a request to delete a purchase order', () =>{
                        const purchaseOrderId = 3
                    test('Then the API should delete the purchase order details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/store/order/${purchaseOrderId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });

                        expect(fetchResponse.status).toBe(200);
                    })
                })
            })
        })
    })

    test.describe('Pet Management', () => {
        test.describe('Add a pet to the store', () => {
            test.describe('Given a logged in customer', () => {
                test.describe('When the customer submits a request to add a pet to the store', () => {
                    const newPet = {
                        "id": 2,
                        "category": {
                            "id": 2,
                            "name": "wild"
                        },
                        "name": "Lucille",
                        "photoUrls": [
                            "doggopic.com"
                        ],
                        "tags": [
                            {
                            "id": 1,
                            "name": "great"
                            },
                            {
                                "id": 2,
                                "name": "awesome"
                            }
                        ],
                        "status": "alwaysAvailable"
                    }
                    test('Then the API should add the pet to the store', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            }, 
                            body: JSON.stringify(newPet)
                        });
                    
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('id', 2);
                    })
                })

            })
        })

        test.describe('Find a pet', () => {
            test.describe('Given a logged in customer', () => {
                test.describe('When the customer submits a request to find a pet using the pet id', () => {
                    const petId = 2
                    test('Then the API should return the pet details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet/${petId}`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('id', petId);
                        
                    })
                })
            })
        })

        test.describe('Update a pet', () => {
            test.describe('Given a logged in customer', () => {
                test.describe('When the customer submits a request to update the details of a previously added pet', () => {
                    const updatePet = {
                        "id": 2,
                        "category": {
                            "id": 3,
                            "name": "tame"
                        },
                        "name": "Thunder",
                        "photoUrls": [
                            "doggopic1.com"
                        ],
                        "tags": [
                            {
                            "id": 2,
                            "name": "super"
                            }
                        ],
                        "status": "unavailable"
                    }
                    test('Then the API should update the pet details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            },
                            body: JSON.stringify(updatePet)
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('status', 'unavailable');
                    })
                })
            })
        })

        test.describe('Upload an image to the pet record', () => {
            test.describe('Given a logged in customer', () => {
                test.describe('When the customer submits a request to upload an image to a pet using the id', () => {
                    const imagePath = path.join(__dirname, 'text2.jpg');
                    const imageParse = fs.readFileSync(imagePath)

                    const formData = new FormData();
                    formData.append('file', new Blob([imageParse]), 'image.jpg');
                    test('Then the API should upload the image against the pet record', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet/2/uploadImage`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            },
                            body: formData
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                        expect(statusResponse).toHaveProperty('message');
                    })
                })
            })
        })

        test.describe('Find a pet by status', () => {
            test.describe('Given a logged in customer', () => {
                test.describe('the customer submits a request to find a pet using an available status option', () => {
                    const petStatus = {
                        status: 'available'
                    }
                    const queryParams = new URLSearchParams(petStatus).toString();
                    test('Then the API should return the pets matching the status', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet/findByStatus?${queryParams}`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'api_key': 'special-key'
                            },
                        });
                        expect(fetchResponse.status).toBe(200);
                        const statusResponse = await fetchResponse.json();
                    })
                })
            })
        })
        test.describe('Delete a pet', () => {
            test.describe('Given a logged in user', async() => {
                test.describe('When the user submits a request to delete a pet using the pet id', () =>{
                        const petId = 2
                    test('Then the API should delete the pets details', async() => {
                        const fetchResponse = await fetch(`${baseURL}/pet/${petId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'api_key': 'special-key'
                            }, 
                        });

                        expect(fetchResponse.status).toBe(200);
                    })
                })
            })
        })
    
    })
})
