$pnp.setup({
    defaultCachingStore: "local",
    defaultCachingTimeoutSeconds: 600,
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
                globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484',
                newsTypeTermId: 'b1e0d71d-4c58-4860-bacd-5189e63002be',
                eventTypeTermId: '90087864-74f2-425a-ad5d-2d288990a066',
                employeeLifeTermId: 'ab34a76b-0cf8-441f-af98-677c3dd2961a'
            },
            pictureUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=',
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com/sites/stage',
            newsWeb: 'https://compassion.sharepoint.com/sites/stage/news',
            searchWeb: 'https://compassion.sharepoint.com/sites/stage-search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            locationByIPUrl: 'https://ipinfo.io/json',
            locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
            workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
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
                missionPhotos: 'Mission Photos',
                gratitudes: 'Gratitudes',
                anniversary: 'Anniversary and Retirement',
                newHire: 'New Hires',
                resourceLinks: 'Resource Links',
                employeeAnnouncements: 'Employee Announcements',
                workResources: 'Work Resources',
            },
            groupSites: [
                "https://compassion.sharepoint.com/sites/stage-cfo",
                "https://compassion.sharepoint.com/sites/stage-gco",
                "https://compassion.sharepoint.com/sites/stage-glo",
                "https://compassion.sharepoint.com/sites/stage-gme",
                "https://compassion.sharepoint.com/sites/stage-gp",
                "https://compassion.sharepoint.com/sites/stage-hr",
                "https://compassion.sharepoint.com/sites/stage-innovation"
            ],
            contentTypeIds: {
                newsPage: '0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390064DEA0F50FC8C147B0B6EA0636C4A7D400391165E9D2147C40AB7727C9F70AF24301',
                event: '0x010200AA13DE23CACF40448F3C9C777ABC2106'
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
                globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484',
                newsTypeTermId: 'b1e0d71d-4c58-4860-bacd-5189e63002be',
                eventTypeTermId: '90087864-74f2-425a-ad5d-2d288990a066',
                employeeLifeTermId: 'ab34a76b-0cf8-441f-af98-677c3dd2961a'
            },
            useCaching: false,
            pictureUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=',
            rootWeb: 'https://compassion.sharepoint.com',
            searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            locationByIPUrl: 'https://ipinfo.io/json',
            locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
            workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
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
                missionPhotos: 'Mission Photos',
                gratitudes: 'Gratitudes',
                anniversary: 'Anniversary and Retirement',
                newHire: 'New Hires',
                resourceLinks: 'Resource Links',
                employeeAnnouncements: 'Employee Announcements',
                workResources: 'Work Resources',
            },
            groupSites: [
                "https://compassion.sharepoint.com/sites/cfo",
                "https://compassion.sharepoint.com/site/gco",
                "https://compassion.sharepoint.com/sites/glo",
                "https://compassion.sharepoint.com/sites/gme",
                "https://compassion.sharepoint.com/sites/gp",
                "https://compassion.sharepoint.com/sites/hr",
                "https://compassion.sharepoint.com/sites/innovation"
            ],
            contentTypeIds: {
                newsPage: '0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390064DEA0F50FC8C147B0B6EA0636C4A7D400391165E9D2147C40AB7727C9F70AF24301',
                event: '0x010200AA13DE23CACF40448F3C9C777ABC2106'
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
            globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484',
            newsTypeTermId: 'b1e0d71d-4c58-4860-bacd-5189e63002be',
            eventTypeTermId: '90087864-74f2-425a-ad5d-2d288990a066',
            employeeLifeTermId: 'ab34a76b-0cf8-441f-af98-677c3dd2961a'
        },
        useCaching: false,
        pictureUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=',
        rootWeb: 'https://teganwilson.sharepoint.com/sites/compassion',
        searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
        rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
        locationByIPUrl: 'https://ipinfo.io/json',
        locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
        workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
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
            missionPhotos: 'Mission Photos',
            gratitudes: 'Gratitudes',
            anniversary: 'Anniversary and Retirement',
            newHire: 'New Hires',
            resourceLinks: 'Resource Links',
            employeeAnnouncements: 'Employee Announcements',
            workResources: 'Work Resources',
        },
        groupSites: [
                "https://compassion.sharepoint.com/sites/stage-cfo",
                "https://compassion.sharepoint.com/site/stage-gco",
                "https://compassion.sharepoint.com/sites/stage-glo",
                "https://compassion.sharepoint.com/sites/stage-gme",
                "https://compassion.sharepoint.com/sites/stage-gp",
                "https://compassion.sharepoint.com/sites/stage-hr",
                "https://compassion.sharepoint.com/sites/stage-innovation"
        ],
        contentTypeIds: {
            newsPage: '0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390064DEA0F50FC8C147B0B6EA0636C4A7D400391165E9D2147C40AB7727C9F70AF24301',
            event: '0x010200AA13DE23CACF40448F3C9C777ABC2106'
        }
    });
}