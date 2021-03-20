import React from "react"
import {fireEvent, prettyDOM, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import Blog from "./Blog"

describe("<Blog/>", () => {

    let component
    let blog

    const deleteBlog = jest.fn()
    const updateBlog = jest.fn()

    const user = {
        user: "Test Tester",
        username: "testingman"
    }

    beforeEach(() => {

        blog = {
            title: "test title",
            author: "test author",
            url: "test.com",
            likes: 10,
            user: {
                user: "Test Tester",
                username: "testingman"
            }
        }

        component = render(
            <Blog user={user} deleteBlog={deleteBlog} blog={blog} updateBlog={updateBlog}/>
        )
    })

    test("blog renders title and author by default, but not url or likes", () => {
        const blogPreview = component.getByText("test title test author")
        expect(blogPreview).toBeDefined()
    })

    test("show button shows blogdetails", () => {
        const showButton = component.getByText("show")
        fireEvent.click(showButton)

        const blogDetails = component.container.querySelector(".blogDetails")
        expect(blogDetails).toBeDefined()

    })

    test("details are shown and is likes twice", () => {

        const showButton = component.getByText("show")
        fireEvent.click(showButton)

        const likeButton = component.getByText("Like")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(blog.likes).toEqual(12)
    })


})

