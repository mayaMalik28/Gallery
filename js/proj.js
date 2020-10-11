'use strict'

var gProjects = [
    createProject('book-shop', 'title', 'desc', ['labels']),
    createProject('cmt-association', 'title', 'desc', ['labels']),
    createProject('mine-sweeper', 'title', 'desc', ['labels']),
    createProject('pacman', 'title', 'desc', ['labels']),
    createProject('touch-nums', 'title', 'desc', ['labels']),
]

function createProject(name, title, desc, publishedAt = Date.now(), labels) {
    return {
        id: name,
        name,
        title,
        desc,
        url: `./projs/${name}/index.html`,
        publishedAt,
        labels,
    }
}

function getProjects() {
    return gProjects;
}

function getProjById(projId) {
    var proj = gProjects.find(function(proj) {
        return (proj.id === projId)
    })
    if (proj) return proj;
}