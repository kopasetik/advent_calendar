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
        api: 'Meetup',
        description: 'Extend your community',
        url: 'https://api.meetup.com',
        showNumber: false
      },
      {
        api: 'Youtube',
        description: 'Video',
        url: 'https://developers.google.com/youtube/v3/docs/',
        showNumber: false
      },
      {
        api: 'Google Maps',
        description: 'Mapping',
        url: 'https://developers.google.com/maps/',
        showNumber: false
      },
      {
        api: 'Twilio',
        description: 'Phone',
        url: 'https://www.twilio.com/api',
        showNumber: false
      },
      {
        api: 'GitHub',
        description: 'Version Control',
        url: 'https://developer.github.com/v3/',
        showNumber: false
      },
      {
        api: 'Braintree',
        description: 'Payments',
        url: 'https://developers.braintreepayments.com/',
        showNumber: false
      },
      {
        api: 'Amazon Product Advertising',
        description: 'Affiliate Marketing',
        url: 'https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html',
        showNumber: false
      },
      {
        api: 'SendGrid',
        description: 'Email',
        url: 'https://sendgrid.com/docs/Integrate/libraries.html',
        showNumber: false
      },
      {
        api: 'Sabre',
        description: 'Travel',
        url: 'https://developer.sabre.com',
        showNumber: false
      },
      {
        api: 'Dropbox',
        description: 'File storage',
        url: 'https://www.dropbox.com/developers',
        showNumber: false
      },
      {
        api: 'FitBit',
        description: 'Fitness',
        url: 'https://dev.fitbit.com/',
        showNumber: false
      },
      {
        api: 'Twitter',
        description: 'Microblogging',
        url: 'https://dev.twitter.com/overview/documentation',
        showNumber: false
      }
    ]
  $scope.daysOfAdvent = [];
  $scope.selectedDay = null;
  $scope.toggleDay = function (idx){
    var specificDay = $scope.apiList[idx];
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
          windowClass: 'active_modal another_class yet_another_class'
        });

        modalInstance.result.then(function resolve(searchInput){
          console.log(searchInput);
          $http({
            method: 'GET',
            url: 'http://apis.io/api/search',
            params: {
              q: searchInput
            }
          })
          .then(function queryResolve(response){
            console.log(response.data.data);
          }, function queryReject(error){
            // console.log(error);
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
