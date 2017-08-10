
// set up static configuration entries
var myApp = angular.module('compassionIntranet');

//Discover Dev
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
            appId: '1d622432-aff2-4037-862d-53c714949c02'
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