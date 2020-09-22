const listHelper = require("../utils/list_helper")

const blogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 12,
    __v: 0
}, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
}, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}, {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
}, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
}, {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}]
const singleBlog = [{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0}]
const singleBlogZeroLikes = [{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
    __v: 0}]
const emptyBlogList = []

test("dummy returns 1", () => {
    const result = listHelper.dummy(emptyBlogList)
    expect(result).toBe(1)
})

describe("total likes ", () => {

    test("work with zero as sum and single blog", () => {
        const result = listHelper.totalLikes(singleBlogZeroLikes)
        expect(result).toBe(0)
    })

    test("work with empty list", () => {
        const result = listHelper.totalLikes(emptyBlogList)
        expect(result).toBe(0)
    })

    test("work for a list with single blog", () => {
        const result = listHelper.totalLikes(singleBlog)
        expect(result).toBe(5)
    })

    test("work for a bigger list", () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(41)
    })
})

describe("favorite blog by likes ", () => {

    test("works with a single blog", () => {
        const result = listHelper.favoriteBlog(singleBlog)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5,
        })
    })

    test("works with list of blogs with same max likes", () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 12,
        })
    })

})

describe("author with most blogs", () => {

    test("works with no blogs", () => {
        const result = listHelper.mostBlogs(emptyBlogList)
        expect(result).toEqual({error: "No blogs given."})
    })

    test("works with single blog", () => {
        const result = listHelper.mostBlogs(singleBlog)
        expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 1})
    })

    test("works with multiple blogs", () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
    })

})

describe("author with most likes", () => {

    test("works with no blog", () => {
        const result = listHelper.mostLikes(emptyBlogList)
        expect(result).toEqual({error: "No blogs given."})
    })

    test("works with single blog", () => {
        const result = listHelper.mostLikes(singleBlog)
        expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 5})
    })

    test("works with single blog with no likes", () => {
        const result = listHelper.mostLikes(singleBlogZeroLikes)
        expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 0})
    })

    test("works with multiple blogs", () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 17})
    })

})