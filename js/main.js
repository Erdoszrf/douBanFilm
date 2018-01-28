

var top250 = {
  init: function() {
    this.index = 0
    this.$container = $('#top')
    this.$content = this.$container.find('.content')
    this.start()
    this.bind()

  },
  bind: function() {
  var _this = this
  var $clock
  this.$container.on('scroll', function() {

    if($clock){clearTimeout($clock)}
    if(this.clientHeight + this.scrollTop > this.scrollHeight - 30) {
    $clock = setTimeout(function(){

          _this.start()
          console.log(33)
      $clock = false
    },500)
}


  })
},
  start: function() {
    var _this = this
    this.getData(function(data) {
      _this.setData(data)

    })
  },
  getData: function(callback) {
    var _this = this

    _this.$container.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      type: 'GET',
      data: {
        start: _this.index || 0
      },
      dataType: 'jsonp',
    }).done(function(ret) {
      _this.index += 20
      _this.$container.find('.loading').hide()
      callback&&callback(ret)
    }).fail(function() {
      console.log('失败')
    })

  },
  setData: function(Data) {
    _this=this
    Data.subjects.forEach(function(movie) {

      var tpl = `
          <div class="item">
            <a href="#">
              <div class="cover">
                <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910830216.jpg" alt="图片走丢了" />
              </div>
              <div class="info">
                <h2>千与千寻</h2>
                <p>
                  <span class="score">9.0</span>分/
                  <span class="collect">222222</span>收藏
                </p>
                <p>
                  <span class="year">2001</span>/
                  <span class="type">偶像</span>
                </p>
                <p>
                                  导演：<span class="director">张艺谋</span>
                </p>
                <p>
                                  主演：<span class="actor">看看，搜索，方方，和</span>
                </p>
              </div>
            </a>
            </div>

        `

      var $node = $(tpl)

      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.medium)
      $node.find('.info h2').text(movie.title)
      $node.find('.info .score').text(movie.rating.average)
      $node.find('.info .collect').text(movie.collect_count)
      $node.find('.info .year').text(movie.year)
      $node.find('.info .type').text(movie.genres.join(' / '))
      $node.find('.info .director').text(function() {
        var director = []
        movie.directors.forEach(function(item) {
          director.push(item.name)
        })
        return director.join(' 、')
      })
      $node.find('.info .actor').text(function() {
        var actor = []
        movie.casts.forEach(function(item) {
          actor.push(item.name)
        })
        return actor.join(' 、')
      })
      _this.$content.append($node)
    })
  }
}




var us = {
init: function() {
    this.index = 0
    this.$container = $('#us')
    this.$content = this.$container.find('.content')
    this.start()

    this.clock
},

start: function() {
    var _this = this
    this.getData(function(data) {
      _this.setData(data)

    })
},
getData: function(callback) {
    var _this = this

    _this.$container.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/us_box',
      type: 'GET',
      dataType: 'jsonp',
    }).done(function(ret) {

      _this.$container.find('.loading').hide()
      callback&&callback(ret)
    }).fail(function() {
      console.log('失败')
    })

},
setData: function(Data) {
  _this=this
    Data.subjects.forEach(function(movie) {

      var tpl = `
          <div class="item">
            <a href="#">
              <div class="cover">
                <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910830216.jpg" alt="图片走丢了" />
              </div>
              <div class="info">
                <h2>千与千寻</h2>
                <p>
                  <span class="score">9.0</span>分/
                  <span class="collect">222222</span>收藏
                </p>
                <p>
                  <span class="year">2001</span>/
                  <span class="type">偶像</span>
                </p>
                <p>
                                  导演：<span class="director">张艺谋</span>
                </p>
                <p>
                                  主演：<span class="actor">看看，搜索，方方，和</span>
                </p>
              </div>
            </a>
            </div>

        `

      var $node = $(tpl)

      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.subject.images.medium)
      $node.find('.info h2').text(movie.subject.title)
      $node.find('.info .score').text(movie.subject.rating.average)
      $node.find('.info .collect').text(movie.subject.collect_count)
      $node.find('.info .year').text(movie.subject.year)
      $node.find('.info .type').text(movie.subject.genres.join(' / '))
      $node.find('.info .director').text(function() {
        var director = []
        movie.subject.directors.forEach(function(item) {
          director.push(item.name)
        })
        return director.join(' 、')
      })
      $node.find('.info .actor').text(function() {
        var actor = []
        movie.subject.casts.forEach(function(item) {
          actor.push(item.name)
        })
        return actor.join(' 、')
      })
      _this.$content.append($node)

    })
}
}



var search = {
  init: function() {
    this.index = 0

    this.$container = $('#search')
    this.$content = this.$container.find('.content')
    this.$input = this.$container.find('input')
    this.$btn = this.$container.find('.button')
    this.start()
    this.bind()

  },
  bind: function() {
  var _this = this
  this.$btn.click(function() {
    _this.getData(_this.$input.val(), function(data) {

      _this.setData(data)
    })
  })
},
  start: function() {
    var _this = this
    this.getData(function(data) {


    })
  },
  getData: function(keyword,callback) {
    var _this = this

    _this.$container.find('.loading').show()
    $.ajax({
      url: 'https://api.douban.com/v2/movie/search',
      type: 'GET',
      data: {
            q: keyword
          },
      dataType: 'jsonp',
    }).done(function(ret) {
      _this.index += 20
      _this.$container.find('.loading').hide()
      callback&&callback(ret)
    }).fail(function() {
      console.log('失败')
    })

  },
  setData: function(data) {

    _this=this
    data.subjects.forEach(function(movie) {

      var tpl = `
          <div class="item">
            <a href="#">
              <div class="cover">
                <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910830216.jpg" alt="图片走丢了" />
              </div>
              <div class="info">
                <h2>千与千寻</h2>
                <p>
                  <span class="score">9.0</span>分/
                  <span class="collect">222222</span>收藏
                </p>
                <p>
                  <span class="year">2001</span>/
                  <span class="type">偶像</span>
                </p>
                <p>
                                  导演：<span class="director">张艺谋</span>
                </p>
                <p>
                                  主演：<span class="actor">看看，搜索，方方，和</span>
                </p>
              </div>
            </a>
            </div>

        `

      var $node = $(tpl)

      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.medium)
      $node.find('.info h2').text(movie.title)
      $node.find('.info .score').text(movie.rating.average)
      $node.find('.info .collect').text(movie.collect_count)
      $node.find('.info .year').text(movie.year)
      $node.find('.info .type').text(movie.genres.join(' / '))
      $node.find('.info .director').text(function() {
        var director = []
        movie.directors.forEach(function(item) {
          director.push(item.name)
        })
        return director.join(' 、')
      })
      $node.find('.info .actor').text(function() {
        var actor = []
        movie.casts.forEach(function(item) {
          actor.push(item.name)
        })
        return actor.join(' 、')
      })
      _this.$content.append($node)
    })
  }
}




var app = {
  init: function() {
    var start = 0

    this.$tabs = $('footer>div')
    this.$carrentPage = $('section')
    this.bind()
    top250.init()
    us.init()
    search.init()
  },
  bind: function() {
    var _this = this
    this.$tabs.on('click', function() {
      $(this).addClass('active').siblings().removeClass('active')
      _this.$carrentPage.hide().eq($(this).index()).fadeIn()
    })
  },
  start: function() {},
  getData: function() {},
  setData: function() {}

}
app.init()