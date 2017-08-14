
// set up static configuration entries
var myApp = angular.module('compassionIntranet');
/*
myApp.config(['$httpProvider', 'adalAuthenticationServiceProvider', '$locationProvider',
  function ($httpProvider, adalProvider, $locationProvider) {
      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      }).hashPrefix('!');
      var clientId = 'd2ad5f24-6655-40eb-a87c-c8c32eab30f4',
        tenantId = 'fec6abeb-e9b4-470f-88d4-8e7c2e175a90';

      adalProvider.init(
          {
              tenant: tenantId,
              clientId: clientId,
              endpoints: {
                  'https://graph.microsoft.com': 'https://graph.microsoft.com'
              },
              extraQueryParameter: 'nux=1',
              instance: 'https://login.microsoftonline.com/',
              cacheLocation: "localStorage",
              //endpoints you want ADAL to ignore, they are inclusive paths, also you must use relative paths, if you include http/https it will look for a resource and automatically append the token of the loginResource
              anonymousEndpoints: ['/sites/Compassion/_api/',, '/sites/stage/_api/']
          },
          $httpProvider
      );
  }]);
  */

if (document.location.host === "compassion.sharepoint.com") {
    if (document.location.pathname.toLowerCase().indexOf('/sites/stage') !== -1) {
        myApp.constant('COM_CONFIG', {
            isProduction: true,
            msGraph: {
                appId: '28057a7d-919d-49ba-a042-58c962b6ba40'
            },
            yammer: {
                appId: '',
                network: 'compassion.com',
                defaultGroupId: ''
            },
            termSets: {
                locationTermId: "af2b87f4-feae-42c3-a08d-70f9efae0f71",
                eventCategoryTermId: "6f4ea56b-a45a-499d-9141-b75ed00e14c0",
                newsCategoryTermId: "67235e27-f37f-4da6-a8e9-e23d6cabfb8f"
            },
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com/sites/stage',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            lists: {
                rssFeedsListTitle: 'RSS Feeds',
                userRssFeedsListTitle: 'User RSS Feeds',
                userApps: 'User Tools',
                toolbarApps: 'Toolbar Tools',
                userBookmarks: 'User Bookmarks',
                groupInfo: 'Group Info',
                groupLeadership: 'Contacts',
                navigation: 'Navigation'
            }
        });
    }
    else {
        myApp.constant('COM_CONFIG', {
            isProduction: true,
            msGraph: {
                appId: '28057a7d-919d-49ba-a042-58c962b6ba40'
            },
            yammer: {
                appId: '',
                network: 'compassion.com',
                defaultGroupId: ''
            },            
            termSets: {
                locationTermId: "af2b87f4-feae-42c3-a08d-70f9efae0f71",
                eventCategoryTermId: "6f4ea56b-a45a-499d-9141-b75ed00e14c0",
                newsCategoryTermId: "67235e27-f37f-4da6-a8e9-e23d6cabfb8f"
            },
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            lists: {
                rssFeedsListTitle: 'RSS Feeds',
                userRssFeedsListTitle: 'User RSS Feeds',
                userApps: 'User Tools',
                toolbarApps: 'Toolbar Tools',
                userBookmarks: 'User Bookmarks',
                groupInfo: 'Group Info',
                groupLeadership: 'Contacts',
                navigation: 'Navigation'
            }
        });
    }
}
    //Dev Tenant
else {
    myApp.constant('COM_CONFIG', {
        isProduction: false,
        msGraph: {
            appId: 'bc64af36-7263-4bab-8828-c25a37185bb3',
            redirectUri: 'https://teganwilson.sharepoint.com/sites/compassion',
            interactionMode: 'popUp',
            graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
            graphScopes: ['user.read.all']
        },
        yammer: {
            appId: '',
            network: 'compassion.com',
            defaultGroupId: ''
        },
        termSets: {
            locationTermId: "af2b87f4-feae-42c3-a08d-70f9efae0f71",
            eventCategoryTermId: "6f4ea56b-a45a-499d-9141-b75ed00e14c0",
            newsCategoryTermId: "67235e27-f37f-4da6-a8e9-e23d6cabfb8f"
        },
        useCaching: false,
        rootWeb: 'https://teganwilson.sharepoint.com/sites/compassion',
        rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
        lists: {
            rssFeedsListTitle: 'RSS Feeds',
            userRssFeedsListTitle: 'User RSS Feeds',
            userApps: 'User Tools',
            toolbarApps: 'Toolbar Tools',
            userBookmarks: 'User Bookmarks',
            groupInfo: 'Group Info',
            groupLeadership: 'Contacts',
            navigation: 'Navigation'
        }
    });
}