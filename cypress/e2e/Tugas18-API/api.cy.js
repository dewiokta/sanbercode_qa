describe('Test Modul Category', () => {
    it('TC01-Get a single category by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/9',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id', 9)
            expect(response.body).to.have.property('name', 'Electronics')
        })
    })

    it('TC02-Get All category', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body[0]).to.have.property('id')
        })
    })

    it('TC03-Get a single category by slug', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/slug/electronics',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('slug')
        })
    })

    it('TC04-Get all Products by Category ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/9/products',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body[1]).to.have.property('title')
        })
    })

    it('TC05-Get a single category by Invalid ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/999',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('TC06-Get all Products by Invalid Category ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/categories/999/products',
        }).then((response) => {
            expect(response.status).to.eq(200) // return status 200 because the API returns an empty array for invalid category ID
            expect(response.body).to.be.an('array') 
        })
    })

    it('TC07-Create a new category', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                name: "New Category-Flatshoes",
                image: "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name', 'New Category-Flatshoes')
            expect(response.body).to.have.property('image')
        })
    })

    it('TC08-Update category', () => {
        cy.request({
            method: 'PUT',
            url: 'https://api.escuelajs.co/api/v1/categories/66',
            body: {
                name: "New Category-Flatshoes-Updated",
                image: "https://placeimg.com/640/480/any"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name', 'New Category-Flatshoes-Updated')
            expect(response.body).to.have.property('image')
        })
    })

    it('TC09-Create a new Category with Invalid Data', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories/',
            body: {
                name: "",
                image: "https://placeimg.com/640/480/any"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('TC10-Update a Category with Invalid ID', () => {
        cy.request({
            method: 'PUT',
            url: 'https://api.escuelajs.co/api/v1/categories/999',
            body: {
                name: "Updated Invalid Category",
                image: "https://placeimg.com/640/480/any"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('TC11-Delete a Category', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/66',
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('TC12-Delete a Category with Invalid ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/999',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

})