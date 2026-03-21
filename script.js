        // HEADER AND DROPDOWN MENU

const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header-container');
const menu = document.querySelector('.menu');
const openMenuBtn = document.querySelector('.burger-menu');
const openMenuImg = document.querySelector('.icon-open');
const closeMenuImg = document.querySelector('.icon-close');
const mainContainer = document.querySelector('.container')

function updateHeader(){
    const isScrolled = window.scrollY > 0;
    const isDesktop = window.innerWidth > 700;

    header.classList.toggle('header-scroll', isScrolled);

    let headerHeight;

    if(isDesktop){
        headerHeight = isScrolled ? '80px' : '100px';
        mainContainer.style.marginTop = "120px"
    }else{
        headerHeight = isScrolled ? '60px' : '80px';
        mainContainer.style.marginTop = "100px"
    }

    headerContainer.style.height = headerHeight;

    if (menu) {
        menu.style.top = headerHeight;
        menu.classList.toggle('scroll-menu', isScrolled);
    }
}

window.addEventListener('scroll', updateHeader);
window.addEventListener('resize', updateHeader);
window.addEventListener('DOMContentLoaded', updateHeader);

openMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active-menu');
    const isActive = menu.classList.contains('active-menu');

    openMenuImg.style.display = isActive ? "none" : "block";
    closeMenuImg.style.display = isActive ? "block" : "none";
    openMenuBtn.style.backgroundColor = isActive ? "#1b2c5c" : "transparent";
});

        // PROJECTS

import {token, userName} from "./api_key.js";

let allRepos = [];
let displayedCount = 0;
const step = 2;

const seeMoreBtn = document.querySelector('.see-more-container');
const projectsContainer = document.querySelector('.projects-container');
const hideBtn = document.querySelector('.hide-container');

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}


function createBox(repo, imgURL){

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isFavourite = favourites.includes(repo.id.toString());
    const starFill = isFavourite ? '#e0c200' : '#0000000';

    const backgroundImage = imgURL ? imgURL : './main-page.png';
    const lastCommitDate = formatDate(repo.updated_at);
    const createdAt = formatDate(repo.created_at);

    const completedBadge = repo.topics.includes('completed') ? `<p class="completed">Completed</p>` : '<p class="in-progress">In progress</p>';
    let length = 0;
    
    console.log(length);

    return `
            <div class="project-card animate animate-up" data-id="${repo.id}">
                <div class="project-card-top" style="background-image: url('${backgroundImage}')">
                    <div class="favourite">
                        <svg width="25px" height="25px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e0c200" stroke-width="2.4"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#0000000" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m12 17.328-5.403 3.286a.75.75 0 0 1-1.12-.813l1.456-6.155-4.796-4.123a.75.75 0 0 1 .428-1.316l6.303-.517 2.44-5.835a.75.75 0 0 1 1.384 0l2.44 5.835 6.303.517a.75.75 0 0 1 .427 1.316l-4.795 4.123 1.456 6.155a.75.75 0 0 1-1.12.813L12 17.328z" fill="${starFill}"></path></g></svg>
                    </div>
                    ${completedBadge}
                </div>
                <div class="project-card-bottom">
                    <div class="project-card-bottom-top">
                        <div class="project-card-title-and-date">
                            <h3 class="project-card-title">${repo.name}</h3>
                            <p class="project-card-date last-commit-date">${createdAt}</p>
                        </div>
                        
                        <p class="project-card-description timeline-card-text">${repo.description || "No description"}</p>
                        <div class="project-tags timeline-card-tags">
                            ${(() => {
                                let html = '';
                                let currentLength = 0;
                                
                                let lengthLimit = window.screen.width > 700 ? 30 : 15;
                                
                                console.log(lengthLimit, window.screen.width);
                                
                                

                                for(let i = 0; i < repo.topics.length; i++){
                                    const topic = repo.topics[i];
                                    
                                    if(currentLength < lengthLimit) {
                                        html += `<span class="project-tag">${topic}</span>` ;
                                        currentLength += topic.length;
                                    }else{

                                        html += `<span class="project-tag">+${repo.topics.length - i}</span>`;
                                        break; 
                                    }
                                }
                                
                                return html;
                            })()}
                            
                        </div>
                    </div>
                    <div class="project-card-bottom-bottom">
                        <div class="project-card-links">
                            <a href="${repo.html_url}" class="project-card-link">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297 6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804 5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779 3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919 9.13724 4.14609 9.19053 4.18418V4.18418C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648 4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889 4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639 4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114 14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373 17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843 6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309 6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479 14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <p>Code</p>
                            </a>
                            <a href="${repo.homepage}" class="project-card-link demo-link">
                                <svg width="18px" height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.28"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg>
                                <p>Live Demo</p>
                            </a>
                        </div>
                        
                        <p class="last-commit-date">Last commit: <br>${lastCommitDate}</p>
                    </div>
                    
                </div>
            </div>
    `
        
}



        // FAVOURITE 


