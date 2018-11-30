# JsonEditor
- 这是一个Cocos引擎的扩展插件  
- 一个可视化编辑简易JSON文件的编辑器
- 安装扩展插件参照[官方文档](https://docs.cocos.com/creator/manual/zh/extension/install-and-share.html) 
## 文件格式如下：
### JSON文件格式
- 目前只支持一种格式
```
[  
    {  
        "a":1,  
        "b":"B"  
    }  
]  
```
### 编辑器表格内容
- 第一行为属性key，第二行开始为数据value
- 删除key需把每一行对应的value都清空，否则报错
- 单行数据不需要对应key的值时清空即可
#### 例如：

id | name | age | sex  
-|-|-|-
0 | xiaoming | 18 | man  
1 | xiaohong | 17 | woman  

id | name | age | sex  
-|-|-|-
0 |  | 18 | man  
1 | xiaohong | 17 | woman  

id |  | age | sex  
-|-|-|-
0 |  | 18 | man  
1 |  | 17 | woman  
#### 上表数据转化成JSON文件格式分别为：
```
[  
    {  
        "id":0,  
        "name":"xiaoming",  
        "age":18,  
        "sex":"man"  
    },  
    {  
        "id":1,  
        "name":"xiaohong",  
        "age":17,  
        "sex":"woman"  
    }  
]  
```
```
[  
    {  
        "id":0,   
        "age":18,  
        "sex":"man"  
    },  
    {  
        "id":1,  
        "name":"xiaohong",  
        "age":17,  
        "sex":"woman"  
    }  
]  
```
```
[  
    {  
        "id":0,   
        "age":18,  
        "sex":"man"  
    },  
    {  
        "id":1,   
        "age":17,  
        "sex":"woman"  
    }  
]  
```
