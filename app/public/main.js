$(function (argument) {
  var $textarea = $('#t');
  var $save = $('#s');
  var currentId = getId();

  $textarea.on('keyup', _.throttle(putChanges, 200));
  $save.on('click', save);
  window.onpopstate = onpopstate;

  function putChanges(event) {
    var value = $textarea.val();

    // Initial POST
    if (location.pathname === '/'){
      $.post('/api', value)
        .then(function (resp) {
          if (resp && resp.id) {
            var state = resp.id + '/1';

            currentId = resp.id;
            history.pushState(null, state, state);
          }
        });
    } else {
      $.ajax({
          url: '/api/' + currentId,
          data: value,
          method: 'put',
          contentType: 'text/plain'
        }).then(function (resp) {
          console.log('Update successful!');
        });
    }
  }

  function save(event) {
    var value = $textarea.val();

    // Only save if a bin is loaded. Otherwise, keypress
    // events on textarea should make a new bin first in order
    // to make save work.
    if (location.pathname !== '/'){
      $.post('/api/' + currentId, value)
        .then(function (resp) {
          if (resp && resp.version) {
            history.pushState(null, resp.version, resp.version);
          }
        })
    }
  }

  function getId(){
    if (location.pathname.length > 7) {
      return location.pathname.substring(1,10)
    }
    return null;
  }

  function onpopstate(event) {
    $.get('/api' + location.pathname).then(function (resp) {
      if (resp && resp.body) {
        $textarea.val(resp.body);
      }
    });
  }
});