projectsContainer.addEventListener('click', (event) => {
    const starBtn = event.target.closest('.favourite');
    if (starBtn) {
        const card = starBtn.closest('.project-card');
        const repoId = card.dataset.id.toString();
        const svgPath = starBtn.querySelector('path');

        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];


        if(favourites.includes(repoId)) {
            favourites = favourites.filter(id => id !== repoId);
            svgPath.setAttribute('fill', `#0000000`);
        }else{
            favourites.push(repoId)
            svgPath.setAttribute('fill', `#e0c200`);
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
})



async function getRepos(){
    const URL = `https://api.github.com/users/hhxdz/repos?per_page=100&sort=created&direction=desc`;
    try{
        const response = await fetch(URL, {
            headers:{
                Authorization: `Bearier ${token}`
            }
        })
        if(!response.ok){
            throw new Error('Error', response.status)
        }

        const repos = await response.json();
 
        allRepos = repos.filter(repo => repo.description);

        await renderMoreRepos();
        
        console.log(repos);
        
        
    }catch(error){
        console.error("Error fetching repos", error)
    }
};

function hideRepos() {
    projectsContainer.innerHTML = "";
    displayedCount = 0;

    renderMoreRepos();
    
    hideBtn.style.display = 'none';
 
    if(allRepos.length > step){
        seeMoreBtn.style.display = 'block';
    }
    
}

async function renderMoreRepos(){
        const nextBatch = allRepos.slice(displayedCount, displayedCount + step);

       if(nextBatch.length === 0) return;

        let newCardsHTML = "";
        for(let repo of nextBatch){
            let imgURL = await fetchReadme(repo.owner.login, repo.name);
            newCardsHTML += createBox(repo, imgURL);
        }

        projectsContainer.insertAdjacentHTML('beforeend', newCardsHTML);

        const newElements = projectsContainer.querySelectorAll('.animate');
        newElements.forEach(newElement =>{
            animationObserver.observe(newElement)
        })

        displayedCount += nextBatch.length;

        if(displayedCount > step){
            hideBtn.style.display = 'block';
        }

        if(displayedCount >= allRepos.length) {
            seeMoreBtn.style.display = 'none';
        }


        
}

seeMoreBtn.addEventListener('click', renderMoreRepos);
hideBtn.addEventListener('click', hideRepos);

getRepos();
                
async function fetchReadme(owner, repo){
    const URL = `https://api.github.com/repos/${owner}/${repo}/readme`;
    try{
        const response = await fetch(URL, {
            headers:{
                Authorization: `Bearier ${token}`
            }
        })
        if(!response.ok) return null;

        const data = await response.json();
        if(!data.content) return null;
        const decode = atob(data.content);
        
        const mdImage = decode.match(/!\[.*?\]\((.*?)\)/);
        
        if(mdImage && mdImage[1]){
            const relativePath = mdImage[1].startsWith('./') ? mdImage[1].slice(2) : mdImage[1];
            return `https://raw.githubusercontent.com/${owner}/${repo}/main/${relativePath}`
        }
        return null
        
    } catch(error){
        console.error('Error fetching readme:', error);
        return null;
    }
}

    // SKILLS

const progresses = document.querySelectorAll('.progress');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const bar = entry.target;
            const value = bar.dataset.value;
            bar.style.width = value + '%';
            observer.unobserve(bar);
        }
    });
}, {
    threshold: 0.5
});

progresses.forEach(bar => {
    observer.observe(bar);
});


    // COPY TEXT

document.addEventListener("click", event => {
    const element = event.target.closest(".copy-text");
    if (!element) return;

    navigator.clipboard.writeText(element.textContent)
        .then(() => {
        element.classList.add("copied");

        setTimeout(() => {
            element.classList.remove("copied");
        }, 1000);
        });
});


    // ANIMATIONS
const animatedElements = document.querySelectorAll('.animate')

const animationObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        const intEl = entry.target

        if(entry.isIntersecting){

            if(intEl.classList.contains('animate-left')){
                intEl.classList.add('show-left');
            }else if(intEl.classList.contains('animate-right')){
                intEl.classList.add('show-right')
            }else if(intEl.classList.contains('animate-down')){
                intEl.classList.add('show-down')
            }else if(intEl.classList.contains('animate-up')){
                intEl.classList.add('show-up')
            }else if(intEl.classList.contains('point-container')){
                intEl.classList.add('show-up')
            }else if(intEl.classList.contains('main-animation')){
                intEl.classList.add('show-circle')
            }else if(intEl.classList.contains('projects-anim')){
                intEl.classList.add('project-button-anim')
            }
            
            intEl.classList.remove('animate');

            animationObserver.unobserve(intEl)
        }
    })
}, {
    threshold: 0.07});

animatedElements.forEach(animatedElement =>{
    animationObserver.observe(animatedElement)
});



    //MODALS//


const cards = document.querySelectorAll('.timeline-card');
const modals = document.querySelectorAll('.modal-roadmap-card-container');
const modalBackground = document.querySelector('.modal-background');
const closeModalBtns = document.querySelectorAll('.close-modal');
const body = document.querySelector('.body');


function closeAllModals(){
    modals.forEach(modal => {
        modal.classList.remove('active-modal');
        modalBackground.classList.remove('active-modal');
        body.classList.remove('no-scroll');
    });
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        const cardName = card.dataset.cardname;
        const modalMatch = [...modals].find(modal => 
            modal.dataset.modalname === cardName
        );
        
        if(modalMatch) {
            closeAllModals();
            modalMatch.classList.add('active-modal');
            modalBackground.classList.add('active-modal');
            body.classList.add('no-scroll');
        }
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllModals();
    });
});

modalBackground.addEventListener('click', () => {
    closeAllModals();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllModals();
});
    

        // PROJECT MODALS

const projectContainer = document.querySelector('.projects-container');

