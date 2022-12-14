class LineNotificationAgentImpl {
  async notify(isOpen: boolean) {
    const message: string = `${isOpen ? 'β' : 'π'}γγ’γ${
      isOpen ? 'ιγγΎγγ' : 'ιγΎγγΎγγ'
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
