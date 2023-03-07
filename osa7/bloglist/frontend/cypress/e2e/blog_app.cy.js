import { func } from "prop-types"

describe("Blog app", function() {
	beforeEach(function() {
		cy.request("POST", "http://localhost:3003/api/testing/reset")
		const user = {
			name: "Mr Testerman",
			username: "testerman",
			password: "testword"
		}

		const user2 = {
			name: "not Mr Testerman2",
			username: "nottesterman",
			password: "testword2"
		}
		cy.request("POST", "http://localhost:3003/api/users", user)
		cy.request("POST", "http://localhost:3003/api/users", user2)
		cy.visit("http://localhost:3000")
	})

	describe("login", function() {
		it("front page can be opened", function() {
			cy.contains("log in to application")
		})
  
		it("user can log in", function() {
			cy.get("#username").type("testerman")
			cy.get("#password").type("testword")
			cy.get("#login-button").click()
			cy.contains("Mr Testerman logged in")
		})

		it("user cant log in with wrong password", function() {
			cy.get("#username").type("testerman")
			cy.get("#password").type("wrong")
			cy.get("#login-button").click()
			cy.contains("invalid username or password")
		})
	})

	describe("blog creation", function() {
		beforeEach(function() {
			cy.get("#username").type("testerman")
			cy.get("#password").type("testword")
			cy.get("#login-button").click()
		})

		it("user can click 'new note' button", function() {
			cy.get("#new-note-button").click()
			cy.contains("create new")
		})

		it("user can click cancel button to hide blog creation", function() {
			cy.get("#new-note-button").click()
			cy.contains("create new")
			cy.get("#cancel-button").click()
			cy.contains("new note")
		})

		it("user can create a new blog", function() {
			cy.get("#new-note-button").click()
			cy.get("#title").type("Test Blog")
			cy.get("#author").type("testerman")
			cy.get("#url").type("www.testerman.com")
			cy.get("#create-button").click()
			cy.contains("Test Blog")
			cy.contains("testerman")
		})
	})

	describe("blog manipulation", function() {
		beforeEach(function() {
			cy.get("#username").type("testerman")
			cy.get("#password").type("testword")
			cy.get("#login-button").click()
			cy.get("#new-note-button").click()
			cy.get("#title").type("First Test Blog")
			cy.get("#author").type("testerman")
			cy.get("#url").type("www.testerman.com")
			cy.get("#create-button").click()
		})

		it("'view' button can be clicked", function() {
			cy.get("#view-button").click()
			cy.contains("www.testerman.com")
		})

		it("like button works", function() {
			cy.get("#view-button").click()
			cy.get("#likes").contains("0")
			cy.get("#like-button").click()
			cy.get("#likes").contains("1")
		})

		it("delete button works", function() {
			cy.get("#view-button").click()
			cy.get("#delete-button").click()
			cy.contains("First Test Blog").should("not.exist")
		})

		it("only user who created the blog can see delete button", function() {
			cy.get("#logout-button").click()
			cy.get("#username").type("nottesterman")
			cy.get("#password").type("testword2")
			cy.get("#login-button").click()
			cy.get("#view-button").click()
			cy.get("#delete-button").should("not.exist")
		})

		it("blogs are arranged by likes", function() {
			cy.get("#new-note-button").click()
			cy.get("#title").type("Another Test Blog")
			cy.get("#author").type("testerman")
			cy.get("#url").type("www.testerman.com")
			cy.get("#create-button").click()
			cy.contains("First Test Blog").parent().find("#view-button").click()
			cy.contains("Another Test Blog").parent().find("#view-button").click()
			cy.get(".blog").eq(0).should("contain", "First Test Blog")
			cy.get(".blog").eq(1).find("#like-button").click()
			cy.get(".blog").eq(0).should("contain", "Another Test Blog")
		})
	})
})