***处理未模块化的库，如 Zepto***

在module的rules下增加如下配置项：

``
{
    test: require.resolve('zepto'),
    loader: 'exports-loader?window.Zepto!script-loader'
}
``

***TODOLIST***

初始模版为完善和灵活化

sass/less、vue/react等可配置化

