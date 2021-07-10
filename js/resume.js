(function () {

  appender = (element, html) => element.append(html);


  const processAvatar = (data) => {
    const avatar = document.querySelector('.my-avatar-data');
    avatar.setAttribute('src', data.avatarUrl);
    avatar.setAttribute('alt', data.myNames);
  }

  const processBasicInfo = (data) => {
    document.querySelector('title').textContent = data.title;
    document.querySelector('.my-firstname-data').textContent = data.myNames.split(' ')[0];
    document.querySelector('.my-lastname-data').textContent = data.myNames.split(' ')[1];
    document.querySelector('.my-address-data').textContent = data.myAddress;
  }

  const processSocialMedia = (data) => {
    const social = document.querySelector('.social-icons');
    social.innerHTML = '';
    data.primaryLinks.forEach(e => {
      var html = `<a target='_blank' href='${e.url}'><i class='${e.icon}'></i></a>`;
      appender(social, html);
    });
  }

  const processIntroduction = (data) => {
    const introduction = document.querySelector('.my-introduction-data');
    introduction.setAttribute('style', 'list-style: none;');
    introduction.innerHTML = '';
    data.introduction.forEach(e => {
      const html = `<li>${e}</li>`;
      appender(introduction, html);
    });
  }

  const processExperiance = (data) => {
    const experiance = document.querySelector('.my-roles-data');
    experiance.innerHTML = '';
    data.roles.forEach(e => {
      const list = e.description.map(de => (`<li>${de}</li>`));
      const html = `
        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">${e.title}</h3>
            <div class="subheading mb-3">${e.company}</div>
              <ul style="list-style: none;" class="ml-0">${Array.from(list).join('')}</ul>
            </div>
            <div class="resume-date text-md-right">
              <span class="text-primary">${e.start} - ${e.end}</span>
            </div>
          </div>
        </div>`
        ;
      appender(experiance, html);
    });
  }

  const processEducation = (data) => {
    const education = document.querySelector('.my-education-data');
    education.innerHTML = '';
    data.education.forEach(e => {
      const list = e.majors.map(me => (`<li>${me}</li>`));
      const html = `
      <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
        <div class="resume-content">
          <h3 class="mb-0">${e.institute}</h3>
          <div class="subheading mb-3">${e.level}</div>
          <ul style="list-style: none;" class="ml-0">${Array.from(list).join('')}</ul>
        </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">${e.start} - ${e.end}</span>
        </div>
      </div>`;
      appender(education, html);
    });
  }

  const processSkills = (data) => {
    const skills = document.querySelector('.my-skills-data');
    skills.innerHTML = '';
    data.skills.forEach(e => {
      const html = `<li class="list-inline-item" title="${e.title}"><i class="${e.icon}"></i></li>`;
      appender(skills, html);
    });
  }

  const processWorkflow = (data) => {
    const workflow = document.querySelector('.my-workflow-data');
    workflow.innerHTML = '';
    data.workflows.forEach(e => {
      const html = `<li><i class="${e.icon}"></i>${e.title}</li>`;
      appender(workflow, html);
    });
  }

  const processInterests = (data) => {
    const interests = document.querySelector('.my-interests-data');
    interests.innerHTML = '';
    data.interests.forEach(e => {
      const html = `
      <div class="col-md-4">
        <div class="card m-1" style="width: 18rem;">
          <img class="card-img-top" src="${e.url}" alt="${e.title.toLowerCase()}">
          <div class="card-body">
            <h5 class="card-title">${e.title}</h5>
            <p class="card-text">${e.description}</p>
          </div>
        </div>
      </div>
      `;
      appender(interests, html);
    });
    interests.classList.add('row');
  }

  const processPets = (data) => {
    const future = document.querySelector('.my-project-data');
    future.innerHTML = '';
    data.projects.forEach(e => {
      const html = `
      <div class="col-lg-5 m-1">
        <div class="card m-1 github-widget" data-repo="${e.path}" title="${e.path}" style="width: 18rem;" >
          <div class="card-body">
            <h5 class="card-title">${e.path}</h5>
            <p hidden class="card-text">${e.description}</p>
          </div>
        </div>
      </div>
      `;
      appender(future, html);
    });
    future.classList.add('row');
  }

  const processFuture = (data) => {
    const future = document.querySelector('.my-future-plans-data');
    future.innerHTML = '';
    data.futurePlans.forEach(e => {
      const html = `
      <div class="col-md-4">
        <div class="card m-1" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${e.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted" title="Progress">${e.progress}%</h6>
            <p class="card-text">${e.description}</p>
          </div>
        </div>
      </div>
      `;
      appender(future, html);
    });
    future.classList.add('row');
  }

  const init = () => {
    fetch('../config/content.json')
      .then(response => response.json())
      .then(data => {
        processAvatar(data);
        processBasicInfo(data);
        processSocialMedia(data);
        processIntroduction(data);
        processExperiance(data);
        processEducation(data);
        processSkills(data);
        processWorkflow(data);
        processInterests(data);
        processPets(data);
        processFuture(data);
      });
  }
  // document.addEventListener('loadstart', init());
  init();
})(this); // End of use strict
