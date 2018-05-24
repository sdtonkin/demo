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
            isProduction: true,
            msGraph: {
                appId: '287d9b56-5352-4f58-a8f5-1de40966c6c9',
                redirectUri: 'https://compassion.sharepoint.com/sites/stage',
                interactionMode: 'popUp',
                graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
                graphScopes: ['user.read.all']
            },
            yammer: {
                appId: '',
                network: 'us.ci.org',
                defaultGroupId: '12856760'
            },
            termSets: {
                locationTermId: '88ed9770-2805-4c59-be2e-d8775b5aedb5',
                globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484',
                newsTypeTermId: 'b1e0d71d-4c58-4860-bacd-5189e63002be',
                eventTypeTermId: '90087864-74f2-425a-ad5d-2d288990a066',
                employeeLifeTermId: 'ab34a76b-0cf8-441f-af98-677c3dd2961a',
                usEmployeeLifeTermId: '4ede5c1c-acfd-406e-88bd-0d279bc4535c',
                globalEmployeeLifeTermId: '0a678df8-43b8-452c-8d13-f4f058828569',
                
            },
            terms: {
                anniversaryTermId: '43516337-9f0c-4756-9f0e-702229d5041f',
                retirementTermId: 'a4e24f75-5797-4048-affe-da0c6d4e148a'
            },
            pictureUrl: '/_layouts/15/userphoto.aspx?size=L&accountname=',
            useCaching: false,
            rootWeb: 'https://compassion.sharepoint.com/sites/stage',
            newsWeb: 'https://compassion.sharepoint.com/sites/stage/news',
            searchWeb: 'https://compassion.sharepoint.com/sites/stage-search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            locationByIPUrl: 'https://ipinfo.io/json',
            locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
            workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
            delveProfileUrl: 'https://compassion-my.sharepoint.com/_layouts/15/me.aspx?v=profile&p=',
            delveSearchUrlPrefix: 'https://nam.delve.office.com/?q=',
            delveSearchUrlSuffix: '&searchpage=1&searchview=people&v=search',
            missionPhotoUpload: '/_layouts/15/Upload.aspx?List=%7B7CC88BAC-9CC9-4457-A59C-51FF5A21838D%7D&RootFolder=%2Fsites%2Fstage%2FmissionPhotos&ContentTypeId=0x0101009148F5A04DDD49CBA7127AADA5FB792B00AADE34325A8B49CDA8BB4DB53328F21401006059AB8EDD2AB649BE422D937A86AE6B',
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
                contacts: 'Contacts'
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
            storage: [
                { service: 'appService', key: 'CI_USER_APP_KEY', expire: 24, clearCommand: 'clearMyApps' },
                { service: 'bookmarkService', key: 'CI_MY_BOOKMARKS_KEY', expire: 24, clearCommand: 'clearMyBookmarks' },
                { service: 'employeeAnnouncementService', key: 'CI_EMPLOYEE_ANNOUNCEMENT_KEY', expire: 8, clearCommand: 'clearEmployeeAnnouncements' },
                { service: 'globalPartnerService', key: 'CI_GLOBAL_PARTNER_KEY', expire: 0, clearCommand: 'clearGlobalPartners' },
                { service: 'gratitudesService', key: 'CI_GRATITUDE_KEY', expire: 4, clearCommand: 'clearGratitudes' },
                { service: 'groupService', key: 'CI_GROUPS_KEY', expire: 24, clearCommand: 'clearGroups' },
                { service: 'navigationService', key: 'CI_NAVIGATION_KEY', expire: 0, clearCommand: 'clearNavNodes' },
                { service: 'photoService', key: 'CI_INTRANET_PHOTOS', expire: 24, clearCommand: 'clearPhotos' },
                { service: 'weatherService', key: 'CI_LOCATION_KEY', expire: 4, clearCommand: 'clearLocation' },
                { service: 'weatherService', key: 'CI_WEATHER_KEY', expire: 2, clearCommand: 'clearWeather' }
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
                network: 'us.ci.org',
                defaultGroupId: '12856760'
            },            
            termSets: {
                locationTermId: '88af2a94-722d-4ad6-b76c-fe48da0ff12b',
                globalPartnersTermId: '98d929e9-f2f1-4362-918d-5dc6057db698',
                newsTypeTermId: '1cdb9059-cf5a-4eb8-8f05-8f1adc569a58',
                eventTypeTermId: '26b7c488-a617-49b4-b0b4-5a0d55856272',
                employeeLifeTermId: '5d20985a-9659-4e17-9fa9-35e4a962f24d',
                globalEmployeeLifeTermId: '508f854b-7244-44cd-8119-7abb2131bb10',
            },
            terms: {
                anniversaryTermId: '43516337-9f0c-4756-9f0e-702229d5041f',
                retirementTermId: 'a4e24f75-5797-4048-affe-da0c6d4e148a'
            },
            useCaching: false,
            pictureUrl: '/_layouts/15/userphoto.aspx?size=L&accountname=',
            rootWeb: 'https://compassion.sharepoint.com',
            newsWeb: 'https://compassion.sharepoint.com/news',
            searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
            rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
            locationByIPUrl: 'https://ipinfo.io/json',
            locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
            workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
            delveProfileUrl: 'https://compassion-my.sharepoint.com/_layouts/15/me.aspx?v=profile&p=',
            delveSearchUrlPrefix: 'https://nam.delve.office.com/?q=',
            delveSearchUrlSuffix: '&searchpage=1&searchview=people&v=search',
            missionPhotoUpload: '/_layouts/15/Upload.aspx?List=%7B729a43a8-8f26-43bb-8d73-efa69869c460%7D&RootFolder=%2FLists%2FmissionPhotos&ContentTypeId=0x0101009148F5A04DDD49CBA7127AADA5FB792B00AADE34325A8B49CDA8BB4DB53328F21401003A0E2280F0C17E429BC83C21EA24D44F',
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
                contacts: 'Contacts'
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
            storage: [
                { service: 'appService', key: 'CI_USER_APP_KEY', expire: 24, clearCommand: 'clearMyApps' },
                { service: 'bookmarkService', key: 'CI_MY_BOOKMARKS_KEY', expire: 24, clearCommand: 'clearMyBookmarks' },
                { service: 'employeeAnnouncementService', key: 'CI_EMPLOYEE_ANNOUNCEMENT_KEY', expire: 8, clearCommand: 'clearEmployeeAnnouncements' },
                { service: 'globalPartnerService', key: 'CI_GLOBAL_PARTNER_KEY', expire: 0, clearCommand: 'clearGlobalPartners' },
                { service: 'gratitudesService', key: 'CI_GRATITUDE_KEY', expire: 4, clearCommand: 'clearGratitudes' },
                { service: 'groupService', key: 'CI_GROUPS_KEY', expire: 24, clearCommand: 'clearGroups' },
                { service: 'navigationService', key: 'CI_NAVIGATION_KEY', expire: 0, clearCommand: 'clearNavNodes' },
                { service: 'photoService', key: 'CI_INTRANET_PHOTOS', expire: 24, clearCommand: 'clearPhotos' },
                { service: 'weatherService', key: 'CI_LOCATION_KEY', expire: 4, clearCommand: 'clearLocation' },
                { service: 'weatherService', key: 'CI_WEATHER_KEY', expire: 2, clearCommand: 'clearWeather' }
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
        isProduction: true,
        msGraph: {
            appId: 'bc64af36-7263-4bab-8828-c25a37185bb3',
            redirectUri: 'https://teganwilson.sharepoint.com/sites/compassion',
            interactionMode: 'popUp',
            graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
            graphScopes: ['user.read.all']
        },
        yammer: {
            appId: '',
            network: 'us.ci.org',
            defaultGroupId: '12856760'
        },
        termSets: {
            locationTermId: '88ed9770-2805-4c59-be2e-d8775b5aedb5',
            globalPartnersTermId: '22689db7-16ba-423e-89fc-ebeab7b74484',
            newsTypeTermId: 'b1e0d71d-4c58-4860-bacd-5189e63002be',
            eventTypeTermId: '90087864-74f2-425a-ad5d-2d288990a066',
            employeeLifeTermId: 'ab34a76b-0cf8-441f-af98-677c3dd2961a',
            anniversaryTermId: '43516337-9f0c-4756-9f0e-702229d5041f',
            retirementTermId: 'a4e24f75-5797-4048-affe-da0c6d4e148a'
        },
        terms: {
            anniversaryTermId: '43516337-9f0c-4756-9f0e-702229d5041f',
            retirementTermId: 'a4e24f75-5797-4048-affe-da0c6d4e148a'
        },
        useCaching: false,
        pictureUrl: '/_layouts/15/userphoto.aspx?size=L&accountname=',
        rootWeb: 'https://teganwilson.sharepoint.com/sites/compassion',
        newsWeb: 'https://teganwilson.sharepoint.com/sites/compassion/news',
        searchWeb: 'https://compassion.sharepoint.com/sites/search/pages/results.aspx',
        rssProxyUrl: "https://api.rss2json.com/v1/api.json?rss_url=",
        locationByIPUrl: 'https://ipinfo.io/json',
        locationByLatLongUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
        workResourceSearchUrl: 'https://compassion.sharepoint.com/sites/stage/Pages/Work-Resource-Search.aspx',
        delveProfileUrl: 'https://compassion-my.sharepoint.com/_layouts/15/me.aspx?v=profile&p=',
        delveSearchUrlPrefix: 'https://nam.delve.office.com/?q=',
        delveSearchUrlSuffix: '&searchpage=1&searchview=people&v=search',
        missionPhotoUpload: '/_layouts/15/Upload.aspx?List=%7B7CC88BAC-9CC9-4457-A59C-51FF5A21838D%7D&RootFolder=%2Fsites%2Fstage%2FmissionPhotos&ContentTypeId=0x0101009148F5A04DDD49CBA7127AADA5FB792B00AADE34325A8B49CDA8BB4DB53328F21401006059AB8EDD2AB649BE422D937A86AE6B',
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
            contacts: 'Contacts'
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
        storage: [
                { service: 'appService', key: 'CI_USER_APP_KEY', expire: 24, clearCommand: 'clearMyApps' },
                { service: 'bookmarkService', key: 'CI_MY_BOOKMARKS_KEY', expire: 24, clearCommand: 'clearMyBookmarks' },
                { service: 'employeeAnnouncementService', key: 'CI_EMPLOYEE_ANNOUNCEMENT_KEY', expire: 8, clearCommand: 'clearEmployeeAnnouncements' },
                { service: 'globalPartnerService', key: 'CI_GLOBAL_PARTNER_KEY', expire: 0, clearCommand: 'clearGlobalPartners' },
                { service: 'gratitudesService', key: 'CI_GRATITUDE_KEY', expire: 4, clearCommand: 'clearGratitudes' },
                { service: 'groupService', key: 'CI_GROUPS_KEY', expire: 24, clearCommand: 'clearGroups' },
                { service: 'navigationService', key: 'CI_NAVIGATION_KEY', expire: 0, clearCommand: 'clearNavNodes' },
                { service: 'photoService', key: 'CI_INTRANET_PHOTOS', expire: 24, clearCommand: 'clearPhotos' },
                { service: 'weatherService', key: 'CI_LOCATION_KEY', expire: 4, clearCommand: 'clearLocation' },
                { service: 'weatherService', key: 'CI_WEATHER_KEY', expire: 2, clearCommand: 'clearWeather' }
        ],
        contentTypeIds: {
            newsPage: '0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390064DEA0F50FC8C147B0B6EA0636C4A7D400391165E9D2147C40AB7727C9F70AF24301',
            event: '0x010200AA13DE23CACF40448F3C9C777ABC2106'
        }
    });
}