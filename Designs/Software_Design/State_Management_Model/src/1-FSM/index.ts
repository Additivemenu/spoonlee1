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

// 定义类型安全的 Context
interface EditorContext {
  documentId: string;
  version: number;
  changes: string[];
}

// 现在 context 是类型安全的！
const editorFSM = new EnterpriseFSM<EditorState, EditorEvent, EditorContext>({
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
          // TypeScript 现在知道 ctx 的类型是 EditorContext！
          guard: (ctx) => ctx.changes.length > 0, // ✅ 类型安全
          action: (ctx) => console.log("提交审核:", ctx.documentId), // ✅ 类型安全
        },
      },
      entry: (ctx) => console.log("进入草稿状态", ctx.documentId),
      exit: (ctx) => console.log("退出草稿状态", ctx.version),
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
