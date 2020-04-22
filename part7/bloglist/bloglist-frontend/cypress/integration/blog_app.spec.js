describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').find('input').type('mluukkai')
      cy.contains('password').find('input').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong with wrong credentials', function() {
      cy.contains('username').find('input').type('mluukkai')
      cy.contains('password').find('input').type('wrongpassword')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('A blog can be created', function() {
        cy.contains('new note').click()
        cy.contains('title').find('input').type('test title')
        cy.contains('author').find('input').type('test author')
        cy.contains('url').find('input').type('test url')
        cy.get('.create-button').click()
        cy.contains('test title test author')
      })

      it('A blog can be liked', function() {
        cy.createBlog({ title: 'test title', author: 'test author', url: 'test url' })
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.createBlog({ title: 'test title', author: 'test author', url: 'test url' })
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('test title test author').should('not.exist')
      })

      it('A blog cant be delete by another user', function() {
        cy.createBlog({title: 'test title', author: 'test author', url: 'test url'})
        cy.contains('logout').click()
        const newUser = { username: 'test123', password: 'test123' }
        cy.request('POST', 'http://localhost:3001/api/users/', newUser)
        cy.login(newUser)
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it.only('Blogs are sorted by like amount', function() {
        const blogs = [
          {
            title: 'worst blog',
            author: 'bad author',
            url: '',
            likes: 2
          },
          {
            title: 'blog',
            author: 'author',
            url: '',
            likes: 5
          },
          {
            title: 'best blog',
            author: 'best author',
            url: '',
            likes: 10
          }
        ]
        const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes).map(blog => `${blog.title} ${blog.author}`)
        console.log(sortedBlogs)
        blogs.forEach(blog => {
          cy.createBlog(blog)
        })
        cy.get('.blog')
          .then($blogs => {
            return $blogs.map((index,html) => Cypress.$(html).text().replace('view','')).get()
          })
          .should('deep.eq', blogs.sort((a,b) => b.likes - a.likes).map(blog => `${blog.title} ${blog.author}`))
      })
    })
  })
})