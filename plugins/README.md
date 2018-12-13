#####功用插件包
此文件引用公用插件,可以从公司内部npm下载tgz包后放到此文件内在package.json中配置如下：

````$xslt
"dependencies": {
    "touch-slide": "file:plugins/touch-slide-1.0.2.tgz"
  },

````
如上配置在npm时就会安装到node_modules中直接用