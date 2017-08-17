import pnp from "sp-pnp-js";

angular.module('compassionIntranet').service('departmentNewsService', function($q, $http, userProfileService, COM_CONFIG) {
    let getImage = function(x) {

        x = x.substring(x.indexOf('src=') + 5);
        x = x.substring(0, x.indexOf('" '));
        return x;
    }

    let setData = function(x) {
        var img = x.RefinableString100;
        if (img) {
            x.img = getImage(img);
        }
        if (x.RefinableString101) {
            x.background = x.RefinableString101.toLowerCase() + "-gradient";
        }

        if (x.RefinableDate01) {
            let date1 = new Date(x.RefinableDate01);

            x.articleDate = moment(date1).format('MMMM DD, YYYY');
        }
        if (x.RefinableDate03) {
            x.OutlookEndDate = new Date(x.RefinableDate03);

            var end = new Date(x.RefinableDate03);
            end = moment.utc(end).utcOffset("-10:00");
            x.endTime = moment(end).format('h:mm a');

            let date2 = new Date(x.RefinableDate03);
            x.eventEnd = moment(date2).format('MMMM DD, YYYY');
        }
        if (x.RefinableDate00) {
            x.OutlookStartDate = new Date(x.RefinableDate00);

            var start = new Date(x.RefinableDate00);
            start = moment.utc(start).utcOffset("-10:00");
            x.startTime = moment(start).format('h:mm a');

            let date3 = new Date(x.RefinableDate00);
            x.eventStart = moment(date3).format('MMMM DD, YYYY');
        }

        return x;
    }

    let getOfficePath = function(userDept) {
        var deptPath;
        switch (userDept) {
            case 'Business Technology':
                deptPath = '/bu/bt';
                break;
            case 'Marketing':
                deptPath = '/bu/marketing'
                break;
            case 'CB':
                deptPath = '/bu/consumerbanking';
                break;
            case 'Corporate Communications':
                deptPath = '/bu/corporatecommunications';
                break;
            case 'Corporate Risk Management':
                deptPath = '/bu/crm';
                break;
            case 'ETIM':
                deptPath = '/bu/etim';
                break;
            case 'Risk Management':
                deptPath = '/bu/crm';
                break;
            case 'CSCM':
                deptPath = '/bu/cscm';
                break;
            case 'Finance':
                deptPath = '/bu/finance';
                break;
            case 'Human Resources':
                deptPath = '/bu/humanresources';
                break;
            case 'Internal Audit':
                deptPath = '/bu/internalaudit';
                break;
            case 'Law':
                deptPath = '/bu/law';
                break;
            case 'Legal':
                deptPath = '/bu/law';
            case 'Payment Services':
                deptPath = '/bu/paymentservices';
                break;
            case 'Diners Club':
                deptPath = '/bu/paymentservices/dci';
                break;
        }
        var url = COM_CONFIG.rootWeb + deptPath;
        return url;
    }

    let depNews = function() {
        var defer = $q.defer();
        userProfileService.getUserDepartment().then(function(userDept) {
            var deptUrl = getOfficePath(userDept);
            //calc dates for filtering
            var now = moment().format("YYYY-MM-DD")
            var eventDate = moment(now).add(14, 'days').format("YYYY-MM-DD");
            var articleDate = moment(now).subtract(14, 'days').format("YYYY-MM-DD");

            //specify query variables
            var path = " Path:" + "" + deptUrl + '/pages' + "";
            var event = " ContentTypeId:0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D0025030FFA21BB6146AC471A3ECDC9638D*";
            var news = " ContentTypeId:0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D0017899C3E9B390F4E9BD82B8F03AFD6E6*";
            var eventQuery = " RefinableDate00>=" + now + " AND RefinableDate00<" + eventDate + " ";
            var newsQuery = " RefinableDate01>" + articleDate + " AND RefinableDate01<=" + now + " ";

            pnp.sp.search({
                Querytext: '' + newsQuery + 'OR' + eventQuery + '' + news + '' + event + ' ' + path + '',
                SelectProperties: ['RefinableString104', 'RefinableString103', 'RefinableDate00', 'RefinableDate01', 'RefinableDate03', 'RefinableString14', 'RefinableString15', 'RefinableString09', 'RefinableString100', 'RefinableString13', 'Path', 'Title', 'ListItemID', 'ArticleByLineOWSTEXT', 'ContentType'],
                TrimDuplicates: 'false',
                RowLimit: 3,
                SortList: [{
                    'Property': 'RefinableDate01',
                    'Direction': '1'
                }]

            }).then(function(data) {
                if (userDept.toLowerCase() === "legal") {
                    userDept = "Law";
                }
                var items = { userDepartment: userDept, departmentLink: deptUrl, results: data.PrimarySearchResults };
                //transform returned data
                items.results.map(setData);
                defer.resolve(items);
            });
        });
        return defer.promise;
    }

    this.getNews = function() {
        return depNews();
    }
});