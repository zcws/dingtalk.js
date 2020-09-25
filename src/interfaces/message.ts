export enum MessageType {
  TEXT = "text",
  LINK = "link",
  IMAGE = "image"
}

export interface Link {
  msgtype: MessageType.LINK,
  link: {
    text: string,
    title: string,
    picUrl: string,
    messageUrl: string
  }
}

export interface Image {
  msgtype: MessageType.IMAGE,
  image: {
    media_id: string
  }
}

export interface Text {
  msgtype: MessageType.TEXT,
  text: {
    content: string
  }
}

export type Msg = Text | Image | Link;

export interface WorkNoticeOptions {
  msg: Msg;
  agent_id: number;
  userid_list?: string;
  dept_id_list?: string;
  to_all_user?: boolean;
}
