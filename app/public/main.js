$(function (argument) {
  var $textarea = $('#t');
  var $save = $('#s');
  var currentId = getId();
  var makeInProgress = false;

  $textarea.on('keyup', _.throttle(putChanges, 200));
  $save.on('click', save);
  window.onpopstate = onpopstate;
  $.ajaxPrefilter(function () { log('Working...'); });

  function putChanges(event) {
    var value = $textarea.val();

    // Initial POST
    if (location.pathname === '/' && !makeInProgress){
      makeInProgress = true;
      $.ajax({
        url: '/api',
        data: value,
        method: 'post',
        contentType: 'text/plain'
      })
      .then(function (resp) {
        makeInProgress = false;
        if (resp && resp.id) {
          var state = '/' + resp.id + '/1';

          currentId = resp.id;
          history.pushState(resp, state, state);
          log('New bin created.');
        }
      });
    } else {
      $.ajax({
        url: '/api/' + currentId,
        data: value,
        method: 'put',
        contentType: 'text/plain'
      }).then(function (resp) {
        var url = '/' + resp.id + '/' + resp.version;

        currentId = resp.id;
        history.replaceState(resp, url, url);
        log('Update successful!');
      });
    }
  }

  function save(event) {
    var value = $textarea.val();

    // Only save if a bin is loaded. Otherwise, keypress
    // events on textarea should make a new bin first in order
    // to make save work.
    if (location.pathname !== '/'){
      $.ajax({
        url: '/api/' + currentId,
        data: value,
        method: 'post',
        contentType: 'text/plain'
      }).then(function (resp) {
        log('Save successful!');
      });
    }
  }

  function getId(){
    if (location.pathname.length > 7) {
      return location.pathname.substring(1,10)
    }
    return null;
  }

  function onpopstate(resp) {
    if (resp && resp.body) {
      currentId = resp.id;
      $textarea.val(resp.body);
    }
  }

  function log(str) {
    $('.log').text(str);
  }
});