projectContainer.addEventListener('click', (event) => {
    const targetCard = event.target.closest('.project-card');
    if (!targetCard) return;

    event.stopPropagation();

    if (event.target.closest('.project-card-link') || event.target.closest('.favourite')) {
        return;
    }

    const repoId = parseInt(targetCard.dataset.id);
    const repoData = allRepos.find(r => r.id === repoId);

    const cardTop = targetCard.querySelector('.project-card-top');
    const style = window.getComputedStyle(cardTop);
    const backgroundImage = style.backgroundImage.slice(4, -1).replace(/"/g, "");

    if (repoData) {
        renderProjectModal(repoData, backgroundImage);
    }
});

function renderProjectModal(repo, backgroundImage) {

    const existing = document.getElementById('dynamic-project-modal');
    if (existing) existing.remove();
   
        const lastCommitDate = formatDate(repo.updated_at);
        const createdAt = formatDate(repo.created_at);

        const completedBadge = repo.topics.includes('completed') ? `<p class="completed">Completed</p>` : '<p class="in-progress">In progress</p>';

        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isFavourite = favourites.includes(repo.id.toString());
        const starFill = isFavourite ? '#e0c200' : 'transparent';

    const modalHTML = `
            <div class="modal-roadmap-card modal-roadmap-card-container" id="dynamic-project-modal">
                <div class="top-modal-container">
                    <div class="top-titles-modal">
                            <div class="modal-containers">
                                <div class="favourite modal-favourite">
                                    <svg width="25px" height="25px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e0c200" stroke-width="2.4"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="transparent" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m12 17.328-5.403 3.286a.75.75 0 0 1-1.12-.813l1.456-6.155-4.796-4.123a.75.75 0 0 1 .428-1.316l6.303-.517 2.44-5.835a.75.75 0 0 1 1.384 0l2.44 5.835 6.303.517a.75.75 0 0 1 .427 1.316l-4.795 4.123 1.456 6.155a.75.75 0 0 1-1.12.813L12 17.328z" fill="${starFill}"></path></g></svg>
                                </div>
                                <h2 class="modal-title">${repo.name}</h2>
                            </div>
                        <p class="modal-small-text">Created: ${createdAt}</p>
                    </div>
                    
                    <div class="modal-containers">
                        ${completedBadge}
                        <div class="close-modal blue-close-modal close-dynamic-modal">
                            <svg class="img-adpt" fill="#ffffff" width="22px" height="22px" viewBox="0 0 24.00 24.00" id="cross" xmlns="http://www.w3.org/2000/svg" class="icon multi-color" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary-stroke" d="M19,19,5,5M19,5,5,19" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"></path></g></svg>
                        <svg class="no-img-adpt" fill="#ffffff" width="25px" height="25px" viewBox="0 0 24.00 24.00" id="cross" xmlns="http://www.w3.org/2000/svg" class="icon multi-color" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary-stroke" d="M19,19,5,5M19,5,5,19" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width:2.4;"></path></g></svg>
                        </div>
                    </div>
                    
                </div>
                
                <div class="modal-content">
                    <div class="first-column">
                        <img src="${backgroundImage}" alt="" class="modal-img">
                        <div class="project-card-links no-project-card-links-adpt">
                            <a href="${repo.html_url}" class="project-card-link">
                                <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297 6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804 5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779 3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919 9.13724 4.14609 9.19053 4.18418V4.18418C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648 4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889 4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639 4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114 14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373 17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843 6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309 6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479 14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <p>Code</p>
                            </a>
                            <a href="${repo.homepage}" class="project-card-link demo-link">
                                <svg width="21px" height="21px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.28"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg>
                                <p>Live Demo</p>
                            </a>
                        </div>
                    </div>
                    
                    <div class="modal-info">
                        
                        <p class="project-card-description">
                            ${repo.description || "No description provided."}
                        </p>
                        <div class="modal-tags">
                            <h3 class="modal-small-title">Topics</h3>
                            <div class="project-tags timeline-card-tags">
                                ${repo.topics.map(t => `<span class="project-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-bottom">
                            <div class="characteristics">
                                <p class="modal-small-text">Public</p>
                                <p class="modal-small-text no-modal-commit-adpt">Last commit: ${lastCommitDate}</p>
                                <p class="modal-small-text modal-commit-adpt">Last commit: <br>${lastCommitDate}</p>
                                <p class="modal-small-text">Main language: ${repo.language || 'Mixed'}</p>
                                
                            </div>
                            <div class="project-card-links project-card-links-adpt">
                                <a href="${repo.html_url}" class="project-card-link">
                                    <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297 6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804 5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779 3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919 9.13724 4.14609 9.19053 4.18418V4.18418C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648 4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889 4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639 4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114 14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373 17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843 6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309 6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479 14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855" stroke="#ffffff" stroke-width="1.704" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <p>Code</p>
                                </a>
                                <a href="${repo.homepage}" class="project-card-link demo-link">
                                    <svg width="21px" height="21px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.28"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline points="8.25 2.75,2.75 2.75,2.75 13.25,13.25 13.25,13.25 7.75"></polyline> <path d="m13.25 2.75-5.5 5.5m3-6.5h3.5v3.5"></path> </g></svg>
                                    <p>Live Demo</p>
                                </a>
                            </div>
                        </div>
                    </div>
                
                </div>

            </div>

    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('dynamic-project-modal');

    setupModalFavourite(modal, repo.id.toString());

    setTimeout(() => {
        modal.classList.add('active-modal');
        modalBackground.classList.add('active-modal');
        body.classList.add('no-scroll');
    }, 10);

    const closeModal = (e) => {
        if (e) e.stopPropagation();
        modal.classList.remove('active-modal');
        modalBackground.classList.remove('active-modal');
        body.classList.remove('no-scroll');

        setTimeout(() => {
            modal.remove();
        }, 300);

        document.removeEventListener('keydown', handleEsc);

        modalBackground.removeEventListener('click', closeModal);
    };

    const handleEsc = (e) => { if (e.key === 'Escape') closeModal(); };


    modal.querySelector('.close-dynamic-modal').addEventListener('click', closeModal);
    
    modalBackground.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEsc);

    if(modalBackground.classList.contains('active-modal')){

    }
};

function setupModalFavourite(modalElement, repoId) {
    const starBtn = modalElement.querySelector('.modal-favourite');
    if (!starBtn) return;

    starBtn.addEventListener('click', (e) => {
        e.stopPropagation();
    
        let currentFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const svgPath = starBtn.querySelector('path');
        const isCurrentlyFav = currentFavourites.includes(repoId.toString());

        if (isCurrentlyFav) {
            currentFavourites = currentFavourites.filter(id => id !== repoId.toString());
            svgPath.setAttribute('fill', 'transparent');
        } else {
            currentFavourites.push(repoId.toString());
            svgPath.setAttribute('fill', '#e0c200');
        }

        localStorage.setItem('favourites', JSON.stringify(currentFavourites));

        const mainCard = document.querySelector(`.project-card[data-id="${repoId}"]`);
        if (mainCard) {
            const mainStarPath = mainCard.querySelector('.favourite path');
            if (mainStarPath) {
                mainStarPath.setAttribute('fill', isCurrentlyFav ? 'transparent' : '#e0c200');
            }
        }
    });
}
