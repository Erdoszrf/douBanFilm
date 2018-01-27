var start = 0
function getData (obj){
  $.ajax({
  url:'https://api.douban.com/v2/movie/top250',
  type:'GET',
  data:{
    start:start,
    count:20
  },
  dataType:'jsonp',
}).done(function(ret){
  setData(ret)
}).fail(function(){
  console.log('失败')
})
}

function setData (Data){
  Data.subjects.forEach(function(movie){
    var tpl = `<div class="content">
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
        </div>`

  var $node = $(tpl)
  $node.find('.cover img').attr('src',movie.images.medium)
  $node.find('.info h2').text(movie.title)
  $node.find('.info .score').text(movie.rating.average)
  $node.find('.info .collect').text(movie.collect_count)
  $node.find('.info .year').text(movie.year)
  $node.find('.info .type').text(movie.genres.join(' / '))
  $node.find('.info .director').text(function(){
    var director = []
    movie.directors.forEach(function(item){
      director.push(item.name)
    })
    return director.join(' 、')
  })
  $node.find('.info .actor').text(function(){
    var actor = []
    movie.casts.forEach(function(item){
      actor.push(item.name)
    })
    return actor.join(' 、')
  })
  $('section').eq(0).append($node)
  })

}
getData()

$('footer>div').on('click',function(){
  $(this).addClass('active').siblings().removeClass('active')
  $carrentPage = $('main>section').hide().eq($(this).index()).fadeIn()
  console.log($('main>section'))
})
$('main>section').on('scroll',function(){
  let Top = $('main>section').scrollTop()
  let height = $('main').height()
  let scheight = $('main>section')[0].scrollHeight
  if(Top+height>scheight-15){
    getData()
  }
})
