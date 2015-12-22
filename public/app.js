angular.module('adventApp', ['ui.bootstrap'])
  .controller('CalendarCtrl', ['$scope', '$uibModal', '$http', loadCalendar])
  .controller('SearchModalCtrl', ['$scope', '$uibModalInstance', manageModal])

function updateModalStatus(){

}

function manageModal($scope, $uibModalInstance){
  $scope.ok = function (){
    $uibModalInstance.close($scope.searchInput);
  };

  $scope.cancel = function (){
    $uibModalInstance.dismiss('modal canceled');
  };
}

function loadCalendar ($scope, $uibModal, $http) {
  $scope.apiList = [
      {
        name: 'Meetup',
        description: 'Extend your community',
        humanURL: 'https://api.meetup.com',
        showNumber: false
      },
      {
        name: 'Youtube',
        description: 'Video',
        humanURL: 'https://developers.google.com/youtube/v3/docs/',
        showNumber: false
      },
      {
        name: 'Google Maps',
        description: 'Mapping',
        humanURL: 'https://developers.google.com/maps/',
        showNumber: false
      },
      {
        name: 'Twilio',
        description: 'Phone',
        humanURL: 'https://www.twilio.com/api',
        showNumber: false
      },
      {
        name: 'GitHub',
        description: 'Version Control',
        humanURL: 'https://developer.github.com/v3/',
        showNumber: false
      },
      {
        name: 'Braintree',
        description: 'Payments',
        humanURL: 'https://developers.braintreepayments.com/',
        showNumber: false
      },
      {
        name: 'Amazon Product Advertising',
        description: 'Affiliate Marketing',
        humanURL: 'https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html',
        showNumber: false
      },
      {
        name: 'SendGrid',
        description: 'Email',
        humanURL: 'https://sendgrid.com/docs/Integrate/libraries.html',
        showNumber: false
      },
      {
        name: 'Sabre',
        description: 'Travel',
        humanURL: 'https://developer.sabre.com',
        showNumber: false
      },
      {
        name: 'Dropbox',
        description: 'File storage',
        humanURL: 'https://www.dropbox.com/developers',
        showNumber: false
      },
      {
        name: 'FitBit',
        description: 'Fitness',
        humanURL: 'https://dev.fitbit.com/',
        showNumber: false
      },
      {
        name: 'Twitter',
        description: 'Microblogging',
        humanURL: 'https://dev.twitter.com/overview/documentation',
        showNumber: false
      }
    ]
  $scope.daysOfAdvent = [];
  $scope.selectedDay = null;
  $scope.activeList = '';
  $scope.toggleDay = function (listToUse, idx){
    $scope.activeList = $scope[listToUse];
    var specificDay = $scope.activeList[idx];
    specificDay['showNumber'] = !specificDay['showNumber'];
    $scope.selectedDay = idx + 1;
  };
  $scope.open = (function(){
    var modalOpened = false;
    return function(){
      if (!modalOpened){
        var modalInstance = $uibModal.open({
          templateUrl: 'myModalContent.html',
          controller: 'SearchModalCtrl',
          windowClass: 'active_modal another_class yet_another_class',
          size: 'lg'
        });

        modalInstance.result.then(function resolve(searchInput){
          $http({
            method: 'GET',
            url: 'http://apis.io/api/search',
            params: {
              q: searchInput
            }
          })
          .then(function queryResolve(response){
            $scope.searchResults = response.data.data;
          }, function queryReject(error){
            console.log('it didnt work')
          });
          modalOpened = false;
        }, function reject(rejectionReason){
          console.log(rejectionReason);
          modalOpened = false;
        });
        modalOpened = true;
      }
    };
  })();
}
