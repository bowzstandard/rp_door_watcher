class LineNotificationAgentImpl {
  async notify(isOpen: boolean) {
    const message: string = `${isOpen ? '⛔' : '🆗'}ドアが${
      isOpen ? '開きました' : '閉まりました'
    }`;

    const payload: string = encodeURI(`message=${message}`);

    try {
      await fetch(`https://notify-api.line.me/api/notify?${payload}`, {
        headers: {
          Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN ?? ''}`,
        },
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export const LineNotificationAgent = new LineNotificationAgentImpl();
