let jsonBeautifully = Editor.require('packages://jsoneditor/node_modules/json-beautifully');
let fs = require('fs-extra');
let Electron = require('electron');
Editor.Panel.extend({
  style: fs.readFileSync(Editor.url('packages://jsoneditor/panel/index.css', 'utf8')) + "",
  template: fs.readFileSync(Editor.url('packages://jsoneditor/panel/index.html', 'utf8')) + "",

  $: {
    import: '#import',
    addrow: '#addrow',
    addclo: '#addclo',
    help: '#help',
    save: '#save',
    table: '#table',
    info: '#info',
    input: '#input',
    preview: '#preview',
    text: '#text'
  },

  ready() {
    var jsonData = "";
    var prop = [];
    var value = [];
    var rowValue = [];
    var json = [];
    var result = "";
    var myJsonString = "";

    //添加行
    this.$addrow.onclick = () => {
      var row = this.$table.children[1].cloneNode(true);
      this.$table.appendChild(row);
    }

    //添加列
    this.$addclo.onclick = () => {
      for (var i = 0; i < this.$table.children.length; i++) {
        var clo = this.$input.cloneNode(this.$input);
        this.$table.children[i].appendChild(clo);
      }
    }
    
    //帮助
    this.$help.onclick = () => {
      let url = "https://github.com/a807156739/jsoneditor/blob/master/README.md";
      Electron.shell.openExternal(url);
    }

    //导入JSON文件并初始化表格
    this.$import.onclick = () => {
      // alert("目前仅支持数组JSON数据");
      let res = Editor.Dialog.openFile({
        title: "选择Json文件",
        defaultPath: Editor.projectInfo.path,
        properties: ['openFile', 'promptToCreate'],
        filters: [
          { name: 'json', extensions: ['json'] },
        ]
      });
      if (res !== -1) {
        let dir = res[0];
        var configJSON = dir;
        var row
        var clo;
        const data = fs.readJsonSync(configJSON);
        prop = [];
        value = [];
        rowValue = [];
        jsonData = data;
        dataInit(jsonData);

        //清空表内容
        for (var i = this.$table.children.length - 1; i >= 0; i--) {
          this.$table.removeChild(this.$table.children[i]);
        }
        //生成父节点
        for (var i = 0; i <= jsonData.length; i++) {
          row = this.$info.cloneNode();
          this.$table.appendChild(row);
        }
        //生成表
        for (var i = 0; i < this.$table.children.length; i++) {
          for (var j = 0; j < prop.length; j++) {
            clo = this.$input.cloneNode(this.$input);
            clo.value = value[i][j];
            this.$table.children[i].appendChild(clo);
          }
        }
      };
    }


    //保存
    this.$save.onclick = () => {
      if (jsonData == "" && this.$table.children[0].children[0].value == "") {
        alert("数据为空，请查询后再进行操作...");
      } else {
        dataTransfrom(this);
        if (result != "数据有误，请查询后再进行操作...") {
          let res = Editor.Dialog.saveFile({
            title: "选择保存Json文件的路径",
            defaultPath: Editor.projectInfo.path,
          });
          if (res != "") {
            fs.outputFile(res, result, err => {
              Editor.log(err);
            });
          }
        }
      }
    };

    //预览
    this.$preview.onclick = () => {
      if (jsonData == "" && this.$table.children[0].children[0].value == "") {
        this.$text.value = "数据有误，请查询后再进行操作..."
      } else {
        dataTransfrom(this);
        this.$text.value = result;
      };
    }

    //表格内容转化JSON数据
    function dataTransfrom(self) {
      var props = [];
      for (var i = 0; i < self.$table.children.length; i++) {
        var jsonObj = {};
        value = [];
        if (i == 0) {
          for (var j = 0; j < self.$table.children[i].children.length; j++) {
            if (self.$table.children[i].children[j].value == "") {
              if (self.$table.children[i].children[self.$table.children[i].children.length - 1].value == "") {
                continue;
              } else {
                alert("格式有误");
                props = [];
                break;
              }
            } else {
              var value = self.$table.children[i].children[j].value;
              props.push(value);
            }
          }
        } else if (i > 0) {
          for (var j = 0; j < props.length; j++) {
            if (self.$table.children[i].children[j].value == "") {
              if (self.$table.children[self.$table.children.length - 1].children[j].value == "") {
                continue;
              }
            } else {
              var value = self.$table.children[i].children[j].value;
              if (!isNaN(value)) {
                value = value * 1;
              }
              var name = props[j];
              jsonObj[name] = value;
            }
          }
          if (JSON.stringify(jsonObj) !== "{}") {
            json.push(jsonObj)
          };
        }
      };
      myJsonString = JSON.stringify(json);
      json = [];
      result = jsonBeautifully(myJsonString);//格式化代码
      if (props == "") {
        result = "数据有误，请查询后再进行操作...";
      }
    }

    function dataInit(data) {
      self = this;
      //属性名
      for (x in data[0]) {
        prop.push(x);
      }
      value.push(prop);
      //数据
      for (x in data) {
        rowValue = [];
        for (y in data[x]) {
          rowValue.push(data[x][y]);
        }
        value.push(rowValue);
      }
    }

    // function createxmlHttpRequest() {
    //   var xmlHttp;
    //   if (window.ActiveXObject) {
    //     xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    //   } else if (window.XMLHttpRequest) {
    //     xmlHttp = new XMLHttpRequest();
    //   }
    //   return xmlHttp;
    // }

    // function doGetJSON(url, func) {
    //   var xmlHttp = createxmlHttpRequest();
    //   xmlHttp.open("GET", url);
    //   xmlHttp.send(null);
    //   xmlHttp.onreadystatechange = function () {
    //     if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
    //       func & func(JSON.parse(xmlHttp.responseText));
    //     }
    //   }
    // }
  },
});