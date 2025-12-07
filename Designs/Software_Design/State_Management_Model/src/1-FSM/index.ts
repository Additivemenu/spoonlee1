// 实战：文档编辑器的状态管理
type EditorState =
  | "draft"
  | "editing"
  | "reviewing"
  | "approved"
  | "rejected"
  | "published";
type EditorEvent =
  | "EDIT"
  | "SUBMIT"
  | "APPROVE"
  | "REJECT"
  | "PUBLISH"
  | "RETURN";

const editorFSM = new EnterpriseFSM<EditorState, EditorEvent>({
  id: "document-editor",
  initial: "draft",
  context: {
    documentId: "doc-123",
    version: 1,
    changes: [],
  },
  // declarative state machine definition
  // 这里就定义了各个状态及其转换规则 (state graph), 甚至还有状态的entry/exit hooks
  states: {
    draft: {
      on: {
        EDIT: { target: "editing" },
        SUBMIT: {
          target: "reviewing",
          guard: (ctx) => ctx.changes.length > 0,
          action: (ctx) => console.log("提交审核:", ctx.documentId),
        },
      },
      entry: (ctx) => console.log("进入草稿状态"),
      exit: (ctx) => console.log("退出草稿状态"),
    },
    editing: {
      on: {
        SUBMIT: { target: "reviewing" },
        RETURN: { target: "draft" },
      },
    },
    reviewing: {
      on: {
        APPROVE: { target: "approved" },
        REJECT: { target: "rejected" },
      },
    },
    approved: {
      on: {
        PUBLISH: { target: "published" },
        RETURN: { target: "editing" },
      },
    },
    rejected: {
      on: {
        EDIT: { target: "editing" },
      },
    },
    published: {
      // 终态，无转移
    },
  },
});
