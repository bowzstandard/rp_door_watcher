## setup

https://github.com/abandonware/noble
https://github.com/abandonware/noble#running-without-rootsudo-linux-specific
のセットアップを行う

```shell
$ npm i
$ npm install pm2 -g
$ pm2 install typescript
$ pm2 start ts-node -- src/main.ts
```

### daemon

```shell
$ forever start -c ts-node src/main.ts
```

## 回路

プルアップのほうがよさそう
