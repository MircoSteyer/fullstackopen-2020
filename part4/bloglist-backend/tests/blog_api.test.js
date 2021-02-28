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
let token = {}

beforeAll(async () => {
    await api.post("/api/users").send(
        {username: "testuser",
            name: "Test Tester",
            password: "testuser"})

    token = await api.post("/api/login").send(
        {username: "testuser",
            password: "testuser"})
})

describe("bloglist-frontend tests", () => {

    beforeEach(async () => {
        jest.setTimeout(10000)
        await Blog.deleteMany({})
        for (const testBlog of testBlogs) {
            await api.post("/api/blogs")
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(testBlog)
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
                id: expect.any(String),
                user: expect.any(Object)
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

    describe("post /api/blogs", () => {

        test("adding bloglist-frontend increases amount of blogs by one", async () => {
            const newBlog = {
                title: "Test Blog 4",
                author: "Different Test Person",
                url: "www.testblog4.com",
                likes: 4,
            }
            await api.post("/api/blogs")
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(newBlog)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            const allBlogs = await api.get("/api/blogs").expect(200)
            expect(allBlogs.body).toHaveLength(testBlogs.length + 1)

        })

        test("correctly formatted bloglist-frontend is added", async () => {
            const newBlog = {
                title: "Test Blog 4",
                author: "Different Test Person",
                url: "www.testblog4.com",
                likes: 4,
            }
            await api.post("/api/blogs")
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(newBlog)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            const allBlogs = await api.get("/api/blogs").expect(200)
            expect(allBlogs.body[3]).toEqual(expect.objectContaining({
                title: "Test Blog 4",
                author: "Different Test Person",
                url: "www.testblog4.com",
                likes: 4
            }))
        })

        test("adding bloglist-frontend without title or author fails, denies with reason", async () => {
            const newBlog = {
                url: "www.testblog4.com",
                likes: 4
            }
            await api.post("/api/blogs")
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(newBlog)
                .expect(400, {error: "Blog validation failed: title: Title is required., author: Author is required."})
        })

        test("adding bloglist-frontend without likes will default likes to 0", async () => {
            const newBlog = {
                title: "Test Blog 4",
                author: "Different Test Person",
                url: "www.testblog4.com"
            }

            await api.post("/api/blogs")
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(newBlog)
                .expect(200)
            const allBlogs = await api.get("/api/blogs").expect(200)
            expect(allBlogs.body[3]).toHaveProperty("likes")
            expect(allBlogs.body[3].likes).toBe(0)
        })

    })

    describe("delete /api/blogs/:id", () => {

        test("deleting note works", async () => {
            const beginningBlogs = await api.get("/api/blogs").expect(200)
            expect(beginningBlogs.body).toHaveLength(3)

            await api.delete(`/api/blogs/${beginningBlogs.body[0].id}`)
                .set("Authorization", `Bearer ${token.body.token}`)
                .expect(204)

            const endingBlogs = await api.get("/api/blogs").expect(200)
            expect(endingBlogs.body).toHaveLength(2)
        })

    })

    describe("put /api/blogs/id", () => {

        test("updating with correct id works", async () => {
            const updatedBlog = {
                title: "Test Blog 1 + 1",
                author: "Different Test Person + 1",
                url: "www.testblog4.com + 1",
                likes: 30000
            }
            const allBlogs = await api.get("/api/blogs").expect(200)
            const idToUpdate = allBlogs.body[0].id
            const newBlog = await api.put(`/api/blogs/${idToUpdate}`)
                .set("Authorization", `Bearer ${token.body.token}`)
                .send(updatedBlog)
                .expect(200)
            expect(newBlog.body).toEqual(expect.objectContaining({
                title: "Test Blog 1 + 1",
                author: "Different Test Person + 1",
                url: "www.testblog4.com + 1",
                likes: 30000
            }))
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
