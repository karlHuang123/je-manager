# Je-Manager-Web

## About ENV
此项目只有一套环境，即 ecs 服务器环境，也即 prod 环境。ecs 上的 Docker 镜像中会添加如下环境变量。
```shell
ENVIRONMENT=prod
```
程序可预先读取 `ENVIRONMENT` 的值，然后激活对应的配置文件。如：
`config-local.yaml`

```yaml
server:
  port: 3000
api:
  base_url:
    http://47.99.xx.yy/api
```

`config-prod.yaml`

```yaml
server:
  port: 3000
api:
  base_url:
    https://x.je.com/api
```

`main.js`

```javascript
env = os.getEnvironment("ENVIRONMENT");
configurations;
if ("prod" == env) {
  configurations = file.read("config-prod.yaml");
} else {
  configurations = file.read("config-local.yaml");
}
app.run(configurations);
```
