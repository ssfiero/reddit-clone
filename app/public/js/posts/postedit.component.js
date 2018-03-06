(function() {
  'use strict'

  angular.module('app')
    .component('postedit', {
      templateUrl: '/js/posts/postedit.template.html',
      controller: controller
    })

  controller.inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    const vm = this

    vm.$onInit = onInit
    vm.editPost = editPost
    vm.deletePost = deletePost

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(function(response) {
          vm.post = response.data
          console.log('Original post: ', vm.post);
          $http.get(`/api/posts/${$stateParams.id}/comments`)
          .then(function(response) {
            vm.comment = response.data
          })
        })
    }

    function editPost() {
      $http.patch(`/api/posts/${$stateParams.id}`, vm.post)
        .then(function(response) {
          console.log('Edited post: ', vm.post);
          // redirect to main page with all posts
          $state.go('post')
        })
    }

    function deletePost() {
      $http.delete(`/api/posts/${$stateParams.id}`, vm.post)
        .then(function(response) {
          // console.log('in the function??');
          delete vm.post
          $state.go('post')
        })
    }

  }

})();
