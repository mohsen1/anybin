$(function (argument) {
  var $textarea = $('#t');
  var $save = $('#s');

  $textarea.on('keyup', _.throttle(putChanges, 200));

  function putChanges(event) {
    var value = $textarea.val();

    // Initial POST
    if (location.pathname === '/'){
      $.post('/api', value)
        .then(function (resp) {
          if (resp && resp.id) {
            history.pushState(resp, resp.id, resp.id);
          }
        });
    } else {
      $.ajax({
          url: '/api' + location.pathname,
          data: value,
          method: 'put',
          contentType: 'text/plain'
        }).then(function (resp) {
          console.log('Update successful!');
        });
    }
  }
});