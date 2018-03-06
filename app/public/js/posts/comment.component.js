(function() {
  'use strict'

  angular.module('app')
    .service('commentService', service)
    // .component('post', {
    //   templateUrl: '/js/posts/comment.template.html',
    //   controller: controller
    // })

  controller.inject = ['http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit


    function onInit() {


    }



  }

})();
