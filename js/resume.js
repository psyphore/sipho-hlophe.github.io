(function () {
  appender = (element, html) => element.append(html);

  collection = (element, item, title, subtitle, breakdown, start = 'start', end = 'end') => {
    const education_item = document.createElement('div');
      education_item.setAttribute('class', 'resume-item d-flex flex-column flex-md-row justify-content-between mb-5');
      
      const education_content = document.createElement('div');
      education_content.setAttribute('class', 'resume-content');

      const h3 = document.createElement('h3');
      h3.setAttribute('class', 'mb-0');
      h3.textContent = item[title];
      appender(education_content, h3);
      
      const subheading = document.createElement('div');
      subheading.setAttribute('class', 'subheading mb-3');
      subheading.textContent = item[subtitle];
      appender(education_content, subheading);

      const education_breakdown = document.createElement('ul');
      education_breakdown.setAttribute('style', 'list-style: none;');
      education_breakdown.setAttribute('class', 'ml-0');
      item[breakdown].map(de => {
        const item = document.createElement('li');
        item.textContent = de;
        education_breakdown.append(item);
      });
      appender(education_content, education_breakdown);

      const education_date = document.createElement('div');
      education_date.setAttribute('class', 'resume-date text-md-right');
      education_date.textContent = `${item[start]} - ${item[end]}`;
      appender(education_content, education_date);

      appender(education_item, education_content);
      appender(element, education_item);
  };

  cards_skill = (element, item, title, path) => {
    const card_item = document.createElement('div');
    card_item.setAttribute('class', 'skill-item p-2');
    
    const card_img = document.createElement('img');
    card_img.setAttribute('alt', item[title]);
    card_img.setAttribute('title', item[title]);
    card_img.setAttribute('src', item[path]);
    card_img.setAttribute('width', 256);
    card_img.setAttribute('height', 256);
    
    const card_link = document.createElement('a');
    card_link.setAttribute('data-shortname', item[title]);
    card_link.setAttribute('rel', 'noreferrer');
    card_link.setAttribute('href', '');

    appender(card_link, card_img);
    appender(card_item, card_link);
    appender(element, card_item);
  };

  cards_interests = (element, item, title, description, path) => {
    const card_item = document.createElement('div');
    card_item.setAttribute('class', 'col md-3');
    
    const card_content = document.createElement('div');
    card_content.setAttribute('class', 'card m-1');
    card_content.setAttribute('style', 'width: 18rem;');

    const card_img = document.createElement('img');
    card_img.setAttribute('alt', item[title]);
    card_img.setAttribute('class', 'card-img-top');
    card_img.setAttribute('title', item[title]);
    card_img.setAttribute('src', item[path]);
    
    const card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');
    
    const card_title = document.createElement('h5');
    card_title.setAttribute('class', 'card-title');
    card_title.textContent = item[title];
    
    const card_text = document.createElement('p');
    card_text.setAttribute('class', 'card-text');
    card_text.textContent = item[description];

    appender(card_body, card_title);
    appender(card_body, card_text);
    appender(card_content, card_img);
    appender(card_content, card_body);
    appender(card_item, card_content);

    appender(element, card_item);
  };

  cards_future = (element, item, title, description, progress) => {
    const card_item = document.createElement('div');
    card_item.setAttribute('class', 'col md-3');
    
    const card_content = document.createElement('div');
    card_content.setAttribute('class', 'card m-1');
    card_content.setAttribute('style', 'width: 18rem;');

    const card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');
    
    const card_title = document.createElement('h5');
    card_title.setAttribute('class', 'card-title');
    card_title.textContent = item[title];
    
    const card_subtitle = document.createElement('h6');
    card_subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
    card_subtitle.textContent = item[progress] + '%';

    const card_text = document.createElement('p');
    card_text.setAttribute('class', 'card-text');
    card_text.textContent = item[description];

    appender(card_body, card_title);
    appender(card_body, card_subtitle);
    appender(card_body, card_text);
    appender(card_content, card_body);
    appender(card_item, card_content);

    appender(element, card_item);
  };

  cards_pets = (element, item, description, path) => {
    const card_item = document.createElement('div');
    card_item.setAttribute('class', 'p-1');
    
    const card_content = document.createElement('div');
    card_content.setAttribute('class', 'card m-1 github-widget');
    card_content.setAttribute('style', 'width: 18rem;');
    card_content.setAttribute('data-repo', item[path]);
    card_content.setAttribute('title', item[path]);

    const card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');
    
    const card_title = document.createElement('h5');
    card_title.setAttribute('class', 'card-title');
    card_title.textContent = item[path];
    
    const card_text = document.createElement('p');
    card_text.setAttribute('class', 'card-text');
    card_text.textContent = item[description];

    appender(card_body, card_title);
    appender(card_body, card_text);
    appender(card_content, card_body);
    appender(card_item, card_content);

    appender(element, card_item);
  };

  const processAvatar = (data) => {
    const avatar = document.querySelector('.my-avatar-data');
    // avatar.setAttribute('src', data.avatarGitHub);
    avatar.setAttribute('src', data.avatarLinkedIn);
    avatar.setAttribute('alt', data.myNames);
  }

  const processBasicInfo = (data) => {
    document.querySelector('title').textContent = data.title;
    document.querySelector('.my-firstname-data').textContent = data.myNames.split(' ')[0];
    document.querySelector('.my-lastname-data').textContent = data.myNames.split(' ')[1];
    document.querySelector('.my-address-data').textContent = data.myAddress;
  }

  const processIntroduction = (data) => {
    const introduction = document.querySelector('.my-introduction-data');
    introduction.setAttribute('style', 'list-style: none;');
    introduction.textContent = '';
    data.introduction.forEach(e => {
      const html = document.createElement('li');
      html.textContent = e;
      appender(introduction, html);
    });
  }
  
  const processSocialMedia = (data) => {
    const social = document.querySelector('.social-icons');
    social.textContent = '';
    data.primaryLinks.forEach(e => {
      const html = document.createElement('a');
      html.setAttribute('target', '_blank');
      html.setAttribute('href', e.url);
      
      const i = document.createElement('i');
      i.setAttribute('class', e.icon);
      appender(html, i);
      
      appender(social, html);
    });
  }

  const processExperiance = (data) => {
    const experiance = document.querySelector('.my-roles-data');
    experiance.textContent = '';
    data.roles.forEach(e => collection(experiance, e, 'company', 'title', 'description'));
  }

  const processEducation = (data) => {
    const education = document.querySelector('.my-education-data');
    education.innerHTML = '';
    data.education.forEach(e => collection(education, e, 'institute', 'level', 'majors'));
  }

  const processSkills = (data) => {
    const skills = document.querySelector('.my-skills-data');
    skills.innerHTML = '';
    data.skills.forEach(e => cards_skill(skills, e, 'title', 'path'));
  }

  const processWorkflow = (data) => {
    const workflow = document.querySelector('.my-workflow-data');
    workflow.innerHTML = '';
    data.workflows.forEach(e => {

      const workflow_item = document.createElement('li');
      workflow_item.innerHTML = e.title;

      const workflow_icon = document.createElement('i');
      workflow_icon.setAttribute('class', e.icon);

      // appender(workflow_item, workflow_icon);

      appender(workflow, workflow_item);
    });
  }

  const processInterests = (data) => {
    const interests = document.querySelector('.my-interests-data');
    interests.innerHTML = '';
    data.interests.forEach(e => cards_interests(interests, e, 'title', 'description', 'url'));
    interests.classList.add('row');
  }

  const processPets = (data) => {
    const future = document.querySelector('.my-project-data');
    future.innerHTML = '';
    data.projects.forEach(e => cards_pets(future, e, 'title', 'url'));
    future.classList.add('row');
  }

  const processFuture = (data) => {
    const future = document.querySelector('.my-future-plans-data');
    future.innerHTML = '';
    data.futurePlans.forEach(e => cards_future(future, e, 'title', 'description', 'progress'));
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

  init();
})(this); // End of use strict
