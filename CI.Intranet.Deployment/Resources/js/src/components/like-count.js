angular.module('').controller('likeController', function ($scope, COM_CONFIG, listService) {

    var ctrl = this;
    $scope.graphObjectNotCreated = false;
    var pageUrl = window.location.href.toLowerCase();

    this.$onInit = function () {
        var me = this;
        me.hasUserLiked();
    }

    this.hasUserLiked = function() {
        var id = page.id;
        listService.getNumberOfLikes(id).then(function(response){
            $.each(response.LikedBy, function(index, item){
                if (item.Title === bones.user.name) {
                    $scope.actionText = "Unlike";
                }
            });
            if (!$scope.actionText){
                $scope.actionText = "Like";
            }
        });
    }

    $scope.updateLike = function() {
        SP.SOD.registerSod('reputation.js', '/_layouts/15/reputation.js');
        SP.SOD.executeFunc('reputation.js', 'Microsoft.Office.Server.ReputationModel.Reputation', function () {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                var itemId = page.id;
                var listId = list.id.replace('{','').replace('}','');
                var setLike;
                if ($scope.actionText === "Unlike"){
                    setLike = false;
                }
                else {
                    setLike = true;
                } 

                var ctx = new SP.ClientContext(web.url);//your site url
                Microsoft.Office.Server.ReputationModel.Reputation.setLike(ctx, listId, itemId, setLike);

                ctx.executeQueryAsync(Function.createDelegate(this, function (response){
                    if ($scope.actionText === "Unlike"){
                        $scope.actionText = "Like";
                    }
                    else {
                        $scope.actionText = "Unlike";
                    }
                    $scope.$apply();
                }), Function.createDelegate(this, function (response){
                    console.log("Failure to change like", response);
                }));
            });    
        });
    }

}).component('likeCount', {
    controller: 'likeController',
    template: `
    <div id="article-likes"><a href="#" ng-click="updateLike()"><span class="icon-thumb_FA">{{actionText}}</span></a></div>
    `,
})