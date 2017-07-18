// set up static configuration entries
var app = angular.module('compassionIntranet');

//Discover Dev
if (document.location.host === "compassion.sharepoint.com") {
    if (document.location.pathname.toLowerCase().indexOf('/sites/dev') !== -1) {
        app.constant('COM_CONFIG', {
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
            rootWeb: 'https://compassion.sharepoint.com/sites/dev',
            lists: {
                rssFeedsListTitle: 'RSS Feeds List',
                userRssFeedsListTitle: 'User RSS Feed Item'
            }
        });
    }
    else {
        app.constant('COM_CONFIG', {
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
            lists: {
                rssFeedsListTitle: 'RSS Feeds List',
                userRssFeedsListTitle: 'User RSS Feed Item'
            }
        });
    }
}
    //Dev Tenant
else {
    app.constant('COM_CONFIG', {
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
        rootWeb: 'https://teganwilson.sharepoint.com/sites/compassion1',
        lists: {
            rssFeedsListTitle: 'RSS Feeds List',
            userRssFeedsListTitle: 'User RSS Feed Item'
        }
    });
}