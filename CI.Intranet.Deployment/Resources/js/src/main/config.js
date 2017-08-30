$pnp.setup({
    defaultCachingStore: "local",
    defaultCachingTimeoutSeconds: 300,
    globalCacheDisable: false
});
// set up static configuration entries
var myApp = angular.module('compassionIntranet');
if (document.location.host === "compassion.sharepoint.com") {
    if (document.location.pathname.toLowerCase().indexOf('/sites/stage') !== -1) {
        myApp.constant('COM_CONFIG', {
            isProduction: false,
            msGraph: {
                appId: '287d9b56-5352-4f58-a8f5-1de40966c6c9',
                redirectUri: 'https://compassion.sharepoint.com/sites/stage',
                interactionMode: 'popUp',
                graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
                graphScopes: ['user.read.all']
            },
            yammer: {
                appId: '',
                network: 'compassion.com',
                defaultGroupId: '12687321'
            },
            termSets: {
                locationTermId: '88ed9770-2805-4c59-be2e-d8775b5aedb5',
                globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484'
            },
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com/sites/stage',
            searchWeb: 'https://compassion.sharepoint.com/sites/stage-search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            lists: {
                rssFeedsListTitle: 'RSS Feeds',
                userRssFeedsListTitle: 'User RSS Feeds',
                userApps: 'User Tools',
                toolbarApps: 'Toolbar Tools',
                userBookmarks: 'User Bookmarks',
                groupInfo: 'Group Info',
                groupLeadership: 'Contacts',
                navigation: 'Navigation',
                userInfo: 'User Information List',
                globalPartners: 'Global Partners',
                missionPhotos: 'missionPhotos',
                gratitudes: 'Gratitudes',
                anniversary: 'Anniversary and Retirement',
                newHire: 'New Hires',
                resourceLinks: 'Resource Links'
            }
        });
    }
    else {
        myApp.constant('COM_CONFIG', {
            isProduction: true,
            msGraph: {
                appId: '287d9b56-5352-4f58-a8f5-1de40966c6c9 ',
                redirectUri: 'https://teganwilson.sharepoint.com/',
                interactionMode: 'popUp',
                graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
                graphScopes: ['user.read.all']
            },
            yammer: {
                appId: '',
                network: 'compassion.com',
                defaultGroupId: '12687321'
            },            
            termSets: {
                locationTermId: '88ed9770-2805-4c59-be2e-d8775b5aedb5',
                globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484'
            },
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com',
            searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            lists: {
                rssFeedsListTitle: 'RSS Feeds',
                userRssFeedsListTitle: 'User RSS Feeds',
                userApps: 'User Tools',
                toolbarApps: 'Toolbar Tools',
                userBookmarks: 'User Bookmarks',
                groupInfo: 'Group Info',
                groupLeadership: 'Contacts',
                navigation: 'Navigation',
                userInfo: 'User Information List',
                globalPartners: 'Global Partners',
                missionPhotos: 'missionPhotos',
                gratitudes: 'Gratitudes',
                anniversary: 'Anniversary and Retirement',
                newHire: 'New Hires',
                resourceLinks: 'Resource Links'
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
            defaultGroupId: '12687321'
        },
        termSets: {
            locationTermId: '88ed9770-2805-4c59-be2e-d8775b5aedb5',
            globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484'
        },
        useCaching: false,
        rootWeb: 'https://teganwilson.sharepoint.com/sites/compassion',
        searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
        rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
        lists: {
            rssFeedsListTitle: 'RSS Feeds',
            userRssFeedsListTitle: 'User RSS Feeds',
            userApps: 'User Tools',
            toolbarApps: 'Toolbar Tools',
            userBookmarks: 'User Bookmarks',
            groupInfo: 'Group Info',
            groupLeadership: 'Contacts',
            navigation: 'Navigation',
            userInfo: 'User Information List',
            globalPartners: 'Global Partners',
            missionPhotos: 'missionPhotos',
            gratitudes: 'Gratitudes',
            anniversary: 'Anniversary and Retirement',
            newHire: 'New Hires',
            resourceLinks: 'Resource Links'
        }
    });
}