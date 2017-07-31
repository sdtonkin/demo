var app = angular.module('compassionIntranet', []).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'https://api.rss2json.com/**'
    ]);
});

require("../main/config.js");

// Services
require('../services/storage-service.js');
require('../services/modal-service.js');
require('../services/rss-feed-service.js');
require('../services/apps-service.js');
require('../services/bookmark-service.js');

// System Components
require('../main/common.js');
require('../main/modal.js');
require('../main/ui-helper.js');

// Components
require('../components/my-rss-feeds.js');
require('../components/my-toolbar.js');
require('../components/my-bookmarks.js');
require('../components/my-apps.js');
require('../components/toolbar-manager.js');

