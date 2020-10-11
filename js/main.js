'use strict'

$(document).ready(onInit);


function onInit() {
    console.log('Starting up');
    renderProjects();
    renderModals();
}

function renderProjects() {
    var projects = getProjects();
    var strHTML = projects.reduce(function(str, project) {
        return str + `<div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${project.id}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="img/portfolio/${project.name}.jpg" alt="project">
                </a>
                <div class="portfolio-caption">
                    <h4>${project.name}</h4>
                    <p class="text-muted">${project.title}</p>
                </div>
            </div>`
    }, '')
    $('.proj-container').html(strHTML);
}

function renderModals() {
    var projects = getProjects();
    var strHTML = projects.reduce(function(str, project) {
        return str + `<div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                    <div class="lr">
                        <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <!-- Project Details Go Here -->
                               <h2>${project.name}</h2>
                                <p class="item-intro text-muted">${project.title}</p>
                                <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.name}.jpg" alt="">
                                <p>${project.desc}</p>
                                <ul class="list-inline">
                                    <li>Date: January 2017</li>
                                    <li>Client: Threads</li>
                                    <li>Category: Illustration</li>
                                </ul>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
                    <button class="btn btn-primary" type="button">
                    <a class="proj-url" href="${project.url}"></a>Wach me</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }, '');
    $('.proj-modals').html(strHTML);
}