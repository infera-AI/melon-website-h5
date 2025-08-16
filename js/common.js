// 统一的JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 加载Header和Footer
    loadHeader();
    loadFooter();
    
    // 初始化语言
    initLanguage();
    
    // 初始化通知功能
    initNotifications();
    
    // 初始化产品下拉菜单
    initProductDropdown();
});

// 加载Header
function loadHeader() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = html;
            }
        })
        .catch(error => {
            console.log('Header加载失败，使用内联版本');
        });
}

// 加载Footer
function loadFooter() {
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = html;
            }
        })
        .catch(error => {
            console.log('Footer加载失败，使用内联版本');
        });
}

// 语言切换功能
let currentLang = 'zh';

const languageData = {
    zh: {
        // 导航栏
        'nav-products': '产品',
        'nav-blog': '博客',
        'nav-partner': '成为合作伙伴',
        'nav-login': '登录',
        'nav-register': '注册',
        
        // 通知
        'notification-title': '消息通知',
        'mark-all-read': '全部标记为已读',
        'notification-music-title': '新音乐生成完成',
        'notification-music-message': '您的AI音乐"夏日微风"已生成完成，可以下载使用了。',
        'notification-achievement-title': '获得新成就',
        'notification-achievement-message': '恭喜！您已获得"音乐创作者"徽章。',
        'notification-offer-title': '限时优惠',
        'notification-offer-message': 'Melon Pro会员限时8折优惠，仅限今日！',
        'notification-update-title': '系统更新',
        'notification-update-message': 'Melon已更新到最新版本，新增多种音乐风格。',
        'notification-time-2min': '2分钟前',
        'notification-time-1hour': '1小时前',
        'notification-time-3hour': '3小时前',
        'notification-time-1day': '1天前',
        'view-all-notifications': '查看所有消息',
        
        // 页脚
        'footer-address': 'Melon Inc<br>北京市朝阳区科技园区<br>中国 100000',
        'footer-products': '产品',
        'footer-company': '公司',
        'footer-blog': '博客',
        'footer-about': '关于我们',
        'footer-faq': '常见问题',
        'footer-contact': '联系我们',
        'footer-privacy': '隐私政策',
        'footer-terms': '使用条款',
        'footer-dmca': 'DMCA政策'
    },
    en: {
        // Navigation
        'nav-products': 'Products',
        'nav-blog': 'Blog',
        'nav-partner': 'Become Partner',
        'nav-login': 'Login',
        'nav-register': 'Register',
        
        // Notifications
        'notification-title': 'Notifications',
        'mark-all-read': 'Mark All as Read',
        'notification-music-title': 'New Music Generated',
        'notification-music-message': 'Your AI music "Summer Breeze" is ready for download.',
        'notification-achievement-title': 'New Achievement',
        'notification-achievement-message': 'Congratulations! You earned the "Music Creator" badge.',
        'notification-offer-title': 'Limited Time Offer',
        'notification-offer-message': 'Melon Pro membership 20% off, today only!',
        'notification-update-title': 'System Update',
        'notification-update-message': 'Melon has been updated with new music styles.',
        'notification-time-2min': '2 minutes ago',
        'notification-time-1hour': '1 hour ago',
        'notification-time-3hour': '3 hours ago',
        'notification-time-1day': '1 day ago',
        'view-all-notifications': 'View All Messages',
        
        // Footer
        'footer-address': 'Melon Inc<br>Beijing Chaoyang Tech Park<br>China 100000',
        'footer-products': 'Products',
        'footer-company': 'Company',
        'footer-blog': 'Blog',
        'footer-about': 'About Us',
        'footer-faq': 'FAQ',
        'footer-contact': 'Contact',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Use',
        'footer-dmca': 'DMCA Policy'
    }
};

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language') || 'zh';
    currentLang = savedLang;
    
    setTimeout(() => {
        updateLanguageDisplay();
        updatePageContent(savedLang);
    }, 100);
}

// 更新语言显示
function updateLanguageDisplay() {
    const currentLanguageElement = document.getElementById('currentLanguage');
    if (currentLanguageElement) {
        currentLanguageElement.textContent = currentLang === 'zh' ? '中文' : 'English';
    }
    
    // 更新选中状态
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
    });
    const checkElement = document.getElementById(currentLang + '-check');
    if (checkElement) {
        checkElement.parentElement.classList.add('active');
    }
}

// 切换语言下拉菜单
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const selector = document.querySelector('.language-selector');
    
    if (dropdown && selector) {
        dropdown.classList.toggle('show');
        selector.classList.toggle('active');
    }
}

// 切换语言
function changeLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    updateLanguageDisplay();
    updatePageContent(lang);
    
    // 关闭下拉菜单
    const dropdown = document.getElementById('languageDropdown');
    const selector = document.querySelector('.language-selector');
    if (dropdown && selector) {
        dropdown.classList.remove('show');
        selector.classList.remove('active');
    }
    
    // 保存语言偏好
    localStorage.setItem('preferred-language', lang);
}

// 更新页面内容
function updatePageContent(lang) {
    const data = languageData[lang];
    
    // 更新所有带有data-lang属性的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (data[key]) {
            element.textContent = data[key];
        }
    });
    
    // 更新HTML内容
    document.querySelectorAll('[data-lang-html]').forEach(element => {
        const key = element.getAttribute('data-lang-html');
        if (data[key]) {
            element.innerHTML = data[key];
        }
    });
}

// 初始化通知功能
function initNotifications() {
    // 标记单个消息为已读
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-action')) {
            e.stopPropagation();
            const notificationItem = e.target.closest('.notification-item');
            if (notificationItem) {
                notificationItem.classList.remove('unread');
                updateNotificationBadge();
            }
        }
    });

    // 标记所有消息为已读
    document.addEventListener('click', function(e) {
        if (e.target.closest('.mark-all-read')) {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            updateNotificationBadge();
        }
    });

    // 点击消息项
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-item')) {
            const notificationItem = e.target.closest('.notification-item');
            notificationItem.classList.remove('unread');
            updateNotificationBadge();
            
            const title = notificationItem.querySelector('.notification-title');
            if (title) {
                console.log('点击了消息:', title.textContent);
            }
        }
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(event) {
        const selector = document.querySelector('.language-selector');
        const dropdown = document.getElementById('languageDropdown');
        
        if (selector && dropdown && !selector.contains(event.target)) {
            dropdown.classList.remove('show');
            selector.classList.remove('active');
        }
    });
}

// 更新通知徽章
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        if (unreadCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
            badge.textContent = unreadCount;
        }
    }
}

// 初始化产品下拉菜单
function initProductDropdown() {
    // 产品下拉菜单的hover效果已经在CSS中处理
}

// 模拟新消息到达
function addNewNotification(title, message, type = 'info') {
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;
    
    const newItem = document.createElement('div');
    newItem.className = 'notification-item unread';
    
    const iconMap = {
        'music': 'fas fa-music',
        'star': 'fas fa-star',
        'gift': 'fas fa-gift',
        'info': 'fas fa-info-circle'
    };
    
    newItem.innerHTML = `
        <div class="notification-icon">
            <i class="${iconMap[type]}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            <div class="notification-time">刚刚</div>
        </div>
        <div class="notification-action">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    notificationList.insertBefore(newItem, notificationList.firstChild);
    updateNotificationBadge();
}

// 示例：5秒后添加一条新消息
setTimeout(() => {
    addNewNotification('欢迎使用Melon', '感谢您选择Melon AI音乐生成器！', 'info');
}, 5000);