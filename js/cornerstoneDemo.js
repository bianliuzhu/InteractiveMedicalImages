// 负载在HTML模板

var viewportTemplate; // 视图模板
loadTemplate("templates/viewport.html", function (element) {
  console.log(element);
  viewportTemplate = element;
});

var studyViewerTemplate; // the study 视图模板
loadTemplate("templates/studyViewer.html", function (element) {
  studyViewerTemplate = element;
});

// 从JSON清单中获取study列表
$.getJSON('studyList.json', function (data) {
  data.studyList.forEach(function (study) {

    // 为清单中的每个 study 研究创建一个表行
    var studyRow = '<tr><td>' +
      study.patientName + '</td><td>' +
      study.patientId + '</td><td>' +
      study.studyDate + '</td><td>' +
      study.modality + '</td><td>' +
      study.studyDescription + '</td><td>' +
      study.numImages + '</td><td>' +
      '</tr>';

    // 将这一行附加到学习列表中
    var studyRowElement = $(studyRow).appendTo('#studyListData');

    // 在学习列表中点击。
    $(studyRowElement).click(function () {

      //为studay添加新的标签并切换到它
      var studyTab = '<li><a href="#x' + study.patientId + '" data-toggle="tab">' + study.patientName + '</a></li>';
      $('#tabs').append(studyTab);

      //通过复制studyViewerTemplate元素添加选项卡内容
      var studyViewerCopy = studyViewerTemplate.clone();

      /*var viewportCopy = viewportTemplate.clone();
      studyViewerCopy.find('.imageViewer').append(viewportCopy);*/


      studyViewerCopy.attr("id", 'x' + study.patientId);
      // 构建 可见视图
      studyViewerCopy.removeClass('hidden');
      // 向选项卡内容添加部分
      studyViewerCopy.appendTo('#tabContent');

      // 显示新的选项卡(这将是刚刚添加的最后一个选项卡
      $('#tabs a:last').tab('show');

      // 切换窗口大小(?)
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(window).trigger('resize');
      });

      //现在加载study.json
      loadStudy(studyViewerCopy, viewportTemplate, study.studyId + ".json");
    });
  });
});


// 显示选项卡上单击
$('#tabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

// 主要调整
function resizeMain() {
  var height = $(window).height();
  $('#main').height(height - 50);
  $('#tabContent').height(height - 50 - 42);
}


// 调用窗口调整大小
$(window).resize(function () {
  resizeMain();
});
resizeMain();


// 防止滚动iOS
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault();
});