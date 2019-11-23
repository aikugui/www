+(function($) {
  $.fn.i18n = function(opts) {
    opts = $.extend(
      {
        group: "default",
        lang: window.i18n.language || "en"
      },
      opts
    );
    var that = this,
      update = function() {
        $("html").attr("lang", opts.lang);
        that.each(function(n, el) {
          var key = el.dataset.i18n;
          if (!key) return;
          var translation = window.i18n[opts.group][opts.lang][key];
          $(el).html(translation || "");
        });
      };
    update();
    $(document).on("i18n-switch", function(event) {
      opts.lang = event.lang || window.i18n.language;
      update();
    });
  };
  $.fn.i18n.switch = function(lang) {
    var event = $.Event("i18n-switch");
    event.language = window.i18n.language = lang;
    $(document).trigger(event);
  };
  $(function() {
    $("[data-group]").each(function(n, el) {
      var group = el.dataset.group;
      $("[data-i18n]", el).i18n({
        group: group
      });
    });
  });
})(jQuery);
