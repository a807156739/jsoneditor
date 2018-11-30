'use strict';

module.exports = {
  load () {
    Editor.log('jsoneditor组件导入成功');
    // execute when package loaded
  },

  unload () {
    Editor.log('jsoneditor组件导入失败');
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      Editor.log('jsoneditorOpen');
      // open entry panel registered in package.json
      Editor.Panel.open('jsoneditor');
    },
    'say-hello' () {
      Editor.log('Hello World!!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('jsoneditor', 'jsoneditor:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};