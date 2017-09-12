var app = angular.module('compassionIntranet', []).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'https://api.rss2json.com/**',
        'https://api.ipify.org/**',
    ]);

});

require("../main/config.js");
require('../main/common.js');

// Services
require('../services/anniversary-service.js');
require('../services/app-service.js');
require('../services/bookmark-service.js');
require('../services/contact-service.js');
require('../services/department-news-service.js');
require('../services/document-service.js');
require('../services/employee-announcement-service.js');
require('../services/global-partner-service.js');
require('../services/graph-service.js');
require('../services/gratitudes-service.js');
require('../services/group-service.js');
require('../services/how-do-i-service.js');
require('../services/modal-service.js');
require('../services/navigation-service.js');
require('../services/new-hire-service.js');
require('../services/news-service.js');
require('../services/pager-service.js');
require('../services/photo-service.js');
require('../services/related-document-service.js');
require('../services/related-news-service.js');
require('../services/resource-links-service.js');
require('../services/rss-feed-service.js');
require('../services/storage-service.js');
require('../services/sp-service.js');
require('../services/taxonomy-service.js');
require('../services/user-profile-service.js');
require('../services/weather-service.js');
require('../services/yammer-api-service.js');


// System Components

require('../main/modal.js');
require('../main/ui-helper.js');

// Components
require('../components/anniversary.js');
require('../components/bookmark-page.js');
require('../components/contacts.js');
require('../components/department-news.js');
require('../components/employee-announcement.js');
require('../components/employee-life.js');
require('../components/employee-spotlight.js');
require('../components/find-people.js');
require('../components/global-links.js');
require('../components/global-partners.js');
require('../components/gratitudes.js');
require('../components/group-summary.js');
require('../components/how-do-i.js');
require('../components/image-loader.js');
require('../components/location-places.js');
require('../components/my-apps.js');
require('../components/my-bookmarks.js');
require('../components/my-department.js');
require('../components/my-documents.js');
require('../components/my-rss-feeds.js');
require('../components/my-sites.js');
require('../components/my-toolbar.js');
require('../components/navigation.js');
require('../components/new-hires.js');
require('../components/news-events-browser.js');
require('../components/news-page-likes.js');
require('../components/photo-share.js');
require('../components/people-places.js');
require('../components/quick-links.js');
require('../components/related-documents.js');
require('../components/related-news.js');
require('../components/resource-links.js');
require('../components/rss-feed-manager.js');
require('../components/rss-feeds.js');
require('../components/toolbar-manager.js');
require('../components/us-links.js');
require('../components/weather-control.js');


