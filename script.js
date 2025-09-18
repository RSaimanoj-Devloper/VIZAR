
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            const mainContent = document.getElementById('main-content');
            const headerLoggedOut = document.getElementById('header-logged-out');
            const headerLoggedIn = document.getElementById('header-logged-in');
            const loginBtn = document.getElementById('login-btn');
            const settingsTabs = document.querySelectorAll('.settings-tab');
            const settingsTabContents = document.querySelectorAll('.settings-tab-content');

            const pageStates = {
                isLoggedIn: false,
                currentPage: 'home'
            };

            function navigateTo(pageId) {
                pages.forEach(page => page.classList.remove('active'));
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                    pageStates.currentPage = pageId;
                } else {
                    document.getElementById('home').classList.add('active');
                    pageStates.currentPage = 'home';
                }
                 window.scrollTo(0, 0);
            }
            
            function updateLoginState(isLoggedIn) {
                pageStates.isLoggedIn = isLoggedIn;
                if (isLoggedIn) {
                    headerLoggedOut.style.display = 'none';
                    headerLoggedIn.style.display = 'flex';
                    navigateTo('dashboard');
                } else {
                    headerLoggedOut.style.display = 'flex';
                    headerLoggedIn.style.display = 'none';
                    navigateTo('home');
                }
            }

            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    navigateTo(pageId);
                });
            });

            if (loginBtn) {
                loginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    updateLoginState(true);
                });
            }

            settingsTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');

                    settingsTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    settingsTabContents.forEach(content => {
                        if (content.id === `settings-${tabId}`) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });

            navigateTo(pageStates.currentPage);
        });
    </script>
