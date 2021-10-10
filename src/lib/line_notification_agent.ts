import request from 'request';

class LineNotificationAgentImpl {
  async notify(isOpen: boolean) {
    const message: string = `${isOpen ? '⛔' : '🆗'}ドアが${
      isOpen ? '開きました' : '閉まりました'
    }`;

    const payload: string = encodeURI(`message=${message}`);

    request.post(
      {
        uri: `https://notify-api.line.me/api/notify?${payload}`,
        headers: {
          Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN ?? ''}`,
        },
        json: {
          // JSONをPOSTする場合書く
        },
      },
      (err, res, data) => {
        console.log(data);
      }
    );
  }
}

export const LineNotificationAgent = new LineNotificationAgentImpl();
