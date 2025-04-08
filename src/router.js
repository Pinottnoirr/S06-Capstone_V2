const router = {
    init() {
      this.handleRoute();
  
      // Handle internal nav clicks
      document.querySelectorAll('.nav-link, .location-button').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const path = link.classList.contains('location-button')
            ? link.textContent.toLowerCase().replace(/\s+/g, '-').replace(/@/g, '-at-')
            : link.getAttribute('href');
  
          history.pushState(null, '', path);
          this.handleRoute();
        });
      });
  
      // Handle browser navigation
      window.addEventListener('popstate', () => this.handleRoute());
    },
  
    async handleRoute() {
      const path = window.location.pathname;
      const cleanPath = path.replace(/^\//, '');
      const routerView = document.getElementById('router-view');
      let content;
  
      try {
        switch (cleanPath) {
          case '':
            routerView.innerHTML = '';
            this.showHomeElements();
            break;
  
          case 'about':
            content = await this.loadPage('/pages/about/index.html');
            routerView.innerHTML = content;
            this.hideHomeElements();
            break;
  
          case 'story':
            content = await this.loadPage('/pages/story/index.html');
            routerView.innerHTML = content;
            this.hideHomeElements();
            await this.injectScript('/scripts/story-carousel.js', 'initStoryCarousel');
            break;
  
          case 'rooftop-farm':
            content = await this.loadPage('/pages/rooftop-farm/index.html');
            routerView.innerHTML = content;
            this.hideHomeElements();
            await this.injectScript('/scripts/rooftop-carousel.js', 'initRooftopCarousel');
            break;
  
          case 'indoor-farm':
            content = await this.loadPage('/pages/indoor-farm/index.html');
            routerView.innerHTML = content;
            this.hideHomeElements();
            await this.injectScript('/scripts/indoor-carousel.js', 'initIndoorFarm');
            break;
  
          case 'sutd-system':
            content = await this.loadPage('/pages/sutd-system/index.html');
            routerView.innerHTML = content;
            this.hideHomeElements();
            break;
  
          default:
            routerView.innerHTML = '<h1>404 - Page Not Found</h1>';
            this.hideHomeElements();
        }
  
        this.updateActiveLink(cleanPath || 'home');
  
      } catch (error) {
        console.error('Routing error:', error);
        routerView.innerHTML = '<h1>Error loading page</h1>';
      }
    },
  
    async loadPage(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.text();
    },
  
    async injectScript(scriptPath, initFunctionName) {
      return new Promise((resolve) => {
        if (window[initFunctionName]) {
          window[initFunctionName](); // If already loaded
          resolve();
          return;
        }
  
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = () => {
          if (typeof window[initFunctionName] === 'function') {
            window[initFunctionName]();
          }
          resolve();
        };
        script.onerror = () => {
          console.error(`Failed to load ${scriptPath}`);
          resolve();
        };
        document.body.appendChild(script);
      });
    },
  
    updateActiveLink(currentPath) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });
    },
  
    hideHomeElements() {
      document.querySelector('.info-panel')?.style.setProperty('display', 'none');
      document.querySelector('#threejs-container')?.style.setProperty('display', 'none');
    },
  
    showHomeElements() {
      document.querySelector('.info-panel')?.style.setProperty('display', 'block');
      document.querySelector('#threejs-container')?.style.setProperty('display', 'block');
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    router.init();
  });
  