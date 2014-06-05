var ProgressBar = function () {
  this.length  = this.getParam('length');
  this.before  = this.beforeCopy();
  this.after   = this.afterCopy();
  this.percent = 10;

  this.animate();
};

ProgressBar.prototype.animate = function () {
  var self     = this;
  var progress = $('.meter span');
  var copy     = $('.copy');

  copy.text(self.before);

  var increaseProgress = setInterval(function () {
    self.percent = self.percent + 0.01;

    if (self.percent > 100) {
      progress.css('border-radius', '20px');
	  progress.addClass('no-meter-bg');

      copy.html(self.after);

      clearInterval(increaseProgress);
      return;
    }

    progress.css('width', self.percent + '%');

  }, (self.length / 9000) * 1000);
};

ProgressBar.prototype.beforeCopy = function () {
  var copy = this.getParam('before');

  if (copy === '') {
    return 'Your order is being processed...';
  }
  return copy;
};

ProgressBar.prototype.afterCopy = function () {
  var copy = this.getParam('after');

  if (copy === '') {
    return 'Your order has been processed!';
  }
  return copy;
};

ProgressBar.prototype.getParam = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

$(document).ready(function () {
  new ProgressBar();
});