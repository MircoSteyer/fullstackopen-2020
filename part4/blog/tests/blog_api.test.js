const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const app = require("../app")

const api = supertest(app)

const testBlogs = [
    {
        "title": "Test Blog 1",
        "author": "Test Tester",
        "url": "www.testblog1.com",
        "likes": 1,
    },
    {
        "title": "Test Blog 2",
        "author": "Test Tester",
        "url": "www.testblog2.com",
        "likes": 2,
    },
    {
        "title": "Test Blog 3",
        "author": "Different Test Person",
        "url": "www.testblog3.com",
        "likes": 3,
    }]


beforeEach(async () => {
    jest.setTimeout(10000)
    await Blog.deleteMany({})
    for (const testBlog of testBlogs) {
        let newBlog = new Blog(testBlog)
        await newBlog.save()
    }
})

describe("get /api/blogs", () => {

    test("returns correct format", async () => {
        const response = await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
        
        expect(response.body[0]).toEqual(expect.objectContaining({
            title: "Test Blog 1",
            author: "Test Tester",
            url: "www.testblog1.com",
            likes: 1,
            id: expect.any(String)
        }))
    })

    test("returns correct amount of blogs", async () => {
        const response = await api.get("/api/blogs").expect(200)
        expect(response.body).toHaveLength(testBlogs.length)
    })

    test("check if id is properly defined", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0]._id).not.toBeDefined()
        expect(response.body[0].id).toBeDefined()
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})