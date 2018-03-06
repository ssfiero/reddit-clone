(function() {
  'use strict'

  angular.module('app')
    .component('post', {
      templateUrl: '/js/posts/post.template.html',
      controller: controller
    })

  controller.inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.newPostToggle = newPostToggle
    vm.createPost = createPost
    vm.addComments = addComments
    vm.upVote = upVote
    vm.downVote = downVote
    vm.deletePost = deletePost

    function onInit() {
      $http.get('/api/posts')
        .then(function(response) {
          vm.posts = response.data
          console.log('Each post object in the posts array: ', vm.posts);
          vm.orderBy = '-vote_count'
        })
    }

    function newPostToggle() {
      vm.addPost = !vm.addPost
    }

    function createPost() {
      $http.post('/api/posts', vm.post)
        .then(function(response) {
          vm.post.vote_count = 0
          vm.post.created_at = new Date
          response.data.comments = []
          vm.posts.push(response.data)
          console.log((vm.post));
          vm.addPost = !vm.addPost
          delete vm.post
        })
    }

    function addComments(post) {
      // does not allow user to submit blank comment or increment comment
      // counter with a blank comment
      if (post.comment == undefined) return
      $http.post(`/api/posts/${post.id}/comments`, post.comment)
        .then(function(response) {
          post.comment.created_at = new Date
          post.comments.push(response.data)
          console.log('All comment objects', post.comments);
          console.log('Comment object', post.comment);
          delete post.comment
        })
    }

    function upVote(post) {
      $http.post(`/api/posts/${post.id}/votes`)
        .then(function(response) {
          post.vote_count = response.data.vote_count
          console.log('Upvote: ', post.vote_count);
        })
    }

    function downVote(post) {
      if (post.vote_count == 0) return
      $http.delete(`/api/posts/${post.id}/votes`)
        .then(function(response) {
          post.vote_count = response.data.vote_count
          console.log('Downvote', post.vote_count);
        })
    }

    function deletePost(post) {
      $http.delete(`/api/posts/${post.id}`, vm.post)
        .then(function(response) {
          delete vm.post
          onInit()
        })
    }

  }

})();
