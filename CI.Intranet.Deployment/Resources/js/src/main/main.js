var app = angular.module('compassionIntranet', []).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'https://api.rss2json.com/**'
    ]);
});

require("../main/config.js");
require('../main/common.js');

// Services
require('../services/storage-service.js');
require('../services/modal-service.js');
require('../services/rss-feed-service.js');
require('../services/app-service.js');
require('../services/bookmark-service.js');
require('../services/document-service.js');
require('../services/group-service.js');
require('../services/related-news-service.js');
require('../services/employee-announcement-service.js');
require('../services/navigation-service.js');

// System Components

require('../main/modal.js');
require('../main/ui-helper.js');

// Components
require('../components/my-rss-feeds.js');
require('../components/my-toolbar.js');
require('../components/my-bookmarks.js');
require('../components/my-apps.js');
require('../components/my-documents.js');
require('../components/rss-feeds.js');
require('../components/toolbar-manager.js');
require('../components/rss-feed-manager.js');
require('../components/group-summary.js');
require('../components/related-documents.js');
require('../components/related-news.js');
require('../components/employee-announcement.js');
require('../components/navigation.js');

